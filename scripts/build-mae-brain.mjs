/**
 * Builds Mae's knowledge graph (graphify node-link format) from mae-knowledge/*.md.
 * Each file is a community, each "## Heading" a node, [[Wikilinks]] and shared
 * #tags become edges. Output: mae-knowledge/graph.json (read by api/mae.js).
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'mae-knowledge');
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

const files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort();
const nodes = [];
const links = [];
const byLabel = new Map();

files.forEach((file, community) => {
  nodes.push({ id: `file_${slug(file)}`, label: file, kind: 'file', community, source_file: `mae-knowledge/${file}` });
});

for (const [community, file] of files.entries()) {
  const text = await readFile(path.join(dir, file), 'utf8');
  for (const block of text.split(/^## /m).slice(1)) {
    const [head, ...body] = block.split('\n');
    const tags = [...head.matchAll(/#([\w-]+)/g)].map((m) => m[1]);
    const label = head.replace(/#[\w-]+/g, '').trim();
    const content = body.join('\n').trim();
    const node = { id: `${slug(file)}_${slug(label)}`, label, kind: 'fact', community, tags, content, source_file: `mae-knowledge/${file}` };
    nodes.push(node);
    byLabel.set(label.toLowerCase(), node.id);
    links.push({ source: `file_${slug(file)}`, target: node.id, relation: 'contains' });
  }
}

// Fold the graphify code graph (graphify-out/graph.json) in, so Mae also knows how this site is built.
try {
  const code = JSON.parse(await readFile(path.join(dir, '..', 'graphify-out', 'graph.json'), 'utf8'));
  const groups = new Map();
  for (const n of code.nodes) {
    if (!n.source_file) continue;
    const g = groups.get(n.community_name) ?? new Set();
    g.add(n.source_file.replace(/^.*\//, ''));
    groups.set(n.community_name, g);
  }
  const summary = [...groups].map(([name, f]) => `${name} (${[...f].slice(0, 4).join(', ')})`).join('; ');
  const label = 'Website structure';
  const node = { id: 'graphify_website_structure', label, kind: 'fact', community: files.length, tags: ['meta', 'site'],
    content: `Graphify maps this website's code into ${code.nodes.length} nodes grouped into ${groups.size} areas: ${summary}. Part of [[Portfolio Website]].`,
    source_file: 'graphify-out/graph.json' };
  nodes.push(node);
  byLabel.set(label.toLowerCase(), node.id);
} catch { /* graphify-out is optional */ }

const facts = nodes.filter((n) => n.kind === 'fact');
const seen = new Set();
const addLink = (source, target, relation) => {
  const key = [source, target].sort().join('|') + relation;
  if (source === target || seen.has(key)) return;
  seen.add(key);
  links.push({ source, target, relation });
};

for (const node of facts) {
  for (const [, name] of node.content.matchAll(/\[\[([^\]]+)\]\]/g)) {
    const target = byLabel.get(name.toLowerCase());
    if (!target) throw new Error(`Unresolved link [[${name}]] in "${node.label}"`);
    addLink(node.id, target, 'references');
  }
}
for (const a of facts) for (const b of facts) {
  if (a.id < b.id && a.tags.some((t) => b.tags.includes(t))) addLink(a.id, b.id, 'shares_tag');
}

await writeFile(path.join(dir, 'graph.json'), JSON.stringify({ directed: false, graph: { name: 'mae' }, nodes, links }, null, 2));
console.log(`Mae brain: ${facts.length} facts, ${links.length} edges -> mae-knowledge/graph.json`);
