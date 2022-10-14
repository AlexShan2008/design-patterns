# Design principle - SOLID

## S: Single Responsibility Principle

Utilizing this principle makes code easier to test and maintain, it makes software easier to implement, and it helps to avoid unanticipated side-effects of future changes.

## O: Open-Closed Principle

1. Open for extension, meaning that the class’s behavior can be extended; and
2. Closed for modification, meaning that the source code is set and cannot be changed.

```js
Promise();
```

## L: Liskov Substitution Principle

- 子类能覆盖父类
- 父类能出现的地方子类就能出现
- JS 使用比较少

```js
class Person {
  constructor() {}
}

class Man extends Person {
  constructor(gender) {
    super();
    this.gender = gender;
  }
  buy() {
    console.log("car");
  }
}

class Woman extends Person {
  constructor(name) {
    super();
    this.gender = gender;
  }
  buy() {
    console.log("handbag");
  }
}

const man = new Man("male");
const woman = new Woman("female");
man.buy();
woman.buy();
```

## I: Interface Segregation Principle

接口隔离原则

- 保持接口的单一独立，避免出现胖接口
- JS 中么有接口，使用较少，但是 TS 中可以使用
- 类似于单一职责，更关注接口

## D: Dependency Inversion Principle

依赖导致原则

- 面向接口编程，依赖于抽象，而不依赖于具体实现
- 适用方只关注接口，而不关注具体实现
