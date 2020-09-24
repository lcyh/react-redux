function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };
  return descriptor;
}
// 日志应用
class Maths {
  @log
  add(a, b) {
    return a + b;
  }
}
const math = new Maths();
// passed parameters should get logged now
math.add(2, 4);
