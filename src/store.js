function Store() {
  return {
    foo: "bar",
    setFoo(newValue) {
      this.foo = newValue;
    }
  };
}

export default Store;

// class Store {
//   foo: "bar";
// }

// export default new Store();
