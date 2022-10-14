class Animal {
  constructor(name) {
    this.name = name;
  }

  eat(food) {
    console.log(`${this.name} eat ${food}`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  buck(food) {
    console.log(`${this.name} eat ${food}`);
  }
}

const dog = new Animal("dog");
