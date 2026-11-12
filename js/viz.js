'use strict';
/* Visualizers. Algorithms produce a list of frames; player() steps through them. */
const VIZ = {};
const nums = (s, max = 10) => String(s).split(/[\s,]+/).map(Number).filter(x => Number.isFinite(x)).slice(0, max);
const clone = o => JSON.parse(JSON.stringify(o));
const LEG = `<div class="legend"><span style="--c:var(--gold)">compare</span><span style="--c:var(--red)">swap / move</span><span style="--c:var(--violet)">pivot / key</span><span style="--c:var(--pri)">final</span></div>`;

function player(host, frames, draw) {
  host.innerHTML = `<div class="stage"></div><div class="msg"></div><div class="ctl"><button data-a="first" aria-label="First step">⏮</button><button data-a="prev" aria-label="Previous step">◀</button><button data-a="play" class="pri" aria-label="Play or pause">▶</button><button data-a="next" aria-label="Next step">▶|</button><input type="range" min="1" max="5" value="3" aria-label="Speed"><span class="cnt"></span></div>`;
  let i = 0, t = null;
  const st = $('.stage', host), msg = $('.msg', host), cnt = $('.cnt', host), pb = $('[data-a=play]', host), sp = $('input', host);
  const show = () => { const f = frames[i]; st.innerHTML = draw(f); msg.innerHTML = bi(f.m[0], f.m[1]); cnt.textContent = (i + 1) + '/' + frames.length; };
  const stop = () => { clearTimeout(t); t = null; pb.textContent = '▶'; };
  const tick = () => { if (i >= frames.length - 1) return stop(); i++; show(); t = setTimeout(tick, [1500, 1050, 700, 420, 200][sp.value - 1]); };
  $('.ctl', host).onclick = e => { const a = e.target.dataset.a; if (!a) return;
    if (a === 'play') { if (t) return stop(); if (i >= frames.length - 1) i = 0; show(); pb.textContent = '⏸'; t = setTimeout(tick, 500); return; }
    stop(); i = a === 'first' ? 0 : Math.max(0, Math.min(frames.length - 1, i + (a === 'next' ? 1 : -1))); show(); };
  STOP.push(stop); show();
  return { end() { stop(); i = frames.length - 1; show(); } };
}
/* shell: input row + a slot the player renders into */
function shell(host, inputs) { host.innerHTML = `<div class="vin">${inputs}</div><div class="pl" style="display:flex;flex-direction:column;gap:10px"></div>`; return $('.pl', host); }

const cells = (a, c = {}, p = {}) => `<div class="cells">${a.map((v, i) => `<div class="cell ${c[i] || ''} ${v === null ? 'emp' : ''}">${v === null ? '' : v}<small>${i}</small>${p[i] ? `<i>${p[i]}</i>` : ''}</div>`).join('')}</div>`;
const bars = (a, c = {}) => { const mx = Math.max(...a.map(Math.abs), 1); return `<div class="bars">${a.map((v, i) => `<div class="bar ${c[i] || ''}" style="height:${28 + Math.abs(v) / mx * 130}px">${v}</div>`).join('')}</div>`; };

/* binary tree drawing: nodes are {id,v,l,r} */
function treeSVG(root, cls = {}, lab = {}) {
  const pts = []; let k = 0, md = 0;
  (function w(n, d) { if (!n) return; w(n.l, d + 1); n._x = k++; n._d = d; md = Math.max(md, d); pts.push(n); w(n.r, d + 1); })(root, 0);
  if (!k) return `<p class="mute">${bi('The tree is empty. Insert a value.', 'Tree খালি। একটা মান insert করুন।')}</p>`;
  const sp = k > 9 ? 25 : 38, R = k > 9 ? 12 : 15, W = Math.max(k * sp + 20, 200), H = md * 54 + 56, X = n => n._x * sp + 10 + sp / 2 + (W - k * sp - 20) / 2, Y = n => n._d * 54 + 26;
  let e = '', c = '';
  pts.forEach(n => { [n.l, n.r].forEach(ch => { if (ch) e += `<line x1="${X(n)}" y1="${Y(n)}" x2="${X(ch)}" y2="${Y(ch)}"/>`; });
    c += `<g class="${cls[n.id] || ''}"><circle cx="${X(n)}" cy="${Y(n)}" r="${R}"/><text x="${X(n)}" y="${Y(n) + 4.5}"${k > 9 ? ' style="font-size:11px"' : ''}>${n.v}</text>${lab[n.id] != null ? `<text class="lab" x="${X(n)}" y="${Y(n) + 27}">${lab[n.id]}</text>` : ''}</g>`; });
  return `<svg class="g" viewBox="0 0 ${W} ${H}" style="max-width:${Math.round(W * 1.25)}px">${e}${c}</svg>`;
}
const heapTree = a => { const mk = i => i < a.length ? { id: i, v: a[i], l: mk(2 * i + 1), r: mk(2 * i + 2) } : null; return mk(0); };
/* graph drawing */
function graphSVG(G, st = {}) {
  const n = st.n || {}, e = st.e || {}, lab = st.lab || {};
  return `<svg class="g" viewBox="0 0 ${G.w} ${G.h}" style="max-width:${G.w * 1.3}px">` +
    G.E.map(([u, v, w]) => { const [x1, y1] = G.P[u], [x2, y2] = G.P[v]; return `<line class="${e[u + v] || e[v + u] || ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>${w != null ? `<text class="w" x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 + 4}">${w}</text>` : ''}`; }).join('') +
    Object.keys(G.P).map(k => `<g class="${n[k] || ''}"><circle cx="${G.P[k][0]}" cy="${G.P[k][1]}" r="16"/><text x="${G.P[k][0]}" y="${G.P[k][1] + 4.5}">${k}</text>${lab[k] != null ? `<text class="lab" x="${G.P[k][0]}" y="${G.P[k][1] - 21}">${lab[k]}</text>` : ''}</g>`).join('') + `</svg>`;
}
const adjOf = G => { const a = {}; Object.keys(G.P).forEach(k => a[k] = []); G.E.forEach(([u, v, w]) => { a[u].push([v, w]); a[v].push([u, w]); }); Object.values(a).forEach(l => l.sort((x, y) => x[0] < y[0] ? -1 : 1)); return a; };

/* ================= SORTING ================= */
function sortFrames(kind, arr) {
  const a = arr.slice(), F = [], n = a.length, done = {}; let cmp = 0, sw = 0;
  const f = (c, en, bn) => F.push({ a: a.slice(), c: { ...done, ...c }, m: [en, bn], cmp, sw });
  const sp = (i, j) => { [a[i], a[j]] = [a[j], a[i]]; sw++; };
  f({}, `Start with ${a.join(', ')}`, `শুরু: ${a.join(', ')}`);
  if (kind === 'bubble') {
    for (let p = 0; p < n - 1; p++) { let s = false;
      for (let j = 0; j < n - 1 - p; j++) { cmp++; f({ [j]: 'cmp', [j + 1]: 'cmp' }, `Pass ${p + 1}: compare neighbours ${a[j]} and ${a[j + 1]}`, `পাস ${p + 1}: পাশাপাশি ${a[j]} ও ${a[j + 1]} তুলনা করি`);
        if (a[j] > a[j + 1]) { sp(j, j + 1); s = true; f({ [j]: 'swap', [j + 1]: 'swap' }, `${a[j + 1]} is bigger, so it moves right (swap #${sw})`, `${a[j + 1]} বড়, তাই ডানে সরে গেল (swap #${sw})`); } }
      done[n - 1 - p] = 'done';
      if (!s) { for (let k = 0; k < n; k++) done[k] = 'done'; f({}, `No swap in pass ${p + 1}, so the list is already sorted. Stop early.`, `পাস ${p + 1}-এ কোনো swap হয়নি, মানে list sorted। এখানেই থামি।`); break; }
      f({}, `End of pass ${p + 1}: the largest remaining value has bubbled to the end`, `পাস ${p + 1} শেষ: বাকিদের মধ্যে সবচেয়ে বড়টা শেষে চলে গেছে`); }
  } else if (kind === 'selection') {
    for (let i = 0; i < n - 1; i++) { let m = i;
      for (let j = i + 1; j < n; j++) { cmp++; f({ [m]: 'pivot', [j]: 'cmp' }, `Pass ${i + 1}: smallest so far is ${a[m]}. Is ${a[j]} smaller?`, `পাস ${i + 1}: এখন পর্যন্ত সবচেয়ে ছোট ${a[m]}। ${a[j]} কি আরও ছোট?`); if (a[j] < a[m]) m = j; }
      if (m !== i) { sp(i, m); f({ [i]: 'swap', [m]: 'swap' }, `Smallest is ${a[i]}: swap it into position ${i}`, `সবচেয়ে ছোট ${a[i]}: তাকে ${i} নম্বর ঘরে আনলাম`); }
      else f({ [i]: 'pivot' }, `${a[i]} is already in the right place, no swap`, `${a[i]} আগে থেকেই ঠিক জায়গায়, swap লাগল না`);
      done[i] = 'done'; }
  } else if (kind === 'insertion') {
    done[0] = 'done';
    for (let i = 1; i < n; i++) { const key = a[i]; let j = i - 1; f({ [i]: 'pivot' }, `Take key = ${key}. Everything to its left is already sorted.`, `key = ${key} নিলাম। এর বাঁ পাশের সব আগে থেকেই sorted।`);
      while (j >= 0) { cmp++; if (a[j] > key) { sp(j, j + 1); f({ [j]: 'pivot', [j + 1]: 'swap' }, `${a[j + 1]} > ${key}: shift ${a[j + 1]} one step right`, `${a[j + 1]} > ${key}: ${a[j + 1]}-কে এক ঘর ডানে সরাই`); j--; } else { f({ [j]: 'cmp', [j + 1]: 'pivot' }, `${a[j]} ≤ ${key}: the key stays here`, `${a[j]} ≤ ${key}: key এখানেই বসবে`); break; } }
      for (let k = 0; k <= i; k++) done[k] = 'done'; }
  } else if (kind === 'merge') {
    const ms = (l, r) => { if (l >= r) return; const m = (l + r) >> 1, rg = {}; for (let k = l; k <= r; k++) rg[k] = k <= m ? 'cmp' : 'pivot';
      f(rg, `Divide [${a.slice(l, r + 1).join(', ')}] into two halves`, `ভাগ করি: [${a.slice(l, r + 1).join(', ')}] → দুই অর্ধেক`); ms(l, m); ms(m + 1, r);
      const L = a.slice(l, m + 1), R = a.slice(m + 1, r + 1); let i = 0, j = 0, k = l;
      while (i < L.length || j < R.length) { if (j >= R.length || (i < L.length && (cmp++, L[i] <= R[j]))) a[k++] = L[i++]; else a[k++] = R[j++]; sw++; }
      const d = {}; for (k = l; k <= r; k++) d[k] = 'swap';
      f(d, `Merge [${L.join(', ')}] and [${R.join(', ')}] → [${a.slice(l, r + 1).join(', ')}]`, `জোড়া লাগাই: [${L.join(', ')}] + [${R.join(', ')}] → [${a.slice(l, r + 1).join(', ')}]`); };
    ms(0, n - 1);
  } else if (kind === 'quick') {
    const qs = (lo, hi) => { if (lo > hi) return; if (lo === hi) { done[lo] = 'done'; return; }
      const p = a[hi]; let i = lo - 1; f({ [hi]: 'pivot' }, `Pivot = ${p} (last element of this part)`, `Pivot = ${p} (এই অংশের শেষ element)`);
      for (let j = lo; j < hi; j++) { cmp++;
        if (a[j] < p) { i++; if (i !== j) { sp(i, j); f({ [i]: 'swap', [j]: 'swap', [hi]: 'pivot' }, `${a[i]} < ${p}: send it to the left side`, `${a[i]} < ${p}: বাঁ দিকে পাঠাই`); } else f({ [j]: 'cmp', [hi]: 'pivot' }, `${a[j]} < ${p}: it is already on the left side`, `${a[j]} < ${p}: আগে থেকেই বাঁ দিকে আছে`); }
        else f({ [j]: 'cmp', [hi]: 'pivot' }, `${a[j]} ≥ ${p}: leave it on the right side`, `${a[j]} ≥ ${p}: ডান দিকেই থাকুক`); }
      if (i + 1 !== hi) sp(i + 1, hi); done[i + 1] = 'done';
      f({}, `Pivot ${p} drops into its final place (index ${i + 1}). Smaller on the left, bigger on the right.`, `Pivot ${p} তার চূড়ান্ত জায়গায় (index ${i + 1}) বসল। বাঁয়ে ছোট, ডানে বড়।`); qs(lo, i); qs(i + 2, hi); };
    qs(0, n - 1);
  } else if (kind === 'heap') {
    const sift = (m, i) => { for (;;) { let b = i; const l = 2 * i + 1, r = l + 1; if (l < m) { cmp++; if (a[l] > a[b]) b = l; } if (r < m) { cmp++; if (a[r] > a[b]) b = r; } if (b === i) return;
      sp(i, b); f({ [i]: 'swap', [b]: 'swap' }, `Heapify: child ${a[i]} is bigger than parent ${a[b]}, swap them`, `Heapify: child ${a[i]} parent ${a[b]}-এর চেয়ে বড়, তাই swap`); i = b; } };
    for (let i = (n >> 1) - 1; i >= 0; i--) sift(n, i);
    f({ 0: 'pivot' }, `Max-heap is built. The largest value ${a[0]} sits at the root (index 0).`, `Max-heap তৈরি। সবচেয়ে বড় মান ${a[0]} এখন root-এ (index 0)।`);
    for (let e = n - 1; e > 0; e--) { sp(0, e); done[e] = 'done'; f({ 0: 'swap' }, `SWAP root with the last item, REMOVE ${a[e]} from the heap: it is in its final place`, `Root-কে শেষ element-এর সাথে SWAP, ${a[e]} heap থেকে বাদ: সে চূড়ান্ত জায়গায়`); sift(e, 0); }
  }
  for (let k = 0; k < n; k++) done[k] = 'done';
  f({}, `Sorted: ${a.join(', ')}. Comparisons = ${cmp}, swaps/moves = ${sw}.`, `Sorted: ${a.join(', ')}। তুলনা = ${cmp}, swap/move = ${sw}।`);
  return F;
}
VIZ.sort = { t: ['Six sorting algorithms', 'ছয়টি sorting algorithm'], ch: 'sort', fn(host) {
  const pl = shell(host, `<select id="sk" aria-label="Algorithm"><option value="bubble">Bubble</option><option value="selection">Selection</option><option value="insertion">Insertion</option><option value="merge">Merge</option><option value="quick">Quick</option><option value="heap">Heap</option></select><input id="sa" type="text" value="5, 8, 3, 6, 2" aria-label="Numbers"><button class="btn pri" id="sg">${bi('Load', 'চালু', 1)}</button>`);
  const go = () => { const a = nums($('#sa', host).value); if (a.length < 2) return; player(pl, sortFrames($('#sk', host).value, a), f => bars(f.a, f.c) + `<div class="meta"><span>comparisons <b>${f.cmp}</b></span><span>swaps/moves <b>${f.sw}</b></span></div>` + LEG); };
  $('#sg', host).onclick = go; $('#sk', host).onchange = go; go(); } };

/* ================= SEARCHING ================= */
function searchFrames(kind, a, x) {
  const F = [], f = (c, p, en, bn) => F.push({ a, c, p, m: [en, bn] });
  if (kind === 'linear') { for (let i = 0; i < a.length; i++) { const c = {}; for (let k = 0; k < i; k++) c[k] = 'off';
    if (a[i] === x) { c[i] = 'done'; f(c, { [i]: 'found' }, `A[${i}] = ${x}. Found after ${i + 1} comparison(s).`, `A[${i}] = ${x}। ${i + 1} বার তুলনা করে পাওয়া গেল।`); return F; }
    c[i] = 'cmp'; f(c, { [i]: 'i' }, `Is A[${i}] = ${a[i]} equal to ${x}? No, move to the next one.`, `A[${i}] = ${a[i]} কি ${x}-এর সমান? না, পরেরটায় যাই।`); }
    f({}, {}, `Reached the end: ${x} is not in the list (${a.length} comparisons).`, `শেষ পর্যন্ত এলাম: ${x} list-এ নেই (${a.length} বার তুলনা)।`); return F; }
  let lo = 0, hi = a.length - 1, n = 0;
  while (lo <= hi) { const mid = (lo + hi) >> 1, c = {}, p = {}; n++; a.forEach((_, k) => { if (k < lo || k > hi) c[k] = 'off'; });
    p[lo] = 'BEG'; p[hi] = p[hi] ? 'BEG=END' : 'END'; p[mid] = p[mid] ? p[mid] + '=MID' : 'MID';
    if (a[mid] === x) { c[mid] = 'done'; f(c, p, `MID = (${lo}+${hi})/2 = ${mid}. A[${mid}] = ${x}. Found in ${n} step(s).`, `MID = (${lo}+${hi})/2 = ${mid}। A[${mid}] = ${x}। ${n} ধাপে পাওয়া গেল।`); return F; }
    c[mid] = 'cmp';
    if (a[mid] > x) { f(c, p, `MID = ${mid}. A[${mid}] = ${a[mid]} > ${x}, so throw away the right half: END = ${mid - 1}`, `MID = ${mid}। A[${mid}] = ${a[mid]} > ${x}, তাই ডান অর্ধেক বাদ: END = ${mid - 1}`); hi = mid - 1; }
    else { f(c, p, `MID = ${mid}. A[${mid}] = ${a[mid]} < ${x}, so throw away the left half: BEG = ${mid + 1}`, `MID = ${mid}। A[${mid}] = ${a[mid]} < ${x}, তাই বাঁ অর্ধেক বাদ: BEG = ${mid + 1}`); lo = mid + 1; } }
  const c = {}; a.forEach((_, k) => c[k] = 'off'); f(c, {}, `BEG > END: ${x} is not present (only ${n} steps for ${a.length} items).`, `BEG > END: ${x} নেই (${a.length}টি item-এ মাত্র ${n} ধাপ)।`); return F;
}
VIZ.search = { t: ['Linear vs binary search', 'Linear বনাম binary search'], ch: 'search', fn(host) {
  const a = [3, 8, 12, 17, 21, 26, 30, 34, 41, 47, 55];
  const pl = shell(host, `<select id="k" aria-label="Algorithm"><option value="binary">Binary</option><option value="linear">Linear</option></select><input id="x" type="number" value="41" aria-label="Value to find"><button class="btn pri" id="g">${bi('Search', 'খুঁজুন', 1)}</button>`);
  const go = () => player(pl, searchFrames($('#k', host).value, a, +$('#x', host).value), f => cells(f.a, f.c, f.p));
  $('#g', host).onclick = go; $('#k', host).onchange = go; go(); } };

/* ================= ARRAY ================= */
VIZ.array = { t: ['Array insert and delete', 'Array-তে insert ও delete'], ch: 'array', fn(host) {
  let a = [10, 20, 30, 40, 50]; const CAP = 8;
  const pl = shell(host, `<input id="v" type="number" value="25" aria-label="Value"><input id="i" type="number" value="2" min="0" aria-label="Index"><button class="btn pri" id="in">Insert</button><button class="btn" id="de">Delete</button>`);
  const pad = x => x.concat(Array(CAP - x.length).fill(null));
  const run = F => player(pl, F, f => cells(f.a, f.c, f.p));
  const idle = () => run([{ a: pad(a), c: {}, p: {}, m: [`Array of size ${CAP}, ${a.length} used. Give a value and an index.`, `Array-র size ${CAP}, ব্যবহৃত ${a.length}। একটা মান ও index দিন।`] }]);
  $('#in', host).onclick = () => { const v = +$('#v', host).value, i = Math.max(0, Math.min(a.length, +$('#i', host).value)), F = [];
    if (a.length >= CAP) return run([{ a: pad(a), c: {}, p: {}, m: ['OVERFLOW: the array is full, nothing can be inserted.', 'OVERFLOW: array ভর্তি, আর insert করা যাবে না।'] }]);
    const b = pad(a); F.push({ a: b.slice(), c: { [i]: 'cmp' }, p: { [i]: 'here' }, m: [`Insert ${v} at index ${i}. First make room.`, `${v}-কে index ${i}-এ বসাব। আগে জায়গা খালি করতে হবে।`] });
    for (let k = a.length; k > i; k--) { b[k] = b[k - 1]; b[k - 1] = null; F.push({ a: b.slice(), c: { [k]: 'swap' }, p: {}, m: [`Shift ${b[k]} one step right (index ${k - 1} → ${k})`, `${b[k]}-কে এক ঘর ডানে সরাই (index ${k - 1} → ${k})`] }); }
    b[i] = v; a.splice(i, 0, v); F.push({ a: b.slice(), c: { [i]: 'done' }, p: {}, m: [`${v} placed. ${a.length - 1 - i} element(s) had to move: that is why insertion is O(n).`, `${v} বসল। ${a.length - 1 - i}টি element সরাতে হলো: এজন্যই insertion O(n)।`] }); run(F); };
  $('#de', host).onclick = () => { const i = +$('#i', host).value, F = [];
    if (!a.length) return run([{ a: pad(a), c: {}, p: {}, m: ['UNDERFLOW: the array is empty.', 'UNDERFLOW: array খালি।'] }]);
    if (i < 0 || i >= a.length) return run([{ a: pad(a), c: {}, p: {}, m: [`Index ${i} is out of range (0 to ${a.length - 1}).`, `Index ${i} সীমার বাইরে (0 থেকে ${a.length - 1})।`] }]);
    const b = pad(a); F.push({ a: b.slice(), c: { [i]: 'swap' }, p: { [i]: 'delete' }, m: [`Delete ${b[i]} at index ${i}`, `Index ${i}-এর ${b[i]} মুছব`] }); b[i] = null;
    for (let k = i; k < a.length - 1; k++) { b[k] = b[k + 1]; b[k + 1] = null; F.push({ a: b.slice(), c: { [k]: 'cmp' }, p: {}, m: [`Shift ${b[k]} one step left to close the gap`, `ফাঁক বন্ধ করতে ${b[k]}-কে এক ঘর বাঁয়ে আনি`] }); }
    a.splice(i, 1); F.push({ a: b.slice(), c: {}, p: {}, m: [`Done. Reading A[i] is O(1), but insert/delete in the middle is O(n).`, `শেষ। A[i] পড়া O(1), কিন্তু মাঝখানে insert/delete O(n)।`] }); run(F); };
  idle(); } };

/* ================= LINKED LIST ================= */
VIZ.linked = { t: ['Linked list', 'Linked list'], ch: 'linked', fn(host) {
  let L = [12, 25, 37], type = 'singly', hit = -1;
  host.innerHTML = `<div class="vin"><select id="ty" aria-label="Type"><option value="singly">Singly</option><option value="doubly">Doubly</option><option value="circular">Circular</option></select><input id="v" type="number" value="50" aria-label="Value"><button class="btn pri" id="ih">+ Head</button><button class="btn pri" id="it">+ Tail</button><button class="btn" id="dl">Delete value</button><button class="btn" id="sr">Search</button></div><div class="stage"></div><div class="msg"></div>`;
  const st = $('.stage', host), msg = $('.msg', host); let tm = null; STOP.push(() => clearTimeout(tm));
  const say = (en, bn) => msg.innerHTML = bi(en, bn);
  const draw = () => { const ar = type === 'doubly' ? '⇄' : '→';
    st.innerHTML = `<div class="ll"><span class="hd">HEAD →</span>${L.map((v, i) => `<span class="nd ${i === hit ? 'hit' : ''}">${type === 'doubly' ? '<span>prev</span>' : ''}<span>${v}</span><span>next</span></span><span class="ar">${i < L.length - 1 ? ar : (type === 'circular' ? '→ back to HEAD ↺' : '→')}</span>`).join('')}${type === 'circular' && L.length ? '' : '<span class="nul">NULL</span>'}</div>`; };
  const walk = (x, after) => { clearTimeout(tm); let i = 0; const step = () => { hit = i; draw();
    if (i >= L.length) { hit = -1; draw(); return say(`Reached the end. ${x} is not in the list: ${L.length} node(s) visited, O(n).`, `শেষে পৌঁছে গেছি। ${x} list-এ নেই: ${L.length}টি node ঘুরেছি, O(n)।`); }
    if (L[i] === x) return after(i);
    say(`Node ${i + 1} holds ${L[i]}, not ${x}. Follow the next pointer.`, `Node ${i + 1}-এ আছে ${L[i]}, ${x} নয়। next pointer ধরে এগোই।`); i++; tm = setTimeout(step, 750); }; step(); };
  const val = () => +$('#v', host).value;
  $('#ty', host).onchange = e => { type = e.target.value; hit = -1; draw(); say(...({ singly: ['Singly: each node = data + next. The last next is NULL. One direction only.', 'Singly: প্রতিটি node = data + next। শেষ node-এর next হলো NULL। শুধু এক দিকে যাওয়া যায়।'], doubly: ['Doubly: each node = prev + data + next. You can walk forward and backward.', 'Doubly: প্রতিটি node = prev + data + next। সামনে-পেছনে দুই দিকেই যাওয়া যায়।'], circular: ['Circular: the last node points back to the first. There is no NULL anywhere.', 'Circular: শেষ node আবার প্রথম node-কে point করে। কোথাও NULL নেই।'] }[type])); };
  $('#ih', host).onclick = () => { if (L.length > 6) return say('Demo limit reached. Delete a node first.', 'Demo-র সীমা শেষ। আগে একটা node মুছুন।'); L.unshift(val()); hit = 0; draw(); say(`New node ${val()}: (1) new.next = HEAD, (2) HEAD = new. Two pointer changes, nothing shifted: O(1).`, `নতুন node ${val()}: (১) new.next = HEAD, (২) HEAD = new। মাত্র দুটো pointer বদল, কিছু সরাতে হয়নি: O(1)।`); };
  $('#it', host).onclick = () => { if (L.length > 6) return say('Demo limit reached. Delete a node first.', 'Demo-র সীমা শেষ। আগে একটা node মুছুন।'); L.push(val()); hit = L.length - 1; draw(); say(`Walk to the last node, then last.next = new node. Walking costs O(n) unless you keep a tail pointer.`, `শেষ node পর্যন্ত হেঁটে যাই, তারপর last.next = নতুন node। tail pointer না রাখলে হাঁটতে O(n) লাগে।`); };
  $('#dl', host).onclick = () => walk(val(), i => { tm = setTimeout(() => { const v = L[i]; L.splice(i, 1); hit = -1; draw(); say(`Deleted ${v}: the previous node's next now skips over it. One pointer changed, no shifting.`, `${v} মুছে গেল: আগের node-এর next এখন তাকে টপকে পরের node ধরেছে। একটাই pointer বদল, কোনো shifting নেই।`); }, 700); say(`Found ${L[i]}. Now bypass it: prev.next = node.next`, `${L[i]} পাওয়া গেছে। এবার তাকে বাদ দিই: prev.next = node.next`); });
  $('#sr', host).onclick = () => walk(val(), i => say(`Found ${L[i]} at node ${i + 1}. A linked list can only be searched one node at a time (sequential access).`, `Node ${i + 1}-এ ${L[i]} পাওয়া গেল। Linked list-এ শুধু একটা একটা করে node ধরে খোঁজা যায় (sequential access)।`));
  draw(); say('HEAD points to the first node. Each node stores data and the address of the next node.', 'HEAD প্রথম node-কে দেখায়। প্রতিটি node-এ থাকে data আর পরের node-এর ঠিকানা।'); } };

/* ================= STACK ================= */
VIZ.stack = { t: ['Stack: push and pop', 'Stack: push ও pop'], ch: 'stack', fn(host) {
  let s = [], MAX = 6, tm = null; STOP.push(() => clearTimeout(tm));
  host.innerHTML = `<div class="vin"><input id="v" type="number" value="200" aria-label="Value"><button class="btn pri" id="pu">Push</button><button class="btn" id="po">Pop</button><button class="btn" id="pk">Peek</button><button class="btn" id="ex">${bi('BAPEX 2023 example', 'BAPEX 2023 উদাহরণ', 1)}</button></div><div class="stage"></div><div class="msg"></div>`;
  const st = $('.stage', host), say = (en, bn) => $('.msg', host).innerHTML = bi(en, bn);
  const draw = () => st.innerHTML = `<div class="pile">${s.map(v => `<div>${v}</div>`).join('')}</div><div class="meta"><span>top = <b>${s.length - 1}</b></span><span>MAX = <b>${MAX}</b></span><span>${s.length ? 'TOP → ' + s[s.length - 1] : 'empty'}</span></div>`;
  const push = v => { if (s.length >= MAX) return say(`OVERFLOW: top = MAX − 1 = ${MAX - 1}. The stack is full.`, `OVERFLOW: top = MAX − 1 = ${MAX - 1}। Stack ভর্তি।`); s.push(v); draw(); say(`Push ${v}: top = top + 1 → ${s.length - 1}, then stack[top] = ${v}`, `Push ${v}: top = top + 1 → ${s.length - 1}, তারপর stack[top] = ${v}`); };
  const pop = () => { if (!s.length) return say('UNDERFLOW: top = −1. The stack is empty, nothing to pop.', 'UNDERFLOW: top = −1। Stack খালি, pop করার কিছু নেই।'); const v = s.pop(); draw(); say(`Pop returns ${v} (the LAST one pushed). top = top − 1 → ${s.length - 1}`, `Pop ফেরত দিল ${v} (সবার শেষে যেটা ঢুকেছিল)। top = top − 1 → ${s.length - 1}`); return v; };
  $('#pu', host).onclick = () => push(+$('#v', host).value); $('#po', host).onclick = pop;
  $('#pk', host).onclick = () => s.length ? say(`Peek: the top is ${s[s.length - 1]}. Nothing is removed.`, `Peek: উপরে আছে ${s[s.length - 1]}। কিছুই সরানো হয়নি।`) : say('Peek on an empty stack: nothing to show.', 'খালি stack-এ peek: দেখানোর কিছু নেই।');
  $('#ex', host).onclick = () => { clearTimeout(tm); s = []; draw(); const ops = [() => push(200), () => push(500), () => push(100), () => { const v = pop(); say(`S = Pop() → S = ${v}. The last value pushed (100) comes out first. LIFO.`, `S = Pop() → S = ${v}। সবার শেষে ঢোকা 100-ই আগে বের হলো। এটাই LIFO।`); }];
    let i = 0; const nx = () => { ops[i++](); if (i < ops.length) tm = setTimeout(nx, 1100); }; nx(); };
  draw(); say('A stack has ONE open end called TOP. Push and pop both happen there.', 'Stack-এর একটাই খোলা মুখ, নাম TOP। Push আর pop দুটোই ওখানে হয়।'); } };

/* ================= QUEUE ================= */
VIZ.queue = { t: ['Queue: linear and circular', 'Queue: linear ও circular'], ch: 'queue', fn(host) {
  const N = 6; let q, f, r, circ = false, n;
  host.innerHTML = `<div class="vin"><select id="ty" aria-label="Type"><option value="0">Linear queue</option><option value="1">Circular queue</option></select><input id="v" type="number" value="7" aria-label="Value"><button class="btn pri" id="en">Enqueue</button><button class="btn" id="de">Dequeue</button></div><div class="stage"></div><div class="msg"></div>`;
  const st = $('.stage', host), say = (en, bn) => $('.msg', host).innerHTML = bi(en, bn);
  const reset = () => { q = Array(N).fill(null); f = -1; r = -1; n = 0; };
  const draw = () => { const p = {}; if (f >= 0) p[f] = 'FRONT'; if (r >= 0) p[r] = p[r] ? 'F=R' : 'REAR'; const c = {}; if (f >= 0) c[f] = 'cmp'; if (r >= 0 && r !== f) c[r] = 'done';
    st.innerHTML = cells(q, c, p) + `<div class="meta"><span>front = <b>${f}</b></span><span>rear = <b>${r}</b></span><span>items = <b>${n}</b></span></div>`; };
  $('#en', host).onclick = () => { const v = +$('#v', host).value;
    if (circ) { if (n === N) return say('OVERFLOW: (rear + 1) % MAX = front. The circular queue is full.', 'OVERFLOW: (rear + 1) % MAX = front। Circular queue ভর্তি।'); r = (r + 1) % N; if (f < 0) f = 0; q[r] = v; n++; draw(); return say(`Enqueue ${v}: rear = (rear + 1) % ${N} = ${r}. The rear wraps around and reuses freed cells.`, `Enqueue ${v}: rear = (rear + 1) % ${N} = ${r}। Rear ঘুরে এসে খালি হওয়া ঘর আবার ব্যবহার করে।`); }
    if (r === N - 1) return say(n < N ? `OVERFLOW although ${N - n} cell(s) at the front are free: rear = MAX − 1. This waste is why circular queues exist.` : 'OVERFLOW: rear = MAX − 1. The queue is full.', n < N ? `OVERFLOW, অথচ সামনে ${N - n}টি ঘর ফাঁকা: rear = MAX − 1। এই অপচয় ঠেকাতেই circular queue।` : 'OVERFLOW: rear = MAX − 1। Queue ভর্তি।');
    r++; if (f < 0) f = 0; q[r] = v; n++; draw(); say(`Enqueue ${v}: rear = rear + 1 → ${r}, queue[rear] = ${v}. New items always join at the REAR.`, `Enqueue ${v}: rear = rear + 1 → ${r}, queue[rear] = ${v}। নতুন item সবসময় REAR-এ ঢোকে।`); };
  $('#de', host).onclick = () => { if (!n) return say('UNDERFLOW: the queue is empty.', 'UNDERFLOW: queue খালি।'); const v = q[f]; q[f] = null; n--;
    if (!n) f = r = -1; else f = circ ? (f + 1) % N : f + 1;
    draw(); say(`Dequeue returns ${v} (the FIRST one that entered). front moves forward. FIFO.`, `Dequeue ফেরত দিল ${v} (যে সবার আগে ঢুকেছিল)। front এক ঘর এগোল। এটাই FIFO।`); };
  $('#ty', host).onchange = e => { circ = e.target.value === '1'; reset(); draw(); say(circ ? 'Circular queue: the last cell connects back to the first, so no space is wasted.' : 'Linear queue: front and rear only move right. Freed cells at the front are never reused.', circ ? 'Circular queue: শেষ ঘর আবার প্রথম ঘরের সাথে যুক্ত, তাই জায়গা নষ্ট হয় না।' : 'Linear queue: front আর rear শুধু ডানে যায়। সামনে খালি হওয়া ঘর আর কাজে লাগে না।'); };
  reset(); [4, 9, 2].forEach(v => { r++; f = 0; q[r] = v; n++; }); draw(); say('A queue has TWO ends: items enter at REAR and leave from FRONT.', 'Queue-র দুটো মুখ: item ঢোকে REAR দিয়ে, বের হয় FRONT দিয়ে।'); } };

/* ================= TREE TRAVERSAL ================= */
const bstFrom = arr => { let root = null, id = 0; arr.forEach(v => { const nd = { id: id++, v, l: null, r: null }; if (!root) return root = nd; let n = root; for (;;) { const k = v < n.v ? 'l' : 'r'; if (!n[k]) { n[k] = nd; break; } n = n[k]; } }); return root; };
VIZ.trav = { t: ['Tree traversals', 'Tree traversal'], ch: 'tree', fn(host) {
  const root = bstFrom([25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90]);
  const pl = shell(host, `<select id="k" aria-label="Traversal"><option value="pre">Pre-order (Root, Left, Right)</option><option value="in">In-order (Left, Root, Right)</option><option value="post">Post-order (Left, Right, Root)</option><option value="lvl">Level-order (BFS)</option></select>`);
  const go = () => { const k = $('#k', host).value, F = [], out = [], cls = {};
    const f = (cur, en, bn) => F.push({ cls: { ...cls, ...(cur != null ? { [cur]: 'cur' } : {}) }, out: out.slice(), m: [en, bn] });
    const visit = n => { out.push(n.v); cls[n.id] = 'done'; f(n.id, `Visit ${n.v}`, `${n.v} visit করলাম`); };
    f(null, 'Start at the root (25).', 'Root (25) থেকে শুরু।');
    if (k === 'lvl') { const q = [root]; while (q.length) { const n = q.shift(); visit(n); F[F.length - 1].m = [`Dequeue ${n.v}, visit it, enqueue its children. Queue: [${[...q, n.l, n.r].filter(Boolean).map(x => x.v).join(', ')}]`, `${n.v} dequeue করে visit, তার child-দের enqueue। Queue: [${[...q, n.l, n.r].filter(Boolean).map(x => x.v).join(', ')}]`]; if (n.l) q.push(n.l); if (n.r) q.push(n.r); } }
    else (function w(n) { if (!n) return; if (k === 'pre') visit(n); else if (n.l) f(n.id, `At ${n.v}: go LEFT first`, `${n.v}-এ আছি: আগে বাঁয়ে যাই`);
      w(n.l); if (k === 'in') visit(n); if (n.r && k !== 'pre') f(n.id, `At ${n.v}: now go RIGHT`, `${n.v}-এ আছি: এবার ডানে যাই`); w(n.r); if (k === 'post') visit(n); })(root);
    f(null, `Finished. Order: ${out.join(', ')}${k === 'in' ? '. In-order of a BST is always sorted!' : ''}`, `শেষ। ক্রম: ${out.join(', ')}${k === 'in' ? '। BST-র in-order সবসময় sorted হয়!' : ''}`);
    player(pl, F, fr => treeSVG(root, fr.cls) + `<div class="out"><span>output:</span> ${fr.out.join(', ') || '—'}</div>`); };
  $('#k', host).onchange = go; go(); } };

/* ================= BST ================= */
VIZ.bst = { t: ['Binary search tree', 'Binary search tree'], ch: 'bst', fn(host) {
  let root = bstFrom([50, 30, 70, 20, 40, 60, 80]), uid = 100;
  const pl = shell(host, `<input id="v" type="number" value="65" aria-label="Value"><button class="btn pri" id="in">Insert</button><button class="btn" id="sr">Search</button><button class="btn" id="de">Delete</button><button class="btn" id="rs">Reset</button>`);
  const ino = () => { const o = []; (function w(n) { if (n) { w(n.l); o.push(n.v); w(n.r); } })(root); return o.join(', '); };
  const run = F => player(pl, F, f => treeSVG(f.t, f.cls)), fr = (cls, en, bn) => ({ t: clone(root), cls, m: [en, bn] });
  const path = (v, F) => { let n = root, p = null; while (n && n.v !== v) { const L = v < n.v; F.push(fr({ [n.id]: 'cur' }, `${v} ${L ? '<' : '>'} ${n.v}: go ${L ? 'LEFT' : 'RIGHT'}`, `${v} ${L ? '<' : '>'} ${n.v}: ${L ? 'বাঁয়ে' : 'ডানে'} যাই`)); p = n; n = L ? n.l : n.r; } return [n, p]; };
  const idle = () => run([fr({}, `BST rule: left subtree < node < right subtree. In-order: ${ino()}`, `BST-র নিয়ম: বাঁ subtree < node < ডান subtree। In-order: ${ino()}`)]);
  const val = () => +$('#v', host).value;
  $('#in', host).onclick = () => { const v = val(), F = [], [n, p] = path(v, F);
    if (n) { F.push(fr({ [n.id]: 'swap' }, `${v} is already in the tree. A BST does not keep duplicates.`, `${v} আগে থেকেই আছে। BST-তে duplicate রাখা হয় না।`)); return run(F); }
    const nd = { id: uid++, v, l: null, r: null }; if (!p) root = nd; else p[v < p.v ? 'l' : 'r'] = nd;
    F.push(fr({ [nd.id]: 'done' }, `Empty spot found: ${v} becomes a new leaf. In-order: ${ino()}`, `খালি জায়গা পাওয়া গেছে: ${v} নতুন leaf হলো। In-order: ${ino()}`)); run(F); };
  $('#sr', host).onclick = () => { const v = val(), F = [], [n] = path(v, F); F.push(n ? fr({ [n.id]: 'done' }, `Found ${v} after ${F.length + 1} comparison(s). Each step throws away half of a balanced tree.`, `${F.length + 1} বার তুলনায় ${v} পাওয়া গেল। Balanced tree হলে প্রতি ধাপে অর্ধেক বাদ পড়ে।`) : fr({}, `Hit NULL: ${v} is not in the tree.`, `NULL-এ পৌঁছেছি: ${v} tree-তে নেই।`)); run(F); };
  $('#de', host).onclick = () => { const v = val(), F = []; let [n, p] = path(v, F);
    if (!n) { F.push(fr({}, `${v} is not in the tree.`, `${v} tree-তে নেই।`)); return run(F); }
    if (n.l && n.r) { let sp = n, s = n.r; while (s.l) { sp = s; s = s.l; }
      F.push(fr({ [n.id]: 'swap' }, `Case 3: ${v} has TWO children. Find its in-order successor: the smallest value in the right subtree.`, `Case 3: ${v}-এর দুটো child। In-order successor খুঁজি: ডান subtree-র সবচেয়ে ছোট মান।`));
      F.push(fr({ [n.id]: 'swap', [s.id]: 'cur' }, `Successor is ${s.v}. Copy ${s.v} into the node, then remove the old ${s.v}.`, `Successor হলো ${s.v}। ${s.v}-কে ওই node-এ copy করি, তারপর পুরনো ${s.v} মুছি।`)); n.v = s.v; n = s; p = sp; }
    else F.push(fr({ [n.id]: 'swap' }, n.l || n.r ? `Case 2: ${v} has ONE child. Connect that child directly to ${v}'s parent.` : `Case 1: ${v} is a leaf (no child). Simply remove it.`, n.l || n.r ? `Case 2: ${v}-এর একটাই child। সেই child-কে সরাসরি ${v}-এর parent-এর সাথে জুড়ে দিই।` : `Case 1: ${v} একটা leaf (child নেই)। সরাসরি মুছে দিই।`));
    const ch = n.l || n.r; if (!p) root = ch; else if (p.l === n) p.l = ch; else p.r = ch;
    F.push(fr({}, `Deleted. In-order is still sorted: ${ino() || 'empty'}`, `মুছে গেছে। In-order এখনও sorted: ${ino() || 'খালি'}`)); run(F); };
  $('#rs', host).onclick = () => { root = bstFrom([50, 30, 70, 20, 40, 60, 80]); idle(); };
  idle(); } };

/* ================= HEAP ================= */
VIZ.heap = { t: ['Heap: insert and extract', 'Heap: insert ও extract'], ch: 'heap', fn(host) {
  let h = [], min = true;
  const pl = shell(host, `<select id="ty" aria-label="Heap type"><option value="1">Min-heap</option><option value="0">Max-heap</option></select><input id="v" type="number" value="6" aria-label="Value"><button class="btn pri" id="in">Insert</button><button class="btn" id="ex">Extract root</button><button class="btn" id="ld">${bi('Exam example', 'পরীক্ষার উদাহরণ', 1)}</button>`);
  const up = (a, b) => min ? a < b : a > b, nm = () => min ? 'min' : 'max';
  const run = F => player(pl, F, f => treeSVG(heapTree(f.a), f.c, Object.fromEntries(f.a.map((_, i) => [i, 'i=' + i]))) + cells(f.a, f.c));
  const fr = (c, en, bn) => ({ a: h.slice(), c, m: [en, bn] });
  const ins = (v, F) => { h.push(v); let i = h.length - 1; F.push(fr({ [i]: 'cur' }, `Insert ${v} at the first free position (index ${i}) to keep the tree complete`, `Tree complete রাখতে ${v}-কে প্রথম ফাঁকা জায়গায় (index ${i}) বসাই`));
    while (i > 0) { const p = (i - 1) >> 1; if (!up(h[i], h[p])) break; [h[i], h[p]] = [h[p], h[i]]; F.push(fr({ [i]: 'swap', [p]: 'swap' }, `${h[p]} is ${min ? 'smaller' : 'bigger'} than its parent ${h[i]}: bubble up (swap)`, `${h[p]} তার parent ${h[i]}-এর চেয়ে ${min ? 'ছোট' : 'বড়'}: উপরে ওঠাই (swap)`)); i = p; }
    F.push(fr({ [i]: 'done' }, `Heap property holds again. Array: ${h.join(', ')}`, `Heap-এর শর্ত আবার ঠিক। Array: ${h.join(', ')}`)); };
  const idle = () => run([fr({}, h.length ? `${nm()}-heap as tree and as array. Parent of i = (i−1)/2, children = 2i+1 and 2i+2.` : `Empty ${nm()}-heap. Insert values, or load the exam example.`, h.length ? `${nm()}-heap, tree ও array দুই রূপে। i-এর parent = (i−1)/2, child = 2i+1 ও 2i+2।` : `খালি ${nm()}-heap। মান insert করুন, বা পরীক্ষার উদাহরণ চালান।`)]);
  $('#in', host).onclick = () => { if (h.length >= 15) return; const F = []; ins(+$('#v', host).value, F); run(F); };
  $('#ld', host).onclick = () => { h = []; const F = []; [5, 7, 9, 1, 3, 10, 8, 4].forEach(v => ins(v, F)); F.push(fr({}, `All of 5, 7, 9, 1, 3, 10, 8, 4 inserted. Level-order array: ${h.join(', ')}`, `5, 7, 9, 1, 3, 10, 8, 4 সব insert হলো। Level-order array: ${h.join(', ')}`)); run(F); };
  $('#ex', host).onclick = () => { if (!h.length) return idle(); const F = [], top = h[0], n = h.length - 1;
    F.push(fr({ 0: 'swap', [n]: 'cur' }, `Root ${top} is the ${nm()}imum. SWAP it with the last item ${h[n]}.`, `Root ${top} হলো ${nm()}imum। শেষ item ${h[n]}-এর সাথে SWAP করি।`)); h[0] = h[n]; h.pop();
    if (h.length) { F.push(fr({ 0: 'cur' }, `REMOVE ${top}. Now ${h[0]} at the root may break the rule: HEAPIFY down.`, `${top} বাদ গেল। Root-এ এখন ${h[0]}, নিয়ম ভাঙতে পারে: নিচের দিকে HEAPIFY।`));
      let i = 0; for (;;) { let b = i; const l = 2 * i + 1, r = l + 1; if (l < h.length && up(h[l], h[b])) b = l; if (r < h.length && up(h[r], h[b])) b = r; if (b === i) break;
        [h[i], h[b]] = [h[b], h[i]]; F.push(fr({ [i]: 'swap', [b]: 'swap' }, `Swap ${h[b]} with its ${min ? 'smaller' : 'bigger'} child ${h[i]}`, `${h[b]}-কে তার ${min ? 'ছোট' : 'বড়'} child ${h[i]}-এর সাথে swap`)); i = b; } }
    F.push(fr({}, `Extracted ${top}. Repeating this n times gives sorted output: that is heap sort, O(n log n).`, `${top} বের হলো। এটা n বার করলে sorted output পাই: এটাই heap sort, O(n log n)।`)); run(F); };
  $('#ty', host).onchange = e => { min = e.target.value === '1'; h = []; idle(); };
  idle(); } };

/* ================= GRAPH: BFS / DFS ================= */
const G1 = { w: 320, h: 190, P: { A: [30, 95], B: [100, 95], C: [175, 45], D: [175, 150], E: [260, 25], F: [270, 110] }, E: [['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'E'], ['C', 'F'], ['D', 'F']] };
VIZ.bfs = { t: ['BFS and DFS', 'BFS ও DFS'], ch: 'graph', fn(host) {
  const adj = adjOf(G1), pl = shell(host, `<select id="k" aria-label="Traversal"><option value="bfs">BFS (uses a Queue)</option><option value="dfs">DFS (uses a Stack)</option></select>`);
  const go = () => { const bfs = $('#k', host).value === 'bfs', F = [], n = {}, e = {}, out = [], ds = [], seen = new Set();
    const f = (cur, en, bn) => F.push({ n: { ...n, ...(cur ? { [cur]: 'cur' } : {}) }, e: { ...e }, ds: ds.slice(), out: out.slice(), m: [en, bn] });
    if (bfs) { ds.push('A'); seen.add('A'); f('A', 'Enqueue the source A and mark it visited.', 'উৎস A-কে enqueue করে visited চিহ্ন দিই।');
      while (ds.length) { const u = ds.shift(); out.push(u); n[u] = 'done'; const add = [];
        adj[u].forEach(([v]) => { if (!seen.has(v)) { seen.add(v); ds.push(v); e[u + v] = 'in'; add.push(v); } });
        f(u, `Dequeue ${u}, visit it. ${add.length ? 'Enqueue its unvisited neighbours: ' + add.join(', ') : 'All its neighbours are already visited'}.`, `${u}-কে dequeue করে visit। ${add.length ? 'Unvisited প্রতিবেশীদের enqueue: ' + add.join(', ') : 'সব প্রতিবেশী আগেই visited'}।`); } }
    else (function dfs(u) { seen.add(u); out.push(u); ds.push(u); n[u] = 'done'; f(u, `Visit ${u} and push it on the stack. Go as deep as possible.`, `${u} visit করে stack-এ push। যত গভীরে যাওয়া যায় যাই।`);
      adj[u].forEach(([v]) => { if (!seen.has(v)) { e[u + v] = 'in'; dfs(v); f(u, `Dead end: pop and backtrack to ${u}.`, `আর পথ নেই: pop করে ${u}-তে ফিরে আসি (backtrack)।`); } }); ds.pop(); })('A');
    f(null, `${bfs ? 'BFS' : 'DFS'} order: ${out.join(' ')}. ${bfs ? 'It spreads level by level.' : 'It dives deep, then backtracks.'}`, `${bfs ? 'BFS' : 'DFS'} ক্রম: ${out.join(' ')}। ${bfs ? 'এটা স্তরে স্তরে ছড়ায়।' : 'এটা গভীরে ঢোকে, তারপর ফিরে আসে।'}`);
    player(pl, F, fr => graphSVG(G1, fr) + `<div class="out"><span>${bfs ? 'queue (front → rear)' : 'stack (bottom → top)'}:</span> [${fr.ds.join(', ')}] &nbsp; <span>visited:</span> ${fr.out.join(' ') || '—'}</div>`); };
  $('#k', host).onchange = go; go(); } };

/* ================= MST ================= */
const G2 = { w: 320, h: 200, P: { A: [50, 40], B: [40, 150], C: [165, 170], D: [280, 130], E: [250, 30] }, E: [['A', 'B', 1], ['D', 'E', 2], ['B', 'C', 3], ['C', 'D', 4], ['A', 'E', 5], ['A', 'C', 7], ['A', 'D', 10]] };
VIZ.mst = { t: ["Prim's and Kruskal's MST", 'Prim ও Kruskal-এর MST'], ch: 'mst', fn(host) {
  const pl = shell(host, `<select id="k" aria-label="Algorithm"><option value="kruskal">Kruskal's (sort all edges)</option><option value="prim">Prim's (grow from A)</option></select>`);
  const go = () => { const kr = $('#k', host).value === 'kruskal', F = [], e = {}, n = {}; let cost = 0;
    const f = (en, bn) => F.push({ n: { ...n }, e: { ...e }, cost, m: [en, bn] });
    if (kr) { const par = {}; Object.keys(G2.P).forEach(k => par[k] = k); const find = x => par[x] === x ? x : find(par[x]);
      const srt = G2.E.slice().sort((a, b) => a[2] - b[2]); f(`Sort the edges by weight: ${srt.map(x => x[0] + x[1] + '(' + x[2] + ')').join(', ')}`, `Edge-গুলো weight অনুযায়ী সাজাই: ${srt.map(x => x[0] + x[1] + '(' + x[2] + ')').join(', ')}`);
      srt.forEach(([u, v, w]) => { const a = find(u), b = find(v);
        if (a === b) { e[u + v] = 'rej'; f(`${u}${v}(${w}) REJECTED: ${u} and ${v} are already in the same tree, it would form a cycle.`, `${u}${v}(${w}) বাতিল: ${u} আর ${v} আগে থেকেই একই tree-তে, নিলে cycle হবে।`); }
        else { par[a] = b; e[u + v] = 'in'; n[u] = n[v] = 'done'; cost += w; f(`Add ${u}${v}(${w}): it joins two different trees. Cost so far = ${cost}.`, `${u}${v}(${w}) নিলাম: দুটো আলাদা tree জুড়ল। এখন পর্যন্ত cost = ${cost}।`); } }); }
    else { const adj = adjOf(G2), inT = new Set(['A']); n.A = 'done'; f('Start from vertex A. The tree has one vertex.', 'Vertex A থেকে শুরু। Tree-তে এখন একটাই vertex।');
      while (inT.size < 5) { let best = null; inT.forEach(u => adj[u].forEach(([v, w]) => { if (!inT.has(v) && (!best || w < best[2])) best = [u, v, w]; }));
        const [u, v, w] = best; e[u + v] = 'cur'; f(`Edges leaving the tree: the cheapest one is ${u}${v}(${w}).`, `Tree থেকে বাইরে যাওয়া edge-গুলোর মধ্যে সবচেয়ে সস্তা ${u}${v}(${w})।`);
        e[u + v] = 'in'; n[v] = 'done'; inT.add(v); cost += w; f(`Add ${u}${v}(${w}) and vertex ${v}. Cost so far = ${cost}.`, `${u}${v}(${w}) ও vertex ${v} যোগ হলো। এখন পর্যন্ত cost = ${cost}।`); } }
    f(`MST complete: V − 1 = 4 edges, total cost = ${cost}. Both algorithms give the same minimum cost.`, `MST সম্পূর্ণ: V − 1 = 4টি edge, মোট cost = ${cost}। দুই algorithm-ই একই minimum cost দেয়।`);
    player(pl, F, fr => graphSVG(G2, fr) + `<div class="meta"><span>MST cost = <b>${fr.cost}</b></span></div>`); };
  $('#k', host).onchange = go; go(); } };

/* ================= DIJKSTRA ================= */
const G3 = { w: 330, h: 190, P: { 0: [28, 95], 1: [115, 30], 2: [115, 160], 3: [215, 30], 4: [215, 160], 5: [302, 95] }, E: [['0', '1', 4], ['0', '2', 2], ['1', '2', 1], ['1', '3', 5], ['2', '3', 10], ['2', '4', 8], ['3', '4', 2], ['3', '5', 2], ['4', '5', 6]] };
VIZ.dijkstra = { t: ["Dijkstra's shortest path", 'Dijkstra-র shortest path'], ch: 'dijkstra', fn(host) {
  const adj = adjOf(G3), V = Object.keys(G3.P), dist = {}, prev = {}, n = {}, e = {}, F = [], done = new Set();
  V.forEach(v => dist[v] = Infinity); dist[0] = 0;
  const f = (cur, en, bn) => F.push({ n: { ...n, ...(cur != null ? { [cur]: 'cur' } : {}) }, e: { ...e }, lab: Object.fromEntries(V.map(v => [v, dist[v] === Infinity ? '∞' : dist[v]])), d: { ...dist }, done: new Set(done), m: [en, bn] });
  f(null, 'Set dist[0] = 0 and every other distance to ∞.', 'dist[0] = 0, বাকি সবার দূরত্ব ∞ ধরি।');
  while (done.size < V.length) { let u = null; V.forEach(v => { if (!done.has(v) && (u === null || dist[v] < dist[u])) u = v; });
    f(u, `Pick the unvisited vertex with the smallest distance: ${u} (dist = ${dist[u]}). It is now final.`, `Unvisited-দের মধ্যে সবচেয়ে কম দূরত্বের vertex নিই: ${u} (dist = ${dist[u]})। এটা এখন চূড়ান্ত।`); done.add(u); n[u] = 'done'; if (prev[u] != null) e[prev[u] + u] = 'in';
    adj[u].forEach(([v, w]) => { if (done.has(v)) return; const alt = dist[u] + w;
      if (alt < dist[v]) { const old = dist[v] === Infinity ? '∞' : dist[v]; dist[v] = alt; prev[v] = u; f(u, `Relax ${u}→${v}: ${dist[u]} + ${w} = ${alt} < ${old}, so update dist[${v}] = ${alt}.`, `Relax ${u}→${v}: ${dist[u]} + ${w} = ${alt} < ${old}, তাই dist[${v}] = ${alt} করি।`); }
      else f(u, `Check ${u}→${v}: ${dist[u]} + ${w} = ${alt} is not better than ${dist[v]}. Keep ${dist[v]}.`, `${u}→${v} দেখি: ${dist[u]} + ${w} = ${alt}, ${dist[v]}-এর চেয়ে ভালো নয়। ${dist[v]}-ই থাকল।`); }); }
  f(null, 'All vertices final. Shortest path 0→5 is 0→2→1→3→5 with cost 10.', 'সব vertex চূড়ান্ত। 0→5 shortest path হলো 0→2→1→3→5, cost 10।');
  host.innerHTML = '<div class="pl" style="display:flex;flex-direction:column;gap:10px"></div>';
  player($('.pl', host), F, fr => graphSVG(G3, fr) + `<div class="tw" style="width:100%"><table class="dtab"><tr><th>vertex</th>${V.map(v => `<th>${v}</th>`).join('')}</tr><tr><td>dist</td>${V.map(v => `<td class="${fr.done.has(v) ? 'done' : ''}">${fr.d[v] === Infinity ? '∞' : fr.d[v]}</td>`).join('')}</tr></table></div>`); } };

/* ================= TOWER OF HANOI ================= */
VIZ.hanoi = { t: ['Tower of Hanoi', 'Tower of Hanoi'], ch: 'recur', fn(host) {
  const pl = shell(host, `<label for="hn">${bi('Disks', 'Disk সংখ্যা', 1)}</label><select id="hn"><option>2</option><option selected>3</option><option>4</option><option>5</option></select>`);
  const go = () => { const N = +$('#hn', host).value, pegs = { A: [], B: [], C: [] }, F = []; for (let d = N; d >= 1; d--) pegs.A.push(d); let mv = 0;
    const f = (en, bn) => F.push({ p: clone(pegs), m: [en, bn] });
    f(`${N} disks on A. Goal: move all to C. Rules: one disk at a time, never a bigger disk on a smaller one.`, `A-তে ${N}টি disk। লক্ষ্য: সব C-তে নেওয়া। নিয়ম: একবারে একটা disk, ছোটর ওপর বড় রাখা যাবে না।`);
    (function h(k, s, d, a) { if (!k) return; h(k - 1, s, a, d); pegs[d].push(pegs[s].pop()); mv++; f(`Move ${mv}: disk ${k} from ${s} to ${d}`, `চাল ${mv}: disk ${k}, ${s} থেকে ${d}-তে`); h(k - 1, a, d, s); })(N, 'A', 'C', 'B');
    f(`Done in ${mv} moves = 2^${N} − 1. Time complexity O(2ⁿ).`, `${mv} চালে শেষ = 2^${N} − 1। Time complexity O(2ⁿ)।`);
    player(pl, F, fr => `<div class="pegs" style="margin-bottom:26px">${'ABC'.split('').map((k, i) => `<div class="peg" data-n="${k} ${['source', 'aux', 'dest'][i]}">${fr.p[k].map(d => `<div style="width:${22 + d * 15}%">${d}</div>`).join('')}</div>`).join('')}</div>`); };
  $('#hn', host).onchange = go; go(); } };

/* ================= RECURSION CALL STACK ================= */
VIZ.fact = { t: ['Recursion and the call stack', 'Recursion ও call stack'], ch: 'recur', fn(host) {
  const pl = shell(host, `<label for="fn">n =</label><select id="fn"><option>3</option><option selected>4</option><option>5</option><option>6</option></select>`);
  const go = () => { const N = +$('#fn', host).value, st = [], F = [], f = (en, bn) => F.push({ s: clone(st), m: [en, bn] });
    const fact = n => { st.push({ t: `fact(${n})` }); if (n <= 1) { f(`fact(${n}) is the BASE CASE: return 1 without calling again.`, `fact(${n}) হলো BASE CASE: আর call না করে 1 ফেরত দেয়।`); st.pop(); return 1; }
      f(`fact(${n}) needs fact(${n - 1}) first, so it waits on the stack (push).`, `fact(${n})-এর আগে fact(${n - 1}) দরকার, তাই সে stack-এ অপেক্ষা করে (push)।`);
      const r = n * fact(n - 1); st[st.length - 1] = { t: `fact(${n}) = ${n} × ${r / n} = ${r}`, r: 1 }; f(`Back in fact(${n}): ${n} × ${r / n} = ${r}. Return and pop.`, `fact(${n})-এ ফিরে এলাম: ${n} × ${r / n} = ${r}। Return করে pop।`); st.pop(); return r; };
    const r = fact(N); f(`Stack is empty. ${N}! = ${r}. Deepest stack = ${N} frames, so space is O(n).`, `Stack খালি। ${N}! = ${r}। সর্বোচ্চ ${N}টি frame জমেছিল, তাই space O(n)।`);
    player(pl, F, fr => `<div class="frames">${fr.s.map(x => `<div class="${x.r ? 'ret' : ''}">${x.t}</div>`).join('') || '<span class="mute">stack empty</span>'}</div>`); };
  $('#fn', host).onchange = go; go(); } };

/* ================= INFIX → POSTFIX ================= */
VIZ.expr = { t: ['Infix to postfix with a stack', 'Stack দিয়ে infix থেকে postfix'], ch: 'expr', fn(host) {
  const pl = shell(host, `<input id="ex" type="text" value="(A+B)*C-(D-E)^(F+G)" aria-label="Infix expression"><button class="btn pri" id="g">${bi('Convert', 'রূপান্তর', 1)}</button>`);
  const pr = { '^': 3, '*': 2, '/': 2, '+': 1, '-': 1 };
  const go = () => { const tk = ($('#ex', host).value.match(/[A-Za-z0-9]+|[-+*/^()]/g) || []).slice(0, 40), st = [], out = [], F = [];
    const f = (i, en, bn) => F.push({ i, st: st.slice(), out: out.slice(), m: [en, bn] });
    f(-1, 'Scan left to right. Operands go straight to the output; operators wait on the stack.', 'বাঁ থেকে ডানে পড়ি। Operand সরাসরি output-এ যায়; operator stack-এ অপেক্ষা করে।');
    tk.forEach((t, i) => {
      if (/\w/.test(t)) { out.push(t); f(i, `${t} is an operand: write it to the output.`, `${t} একটা operand: output-এ লিখি।`); }
      else if (t === '(') { st.push(t); f(i, 'Opening bracket: push it.', 'Opening bracket: push করি।'); }
      else if (t === ')') { while (st.length && st[st.length - 1] !== '(') out.push(st.pop()); st.pop(); f(i, 'Closing bracket: pop to the output until the matching ( is found, then discard both brackets.', 'Closing bracket: মিলে যাওয়া ( না পাওয়া পর্যন্ত pop করে output-এ দিই, তারপর দুই bracket-ই ফেলে দিই।'); }
      else { const pop = []; while (st.length && st[st.length - 1] !== '(' && (pr[st[st.length - 1]] > pr[t] || (pr[st[st.length - 1]] === pr[t] && t !== '^'))) pop.push(st.pop()); out.push(...pop); st.push(t);
        f(i, pop.length ? `${t}: the stack top has higher or equal precedence, so pop ${pop.join(' ')} first, then push ${t}.` : `${t}: nothing on the stack outranks it, so push ${t}.`, pop.length ? `${t}: stack-এর উপরের operator-এর precedence বেশি বা সমান, তাই আগে ${pop.join(' ')} pop, তারপর ${t} push।` : `${t}: stack-এ এর চেয়ে বড় precedence নেই, তাই ${t} push।`); } });
    while (st.length) out.push(st.pop());
    const s2 = []; out.forEach(t => { if (pr[t]) { const b = s2.pop(), a = s2.pop(); s2.push(t + ' ' + a + ' ' + b); } else s2.push(t); });
    f(tk.length, `End of input: pop everything. Postfix = ${out.join(' ')} &nbsp;|&nbsp; Prefix = ${s2[0] || ''}`, `Input শেষ: stack-এর সব pop। Postfix = ${out.join(' ')} &nbsp;|&nbsp; Prefix = ${s2[0] || ''}`);
    player(pl, F, fr => cells(tk, Object.fromEntries(tk.map((_, k) => [k, k < fr.i ? 'off' : k === fr.i ? 'cmp' : ''])), fr.i >= 0 && fr.i < tk.length ? { [fr.i]: 'read' } : {}) + `<div class="out"><span>stack (bottom → top):</span> [ ${fr.st.join(' ')} ]</div><div class="out"><span>output:</span> ${fr.out.join(' ') || '—'}</div>`); };
  $('#g', host).onclick = go; go(); } };

/* ================= BIG-O ================= */
VIZ.bigo = { t: ['How fast do they grow?', 'কোনটা কত দ্রুত বাড়ে?'], ch: 'bigo', fn(host) {
  host.innerHTML = `<div class="vin"><label for="bn">n = <b id="bv">16</b></label><input id="bn" type="range" min="1" max="40" value="16" style="flex:1"></div><div class="stage" style="align-items:stretch"></div><div class="msg"></div>`;
  const rows = [['O(1)', () => 1, '--pri'], ['O(log n)', n => Math.log2(n), '--pri'], ['O(n)', n => n, '--blue'], ['O(n log n)', n => n * Math.log2(n), '--blue'], ['O(n²)', n => n * n, '--gold'], ['O(2ⁿ)', n => 2 ** n, '--red']];
  const draw = () => { const n = +$('#bn', host).value; $('#bv', host).textContent = n; const mx = Math.log2(2 ** 40 + 1);
    $('.stage', host).innerHTML = rows.map(([k, fn, c]) => { const v = Math.max(fn(n), 0); return `<div class="grow"><span>${k}</span><span><i style="--c:var(${c});width:${Math.max(1, Math.log2(v + 1) / mx * 100)}%"></i></span><span>${v >= 1e6 ? v.toExponential(1) : Math.round(v * 10) / 10}</span></div>`; }).join('');
    $('.msg', host).innerHTML = bi(`With n = ${n}: binary search needs about ${Math.ceil(Math.log2(n + 1))} steps, bubble sort about ${n * n}, brute force ${2 ** n >= 1e6 ? (2 ** n).toExponential(1) : 2 ** n}. (Bars use a log scale.)`, `n = ${n} হলে: binary search-এ লাগে প্রায় ${Math.ceil(Math.log2(n + 1))} ধাপ, bubble sort-এ প্রায় ${n * n}, brute force-এ ${2 ** n >= 1e6 ? (2 ** n).toExponential(1) : 2 ** n}। (Bar-গুলো log scale-এ আঁকা।)`); };
  $('#bn', host).oninput = draw; draw(); } };

/* ================= static diagrams ================= */
const dia = (id, t, ch, html, en, bn) => VIZ[id] = { t, ch, fn(host) { host.innerHTML = `<div class="stage">${html}</div><div class="msg">${bi(en, bn)}</div>`; } };
dia('classify', ['Classification of data structures', 'ডাটা স্ট্রাকচারের শ্রেণিবিভাগ'], 'basics',
  `<div class="dia"><div class="lv"><div class="n k">Data Structure</div></div><div class="arrow">↙ &nbsp; ↘</div><div class="lv"><div class="n">Primitive<small>int, float, char, bool</small></div><div class="n k">Non-primitive</div></div><div class="arrow">↙ &nbsp; ↘</div><div class="lv"><div class="n k">Linear<small>one after another</small></div><div class="n k">Non-linear<small>levels / network</small></div></div><div class="lv"><div class="n">Array</div><div class="n">Linked List</div><div class="n">Stack</div><div class="n">Queue</div><div class="n" style="border-color:var(--violet)">Tree</div><div class="n" style="border-color:var(--violet)">Graph</div></div></div>`,
  'Draw this tree in the exam whenever a question asks for types of data structure.', 'Data structure-এর প্রকারভেদ জিজ্ঞেস করলেই পরীক্ষায় এই চিত্রটা এঁকে দিন।');
dia('btree', ['B+ tree with linked leaves', 'Linked leaf-সহ B+ tree'], 'btree',
  `<div class="dia"><div class="lv"><div class="n k">21 | 34<small>index only</small></div></div><div class="arrow">↙ &nbsp; ↓ &nbsp; ↘</div><div class="lv"><div class="n">12 13 14 18 19<small>data</small></div><div class="arrow">→</div><div class="n">21 22 23 30<small>data</small></div><div class="arrow">→</div><div class="n">34 38 40<small>data</small></div></div></div>`,
  'BUET M.Sc 2017 keys with n = 5. Internal nodes only guide the search; every key lives in a leaf, and the leaves are chained left to right.', 'BUET M.Sc 2017-এর key, n = 5। Internal node শুধু পথ দেখায়; সব key থাকে leaf-এ, আর leaf-গুলো বাঁ থেকে ডানে শিকলের মতো জোড়া।');
dia('np', ['P, NP, NP-Complete, NP-Hard', 'P, NP, NP-Complete, NP-Hard'], 'paradigm',
  `<div class="sets">NP-Hard <small>at least as hard as everything in NP. Example: TSP (optimisation), Halting problem</small><div>NP <small style="flex-basis:100%">a given answer can be CHECKED in polynomial time. Example: Vertex Cover</small><div>P<small>SOLVED in polynomial time: sorting, binary search, MST</small></div><div style="border-color:var(--red)">NP-Complete<small>in NP and NP-Hard: SAT, Vertex Cover</small></div></div></div>`,
  'NP-Complete is the overlap: problems that are in NP and also NP-Hard. (Picture assumes P ≠ NP.)', 'NP-Complete হলো মিলনস্থল: যে সমস্যা NP-তেও আছে আবার NP-Hard-ও। (ছবিতে P ≠ NP ধরা হয়েছে।)');
