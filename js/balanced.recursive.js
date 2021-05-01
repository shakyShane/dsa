const mapping = {
  '(': ')',
  '[': ']',
  '{': '}',
}

/**
 * @param {string} slice
 * @returns {boolean}
 */
function balanced(slice) {
  return expect(undefined, slice.split(""))
}

/**
 * @param {string|undefined} end
 * @param {string[]} chars
 * @returns {boolean}
 */
function expect(end, chars) {
  while (true) {
    let c = chars.shift();
    let good;
    switch (c) {
      case "(":
      case "{":
      case "[": {
        good = expect(mapping[c], chars);
        break;
      }
      case undefined:
      case ")":
      case "}":
      case "]": {
        return end === c;
      }
      default: {
        good = true // any other char
      }
    }
    if (!good) return false
  }
}

assert(balanced("[]"), true);
assert(balanced("["), false);
assert(balanced("(())"), true);
assert(balanced("((()"), false);
assert(balanced(")(())"), false);
assert(balanced("))))"), false);
assert(balanced("(()))("), false);
assert(balanced("([])"), true);
assert(balanced("([[[]]])"), true);
assert(balanced("([[[00]])"), false);
assert(balanced("([[[{0}]]])"), true);

function assert(lhs, rhs) {
  if (lhs !== rhs) {
    throw new Error(`${lhs} !== ${rhs}`);
  }
}