module.exports = function check(str, bracketsConfig) {
  const open = bracketsConfig.map(([key]) => key);
  const close = Object.fromEntries(
    bracketsConfig.map((elem) => elem.reverse())
  );
  const same = bracketsConfig
    .filter(([key, value]) => key === value)
    .map(([key]) => key);
  const stack = [];
  for (let i = 0; i < str.length; i += 1) {
    const top = stack[stack.length - 1];
    if (open.includes(str[i])) {
      if (stack.length > 0 && same.includes(str[i]) && top === str[i]) {
        stack.pop();
      } else {
        stack.push(str[i]);
      }
    } else {
      if (stack.length === 0) {
        return false;
      }
      if (close[str[i]] === top) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  console.log(stack, 'stack');
  return stack.length === 0;
};
