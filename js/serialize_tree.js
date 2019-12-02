/**
 *
 * Serialize & Deserialize a binary tree.
 *
 * Note: this does NOT account for any data sanitization
 *
 *     1
 *    / \
 *   2   3
 *      / \
 *     4   5
 *
 * gives the following string: `1 2 # # 3 4 # # 5 # #`
 * where the structure follows as 'value left right' and `#` is
 * the marker for 'empty'.
 *
 */
class Node {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const node = new Node('1',
    new Node('2'),
    new Node('3', new Node('4'), new Node('5')),
);

const EMPTY = "#";

assert(deserialize(serialize(node)).right.right.val, '5');
assert(deserialize(serialize(node)).right.left.val, '4');
assert(deserialize(serialize(node)).left.val, '2');

function serialize(root) {
    if (!root) return EMPTY;
    return `${root.val} ${serialize(root.left)} ${serialize(root.right)}`;
}

function deserialize(data) {
    let index = 0;
    function helper(items) {
        const val = items[index];
        index += 1;
        if (val === EMPTY) return null;
        const node = new Node(val);
        node.left = helper(items);
        node.right = helper(items);
        return node;
    }
    return helper(data.split(' '));
}

function assert(l, r) {
    if (l !== r) throw new Error(`${l} !== ${r}`);
}
