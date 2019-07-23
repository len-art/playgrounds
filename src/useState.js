function useState(initialValue) {
  // console.log(this);
  // let value = initialValue;

  // function setValue(nextValue) {
  //   console.log(this.value);
  //   this.value = nextValue;
  // }

  // return [value, setValue];
  const state = [initialValue];
  state.setValue = function(nextValue) {
    console.log("current value is", this.value);
    this.value = nextValue;
  };

  function f(x) {
    console.log(state);
    state.setValue(x);
  }

  return [state[0], state.setValue];
}

const a = useState(4);
console.log("val is", a[0]);
a[1](5);
console.log(a[0]);

// let [val, setVal] = useState(4);

// console.log(val, setVal);
// setVal(5);
// console.log(val, setVal);

// const test = {
//   prop: 42,
//   func: function(nextValue) {
//     this.prop = nextValue;
//   }
// };
// test.func(48);
// console.log(test.prop);
