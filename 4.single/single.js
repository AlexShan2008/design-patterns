// class Window {
//   constructor() {}

//   static getInstance() {
//     if (!this.instance) {
//       return new Window();
//     }
//   }
// }

// ES5
// 1. 使用者必须知道这是一个单利的类，使用时必须调用 Window.getInstance()
// 2. 不能阻止客户端直接 new Window
function Window(name) {
  this.name = name;
}

Window.getInstance = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      return new Window(name);
    }
  };
})();

// 透明单利
// 创建一个 this = {} 空对象
// new 关键字
// 违法了单一职责原则
let Window = (function () {
  let window;
  let Window = function (name) {
    if (window) {
      return window;
    } else {
      this.name = name;
      return (window = this);
    }
  };
  return Window;
})();

const w1 = new Window();
const w2 = new Window();

console.log(w1 === w2);

// 把类的实例的创建逻辑和单例逻辑分开
function Window(name) {
  this.name = name;
}

const CreateWindow = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      instance = new Window(name);
    }
    return instance;
  };
})();
const w1 = new CreateWindow("w1");
const w2 = new CreateWindow("w2");
console.log(w1 === w2);

// 创建实例
const CreateSingleOld = function (Constructor) {
  let instance;
  return function (name) {
    if (!instance) {
      Constructor.apply(this, arguments);
      Object.setPrototypeOf(this, Constructor.prototype);
      instance = this;
    }
    return instance;
  };
};

const createWindow = new CreateSingleOld(Window);
const w2 = new createWindow("window1");
console.log(w1 === w2);

// 创建实例 upgrade
const CreateSingleLegacy = function (Constructor) {
  let instance;
  const SingleConstructor = function (name) {
    if (!instance) {
      Constructor.apply(this, arguments);
      instance = this;
    }
    return instance;
  };
  // 典型的原型继承方法
  SingleConstructor.prototype = Object.create(Constructor.prototype);
  return SingleConstructor;
};

// 创建实例 upgrade
const CreateSingle = function (Constructor) {
  let instance;
  const SingleConstructor = function () {
    if (!instance) {
      instance = new Constructor(...arguments);
    }
    return instance;
  };
  return SingleConstructor;
};
