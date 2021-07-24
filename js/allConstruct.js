/**
 * Give a target string, and a collection of sub-strings, determine if the
 * the target can be made by combining the substrings
 *
 * @param target
 * @param words
 * @return {string[][]}
 */
function allConstruct(target, words) {
    if (target === "") return [[]];

    const ways = [];
    for (let word of words) {
        if (target.startsWith(word)) {
            const numWays = allConstruct(target.slice(word.length), words);
            const innerWays = []
            for (let way of numWays) {
                innerWays.push([word, ...way]);
            }
            ways.push(...innerWays);
        }
    }

    return ways;
}

const assert = require("assert");

console.time("brute-force")
assert.deepStrictEqual(allConstruct("", ["s", "hane", "sh", "ane"]), [[]]);
assert.deepStrictEqual(allConstruct("s", ["s", "hane", "sh", "ane"]), [["s"]]);
assert.deepStrictEqual(allConstruct("shane", ["s", "hane", "sh", "ane"]), [["s", "hane"], ["sh", "ane"]]);
// un-comment this to see the slooooow version
// assert.deepStrictEqual(allConstruct("aaaaaaaaaaaaaaaaaaaaaaaaaaaaz", ["a", "aa", "aaa", "aaaa", "aaaaa"]), []);
console.timeEnd("brute-force")

/**
 * Give a target string, and a collection of sub-strings, determine if the
 * the target can be made by combining the substrings
 *
 * @param target
 * @param words
 * @param memo
 * @return {string[][]}
 */
function allConstructMemo(target, words, memo = {}) {
    if (target in memo) return memo[target];
    if (target === "") return [[]];

    const ways = [];
    for (let word of words) {
        if (target.startsWith(word)) {
            const numWays = allConstructMemo(target.slice(word.length), words, memo);
            const innerWays = []
            for (let way of numWays) {
                innerWays.push([word, ...way]);
            }
            ways.push(...innerWays);
        }
    }
    memo[target] = ways;
    return ways;
}

console.time("memo")
assert.deepStrictEqual(allConstructMemo("", ["s", "hane", "sh", "ane"]), [[]]);
assert.deepStrictEqual(allConstructMemo("s", ["s", "hane", "sh", "ane"]), [["s"]]);
assert.deepStrictEqual(allConstructMemo("shane", ["s", "hane", "sh", "ane"]), [["s", "hane"], ["sh", "ane"]]);
assert.deepStrictEqual(allConstructMemo("aaaaaaaaaaaaaaaaaaaaaaaaaaaaz", ["a", "aa", "aaa", "aaaa", "aaaaa"]), []);
console.timeEnd("memo")
