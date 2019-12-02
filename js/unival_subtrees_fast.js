/**
 *
 * "A unival tree (which stands for “universal value”) is a tree where all nodes have the same value."
 *
 * So, the following tree has '3' unival subtrees, all being the leafs (a, a, A)
 *
 *     a
 *    / \
 *   a   a
 *      / \
 *     a   a
 *          \
 *           A
 *
 * But this one has 3, 2 for the leafs and 1 for the whole tree
 *
 *      a
 *     / \
 *    a   a
 *
 */
const nodes = [
    {
        value: 'a',
        id: '01',
        left: {
            value: 'a',
            id: '02',
        },
        right: {
            value: 'a',
            id: '03',
            right: {
                value: 'a',
                id: '04',
                right: {
                    value: 'A',
                    id: '05'
                }
            },
            left: {
                value: 'a',
                id: '6'
            }
        }
    }
];

function count_unival_subtrees(root) {
    if (!root) {
        return [0, true];
    }
    const [left_count, is_left_unival] = count_unival_subtrees(root.left);
    const [right_count, is_right_unival] = count_unival_subtrees(root.right);
    const total = right_count + left_count;

    if (is_left_unival && is_right_unival) {
        if (root.left && root.value !== root.left.value) {
            return [total, false]
        }
        if (root.right && root.value !== root.right.value) {
            return [total, false]
        }
        return [total+1, true]
    }

    return [total, false]
}

assert(count_unival_subtrees(nodes[0])[0], 3);

function assert(l, r) {
    if (l !== r) throw new Error(`${l} !== ${r}`);
}
