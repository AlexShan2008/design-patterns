const url = require("url");
// 适配器模式，电源（不同国家标准）适配器。
class Socket {
  output() {
    return "220v";
  }
}

abstract class Power {
  abstract charge(): string;
}

class PowerAdaptor extends Power {
  constructor(public socket: Socket) {
    super();
  }

  charge(): string {
    return this.socket.output() + "转换器 24v";
  }
}

const adaptor = new PowerAdaptor(new Socket());
const result = adaptor.charge();
console.log(result);

// 应用 Axios 兼容 Browser and Node.js
function xhr(config: any) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(config.method, config.url, true);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject("请求失败");
        }
      }
      request.send();
    };
  });
}

function http(config: any) {
  const http = require("http");
  const urlObject = url.parse(config.url);
  return new Promise(function (resolve, reject) {
    const options = {
      hostname: urlObject.hostname,
      port: urlObject.port,
      path: urlObject.path,
      method: urlObject.method,
    };

    const req = http.request(options, function (response: any) {
      let chunks: any = [];
      response.on("data", function (data: any) {
        chunks.push(data);
      });
      response.on("end", function (data: any) {
        const result = Buffer.concat(chunks).toString();
      });
    });
    req.on("error", function (error) {
      reject(error);
    });

    req.end();
  });
}

function getDefaultAdaptor() {
  let adaptor;
  if (typeof XMLHttpRequest !== "undefined") {
    adaptor = xhr;
  } else if (typeof process !== "undefined") {
    adaptor = http;
  }

  return adaptor;
}

// bluebird promisify
function promiseAdaptor(callbackFn) {
  return function (args) {
    return new Promise(function (resolve, reject) {
      callbackFn(...args, function (error, result) {
        error ? reject(error) : resolve(result);
      });
    });
  };
}
