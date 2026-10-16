/** Graph retrieval for Mae: keyword-score fact nodes, then pull in linked neighbours. */
import graph from '../mae-knowledge/graph.json' with { type: 'json' };

const STOP = new Set('a an and are as at be by can do does for from has have how i in is it me of on or she that the this to was what when where which who why with you your her about tell mae ann bodiongan ann\'s'.split(' '));
const words = (s) => s.toLowerCase().match(/[a-z0-9+#.]+/g)?.filter((w) => w.length > 1 && !STOP.has(w)) ?? [];

const OVERVIEW = ['Who Mae Ann is', 'Focus areas', 'Qualifications summary', 'Projects overview', 'Availability'];
const facts = graph.nodes.filter((n) => n.kind === 'fact');
const byId = new Map(facts.map((n) => [n.id, n]));
const neighbours = new Map();
for (const { source, target, relation } of graph.links) {
  if (relation !== 'references' || !byId.has(source) || !byId.has(target)) continue;
  (neighbours.get(source) ?? neighbours.set(source, []).get(source)).push(target);
  (neighbours.get(target) ?? neighbours.set(target, []).get(target)).push(source);
}

export function recall(question, { limit = 8 } = {}) {
  const terms = words(question);
  const scored = facts.map((node) => {
    const label = words(node.label);
    const tags = node.tags.flatMap(words);
    const body = node.content.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (label.includes(t)) score += 4;
      if (tags.includes(t)) score += 3;
      if (body.includes(t)) score += 1;
    }
    return { node, score };
  }).filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

  const picked = new Map();
  // Direct matches first (so multi-part questions keep every topic), then linked neighbours.
  for (const { node } of scored.slice(0, 5)) picked.set(node.id, node);
  for (const { node } of scored.slice(0, 2)) {
    for (const id of neighbours.get(node.id) ?? []) picked.set(id, byId.get(id));
  }
  // Always ground an empty or vague question in the profile.
  if (!picked.size) {
    for (const n of facts.filter((f) => OVERVIEW.includes(f.label))) picked.set(n.id, n);
  }
  return [...picked.values()].slice(0, limit);
}

export function brainContext(question) {
  return recall(question).map((n) => `[${n.label}] (${n.source_file})\n${n.content}`).join('\n\n');
}
