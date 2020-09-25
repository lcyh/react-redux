function compose(...funs) {}
let compose = [thunk, logger, promise](dispatch);

//compose 栗子1
function logger(num1) {
  console.log("num1", num1);
  return "数字：" + num1;
}
function addSum(num2) {
  console.log("num2", num2);
  return num2 + 2;
}
function minusSum(num3) {
  console.log("num3", num3);
  return num3 - 1;
}
logger(addSum(minusSum(10)));

//compose+reduceRight 栗子2
function compose(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];
  let lastFn = fns.pop();
  return (...args) => {
    fns.reduceRight((pre, cur) => {
      return cur(pre);
    }, lastFn(...args));
  };
}

//compose+reduce 栗子3
// 1.pre:logger cur:minusSum
// function (...args) {
//     return logger(minusSum(...args));
//   };
// 2.pre:
// function (...args) {
//     return logger(minusSum(...args));
//   };
// cur:addSum
// 最终：
//   function (...args) {
//     return function (...args) {
//         return logger(minusSum(...args));
//       }(addSum(...args));
//   }(10)

function compose(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];
  return fns.reduce((a, b) => {
    return function (...args) {
      return a(b(...args));
    };
  });
}
compose(logger, minusSum, addSum)(10);

//科里化
// let curying = (num1) => (num2) => (num3) => {
//   return num1 + num2 + num3;
// };
// console.log(curying(1)(2)(3));

function add(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
function handleCurying(fn, arr = []) {
  return (...args) => {
    arr.push(...args);
    if (arr.length === fn.length) {
      return fn(...arr);
    } else {
      return handleCurying(fn, arr);
    }
  };
}
let cury = handleCurying(add);
console.log(cury(1)(2, 3)(4));
