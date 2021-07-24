/**
 * Give a target string, and a collection of sub-strings, determine if the
 * the target can be made by combining the substrings
 *
 * @param target
 * @param words
 * @return {boolean}
 */
function canConstruct(target, words) {
    if (target === "") return true;
    for (let word of words) {
        if (target.startsWith(word)) {
            let substring = target.slice(word.length)
            if (canConstruct(substring, words)) {
                return true;
            }
        }
    }
    return false
}

const assert = require("assert");

console.time("brute-force")
assert.deepStrictEqual(canConstruct("", ["a", "b"]), true);
assert.deepStrictEqual(canConstruct("a", ["a"]), true);
assert.deepStrictEqual(canConstruct("a", ["b"]), false);
assert.deepStrictEqual(canConstruct("abc", ["b", "c", "a"]), true);
assert.deepStrictEqual(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]), false);
console.timeEnd("brute-force")

/**
 * Give a target string, and a collection of sub-strings, determine if the
 * the target can be made by combining the substrings
 *
 * @param target
 * @param words
 * @param memo
 * @return {boolean}
 */
function canConstructMemo(target, words, memo= {}) {
    if (target in memo) return memo[target];
    if (target === "") return true;
    for (let word of words) {
        if (target.startsWith(word)) {
            let substring = target.slice(word.length)
            if (canConstructMemo(substring, words, memo)) {
                memo[target] = true;
                return true;
            }
        }
    }
    memo[target] = false;
    return false
}

console.time("brute-force")
assert.deepStrictEqual(canConstructMemo("", ["a", "b"]), true);
assert.deepStrictEqual(canConstructMemo("a", ["a"]), true);
assert.deepStrictEqual(canConstructMemo("a", ["b"]), false);
assert.deepStrictEqual(canConstructMemo("abc", ["b", "c", "a"]), true);
assert.deepStrictEqual(canConstructMemo("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]), false);
assert.deepStrictEqual(canConstructMemo("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", 'eeeeee']), false);
console.timeEnd("brute-force")