/**
 * Give a target string, and a collection of sub-strings, determine if the
 * the target can be made by combining the substrings
 *
 * @param target
 * @param words
 * @return {number}
 */
function countConstruct(target, words) {
    if (target === "") return 1;
    let count = 0;
    for (let word of words) {
        if (target.startsWith(word)) {
            let slice = target.slice(word.length);
            count += countConstruct(slice, words);
        }
    }
    return count;
}

const assert = require("assert");

console.time("brute-force")
assert.deepStrictEqual(countConstruct("", ["a", "b"]), 1);
assert.deepStrictEqual(countConstruct("c", ["a", "b"]), 0);
assert.deepStrictEqual(countConstruct("abc", ["a", "b", "c"]), 1);
assert.deepStrictEqual(countConstruct("shane", ["s", "hane", "sh", "ane"]), 2);
// Un-comment this to see it hang
// assert.deepStrictEqual(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", 'eeeeee']), 0);
console.timeEnd("brute-force")
/**
 * Give a target string, and a collection of sub-strings, determine if the
 * the target can be made by combining the substrings
 *
 * @param target
 * @param words
 * @param memo
 * @return {number}
 */
function countConstructMemo(target, words, memo = {}) {
    if (target in memo) return memo[target];
    if (target === "") return 1;
    let count = 0;
    for (let word of words) {
        if (target.startsWith(word)) {
            let slice = target.slice(word.length);
            count += countConstructMemo(slice, words, memo);
        }
    }
    memo[target] = count;
    return count;
}

console.time("memo")
assert.deepStrictEqual(countConstructMemo("", ["a", "b"]), 1);
assert.deepStrictEqual(countConstructMemo("c", ["a", "b"]), 0);
assert.deepStrictEqual(countConstructMemo("abc", ["a", "b", "c"]), 1);
assert.deepStrictEqual(countConstructMemo("shane", ["s", "hane", "sh", "ane"]), 2);
assert.deepStrictEqual(countConstructMemo("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", 'eeeeee']), 0);
console.timeEnd("memo")