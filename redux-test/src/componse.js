function fn1(arg) {
  console.log("fn1");
  return arg;
}
function fn2(arg) {
  console.log("fn2");
  return arg;
}
function fn3(arg) {
  console.log("fn3");
  return arg;
}

// let res = fn1(fn2(fn3("omg")));

function componse(...funcs) {
  // return funcs.reduce((a, b) => (...args) => a(b(...args)));
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    console.log("funcs====", funcs);
    return (arg) => funcs[0](arg);
  }
  return funcs.reduceRight((a, b) => {
    return (...args) => {
      return a(b(...args));
    };
  });
}

let res = componse(fn1, fn2, fn3)("omg"); // fn1(fn2(fn3("omg")))
console.log("res", res);

// const arr = [1, 2, 3, 4];
// const reducer = (accutor, current) => accutor + current;
// const res2 = arr.reduce(reducer);

// console.log("res2==", res2);
