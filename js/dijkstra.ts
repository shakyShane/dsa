/**
 *
 * An implementation of Dijkstra's Shortest Path First algorithm
 *
 * Taken straight from the procedure on Wikipedia
 *
 * https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 *
 */

/**
 * The graph will be represented in the following manner:
 *
 * Where the keys are the nodes and the objects are a mapping
 * of connecting edges with their respective weights
 *
 * Map {
 *   'S' => { A: 7, B: 2, C: 3 },
 *   'A' => { S: 7, B: 3, D: 4 },
 *   'B' => { S: 2, A: 3, D: 4, H: 1 },
 *   'C' => { S: 3, L: 2 },
 *   'D' => { A: 4, B: 4, F: 5 },
 *   'H' => { B: 1, F: 3, G: 2 },
 *   'F' => { D: 5, H: 3 },
 *   'G' => { H: 2, E: 2 },
 *   'E' => { G: 2, K: 5 },
 *   'K' => { E: 5, I: 4, J: 4 },
 *   'J' => { K: 4, I: 6, L: 4 },
 *   'I' => { K: 4, J: 6, L: 4 },
 *   'L' => { J: 4, I: 4, C: 2 }
 * }
 *
 */
type Graph = Map<string, Record<string, number>>;

function calculate(graph: Graph, source: string): Map<string, string|undefined> {
    let queue = new Set<string>();
    let dist = new Map<string, number>();
    let prev = new Map();

    graph.forEach((_, key) => {
        dist.set(key, Infinity);
        prev.set(key, undefined);
        queue.add(key);
    });

    dist.set(source, 0);

    while (queue.size > 0) {
        let u = shortest(dist, queue);
        queue.delete(u);
        let neighbors = graph.get(u);
        for (const v in neighbors) {
            if (!queue.has(v)) continue;
            let alt = dist.get(u) + graph.get(u)[v];
            if (alt < dist.get(v)) {
                dist.set(v, alt);
                prev.set(v, u);
            }
        }
    }
    return prev;
}

function createPath(prev: Map<string, string|undefined>, start: string, end: string) {
    let s = [];
    let u = end;
    if (prev.get(u) || u === start) {
        while (u !== undefined) {
            s.push(u);
            u = prev.get(u);
        }
    }
    return s.reverse();
}

function shortest(dist: Map<string, number>, allowed: Set<string>): string | undefined {
    let shortest = -1;
    let result;
    dist.forEach((d, key) => {
        if (!allowed.has(key)) return;
        if (shortest === -1 || d < shortest) {
            shortest = d;
            result = key;
        }
    })
    return result;
}

const graph = new Map([
    ["S", {A: 7, B: 2, C: 3}],
    ["A", {S: 7, B: 3, D: 4}],
    ["B", {S: 2, A: 3, D: 4, H: 1}],
    ["C", {S: 3, L: 2}],
    ["D", {A: 4, B: 4, F: 5}],
    ["H", {B: 1, F: 3, G: 2}],
    ["F", {D: 5, H: 3}],
    ["G", {H: 2, E: 2}],
    ["E", {G: 2, K: 5}],
    ["K", {E: 5, I: 4, J: 4}],
    ["J", {K: 4, I: 6, L: 4}],
    ["I", {K: 4, J: 6, L: 4}],
    ["L", {J: 4, I: 4, C: 2}]
]);

console.log(graph);

console.time("ss")
console.log(createPath(calculate(graph, 'C'), 'C', 'E'));
console.timeEnd("ss");

