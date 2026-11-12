'use strict';
/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const bi = (en, bn, inl) => `<span class="en${inl ? ' inl' : ''}">${en}</span><span class="bn${inl ? ' inl' : ''}">${bn}</span>`;
const bn2 = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

/* ---------- content builders (used by data files) ---------- */
const CH = [];
const P = (...l) => ({ k: 'p', l });
const H = (en, bn) => ({ k: 'h', en, bn });
const V = (id, en, bn) => ({ k: 'v', id, en, bn });
const A = (t, s, bn) => ({ k: 'a', t, s, bn });
const C = c => ({ k: 'c', c });
const T = (h, r) => ({ k: 't', h, r });
const X = (type, en, bn) => ({ k: 'x', type, en, bn });
const Q = (q, tag, en, bn) => ({ k: 'q', q, tag, en, bn });
const Z = (q, o, a, why) => ({ q, o, a, why });
let QUICK = [], SHEET = {};

/* ---------- saved state ---------- */
const S = (() => { const d = { done: {}, quiz: {}, lang: 'both', theme: '', best: 0 }; try { Object.assign(d, JSON.parse(localStorage.getItem('dsa-acad') || '{}')); } catch (e) { } return d; })();
const save = () => { try { localStorage.setItem('dsa-acad', JSON.stringify(S)); } catch (e) { } };
const STOP = [];           // running animations to stop on navigation
const TIER = [null, ['Guaranteed marks', 'নিশ্চিত নম্বর'], ['High frequency', 'বারবার আসে'], ['Finishing', 'শেষ ধাপ']];
const LBL = { simple: bi('In simple words', 'সহজ কথায়', 1), trap: bi('Common trap', 'সাধারণ ভুল', 1), tip: bi('Exam tip', 'পরীক্ষার টিপস', 1), trick: bi('Memory trick', 'মনে রাখার কৌশল', 1) };

/* ---------- renderers ---------- */
function hl(c) {
  const kw = /\b(def|return|if|elif|else|while|for|in|not|and|or|class|None|True|False|import|from|break|continue|print|range|len)\b/g;
  return c.split('\n').map(line => { const i = line.indexOf('#'); const code = i < 0 ? line : line.slice(0, i), com = i < 0 ? '' : line.slice(i);
    return esc(code).replace(kw, '<b>$1</b>') + (com ? `<i>${esc(com)}</i>` : ''); }).join('\n');
}
function block(b) {
  switch (b.k) {
    case 'h': return `<h3>${bi(b.en, b.bn)}</h3>`;
    case 'p': return `<div class="lines">${b.l.map(([e, n]) => `<div class="ln"><p class="en">${e}</p><p class="bn">${n}</p></div>`).join('')}</div>`;
    case 'v': return `<figure class="viz" data-viz="${b.id}"><figcaption>${bi(b.en, b.bn)}</figcaption><div class="vz"></div></figure>`;
    case 'a': return `<div class="algo"><h4>Algorithm — ${b.t}</h4><ol>${b.s.map(s => `<li>${s}</li>`).join('')}</ol>${b.bn ? `<p class="note">${b.bn}</p>` : ''}</div>`;
    case 'c': return `<pre class="code"><code>${hl(b.c.trim())}</code></pre>`;
    case 't': return `<div class="tw"><table><thead><tr>${b.h.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${b.r.map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'x': return `<aside class="box ${b.type}"><b class="lbl">${LBL[b.type]}</b><p class="en">${b.en}</p><p class="bn">${b.bn}</p></aside>`;
    case 'q': return qHTML(b);
  }
  return '';
}
const qHTML = (b, ref) => `<details class="eq"><summary><span class="qt">${b.q}</span><span class="tag">${b.tag}</span></summary><div class="ans"><p>${b.en}</p><p class="bn">${b.bn}</p>${ref ? `<a class="cref" href="#/c/${ref.id}">Chapter ${ref.n}: ${ref.t[0]} →</a>` : ''}</div></details>`;

function quiz(host, items, opt = {}) {      // opt.instant (default true), opt.onDone(score)
  const instant = opt.instant !== false, pick = {};
  const txt = q => Array.isArray(q) ? bi(q[0], q[1]) : q;
  host.innerHTML = items.map((z, i) => `<div class="qz" data-i="${i}"><p class="qq"><b>${i + 1}.</b> ${txt(z.q)}</p><div class="opts">${z.o.map((o, j) => `<button data-j="${j}">${o}</button>`).join('')}</div><div class="why" hidden>${txt(z.why)}</div></div>`).join('') + `<p class="score" hidden></p>`;
  const reveal = i => { const el = $(`.qz[data-i="${i}"]`, host), z = items[i];
    $$('button', el).forEach((b, j) => { b.disabled = true; b.classList.remove('pick'); if (j === z.a) b.classList.add('ok'); else if (j === pick[i]) b.classList.add('no'); });
    $('.why', el).hidden = false; };
  const finish = () => { const sc = items.filter((z, i) => pick[i] === z.a).length, el = $('.score', host);
    el.hidden = false; el.innerHTML = bi(`Score: ${sc} / ${items.length}`, `স্কোর: ${bn2(sc)} / ${bn2(items.length)}`, 1); if (opt.onDone) opt.onDone(sc); };
  host.addEventListener('click', e => { const b = e.target.closest('.opts button'); if (!b || b.disabled) return;
    const i = +b.closest('.qz').dataset.i; pick[i] = +b.dataset.j;
    if (instant) { reveal(i); if (Object.keys(pick).length === items.length) finish(); }
    else { $$('button', b.parentNode).forEach(x => x.classList.remove('pick')); b.classList.add('pick'); } });
  return { submit() { items.forEach((_, i) => reveal(i)); finish(); } };
}
function mountViz(root) { $$('[data-viz]', root).forEach(f => { const v = VIZ[f.dataset.viz]; if (v) v.fn($('.vz', f)); }); }

/* ---------- pages ---------- */
const app = () => $('#app');
function home() {
  const done = CH.filter(c => S.done[c.id]).length, pct = Math.round(done / CH.length * 100), next = CH.find(c => !S.done[c.id]) || CH[0];
  const nq = CH.reduce((n, c) => n + c.b.filter(b => b.k === 'q').length, 0);
  app().innerHTML = `
  <section class="card hero">
    <h1>${bi('Data Structure & Algorithm, from zero to the exam hall', 'ডাটা স্ট্রাকচার ও অ্যালগরিদম — শূন্য থেকে পরীক্ষার হল পর্যন্ত')}</h1>
    <p>${bi('For Bangladesh Bank, BCS, BPSC, Combined Bank, NTRCA and govt IT officer written exams. Every idea line by line, with animations you can play.', 'বাংলাদেশ ব্যাংক, BCS, BPSC, Combined Bank, NTRCA ও সরকারি IT অফিসার লিখিত পরীক্ষার জন্য। প্রতিটি ধারণা লাইন ধরে ধরে, সাথে চালিয়ে দেখার মতো animation।')}</p>
    <div class="stats"><span><b>${CH.length}</b>${bi('chapters', 'অধ্যায়', 1)}</span><span><b>${Object.keys(VIZ).length}</b>${bi('animations', 'animation', 1)}</span><span><b>${nq}</b>${bi('past questions', 'বিগত প্রশ্ন', 1)}</span><span><b>${pct}%</b>${bi('finished', 'শেষ হয়েছে', 1)}</span></div>
    <div class="meter"><i style="width:${pct}%"></i></div>
    <div class="row"><a class="btn" href="#/c/${next.id}">${bi(done ? 'Continue' : 'Start here', done ? 'যেখানে ছিলেন' : 'এখান থেকে শুরু', 1)}: ${next.n}. ${next.t[0]} →</a></div>
  </section>
  <section class="grid4">
    <a class="tile" href="#/lab"><span class="k">▶</span><b>${bi('Animation lab', 'Animation ল্যাব', 1)}</b><span>${bi('Play every algorithm step by step', 'প্রতিটি algorithm ধাপে ধাপে চালান', 1)}</span></a>
    <a class="tile" href="#/bank"><span class="k">?</span><b>${bi('Question bank', 'প্রশ্ন ব্যাংক', 1)}</b><span>${bi('Past questions with model answers', 'বিগত প্রশ্ন ও model answer', 1)}</span></a>
    <a class="tile" href="#/mock"><span class="k">✓</span><b>${bi('Mock test', 'মক টেস্ট', 1)}</b><span>${bi('20 MCQ, 15 minutes', '২০টি MCQ, ১৫ মিনিট', 1)}${S.best ? ` · best ${S.best}/20` : ''}</span></a>
    <a class="tile" href="#/sheet"><span class="k">≡</span><b>${bi('Revision sheet', 'রিভিশন শিট', 1)}</b><span>${bi('Read this the night before', 'পরীক্ষার আগের রাতে পড়ুন', 1)}</span></a>
  </section>
  <section class="card">
    <h2 class="sec">${bi('Short on time? Study in this order', 'সময় কম? এই ক্রমে পড়ুন')}</h2>
    <div class="lines" style="margin-top:10px">${[1, 2, 3].map(t => `<div class="ln"><p><span class="pill t${t}">${bi(TIER[t][0], TIER[t][1], 1)}</span> ${CH.filter(c => c.tier === t).map(c => `<a href="#/c/${c.id}">${c.n}. ${c.t[0]}</a>`).join(' · ')}</p></div>`).join('')}</div>
  </section>
  <h2 class="sec">${bi('All chapters', 'সব অধ্যায়')}</h2>
  <section class="chs">${CH.map(c => `<a class="ch${S.done[c.id] ? ' done' : ''}" href="#/c/${c.id}"><span class="no">${S.done[c.id] ? '✓' : c.n}</span><span><h3>${bi(c.t[0], c.t[1])}</h3><p>${bi(c.s[0], c.s[1], 1)}</p></span><span class="pill t${c.tier}">${bi('T' + c.tier, 'ধাপ ' + bn2(c.tier), 1)}</span></a>`).join('')}</section>
  <footer class="card author"><span class="av" aria-hidden="true">EA</span><div><p class="mute sm">${bi('Made by', 'তৈরি করেছেন', 1)}</p><h3>Eftekher Ali Efte</h3><p>${bi('Software Engineer, National Bank PLC', 'Software Engineer, National Bank PLC', 1)}</p><p class="mute sm">CSE, RUET · Ex-Notre Damian</p></div></footer>`;
}
function chapter(id) {
  const i = CH.findIndex(c => c.id === id), c = CH[i]; if (!c) return home();
  const prev = CH[i - 1], next = CH[i + 1];
  app().innerHTML = `
  <div class="chead"><div class="crumbs"><a href="#/">${bi('All chapters', 'সব অধ্যায়', 1)}</a><span>/</span><span>${bi('Chapter', 'অধ্যায়', 1)} ${c.n}</span><span class="pill t${c.tier}">${bi(TIER[c.tier][0], TIER[c.tier][1], 1)}</span></div>
  <h1>${bi(c.t[0], c.t[1])}</h1></div>
  <article>${c.b.map(block).join('')}
  <h3>${bi('Check yourself', 'নিজেকে যাচাই করুন')}</h3><div id="cq" style="display:flex;flex-direction:column;gap:10px"></div></article>
  <div class="navrow"><button class="btn pri" id="mk">${S.done[c.id] ? bi('✓ Completed', '✓ শেষ হয়েছে', 1) : bi('Mark chapter as done', 'অধ্যায় শেষ করলাম', 1)}</button></div>
  <div class="navrow">${prev ? `<a class="btn" href="#/c/${prev.id}">← ${prev.n}. ${prev.t[0]}</a>` : '<span></span>'}${next ? `<a class="btn pri" href="#/c/${next.id}">${next.n}. ${next.t[0]} →</a>` : `<a class="btn pri" href="#/mock">${bi('Take the mock test', 'মক টেস্ট দিন', 1)} →</a>`}</div>`;
  mountViz(app());
  quiz($('#cq'), c.z, { onDone: sc => { S.quiz[c.id] = sc; save(); } });
  $('#mk').onclick = e => { S.done[c.id] = !S.done[c.id]; save(); e.currentTarget.innerHTML = S.done[c.id] ? bi('✓ Completed', '✓ শেষ হয়েছে', 1) : bi('Mark chapter as done', 'অধ্যায় শেষ করলাম', 1); };
}
function lab(id) {
  const ids = Object.keys(VIZ); if (!VIZ[id]) id = 'sort';
  app().innerHTML = `<div class="chead"><h1>${bi('Animation lab', 'Animation ল্যাব')}</h1><p class="mute">${bi('Pick one, press play, change the input. Watching it move is the fastest way to remember the steps.', 'একটা বেছে নিন, play চাপুন, input বদলান। চোখে দেখলে ধাপগুলো সবচেয়ে দ্রুত মনে থাকে।')}</p></div>
  <div class="chips scroll">${ids.map(k => `<button data-k="${k}" class="${k === id ? 'on' : ''}">${VIZ[k].t[0]}</button>`).join('')}</div>
  <figure class="viz" data-viz="${id}"><figcaption>${bi(VIZ[id].t[0], VIZ[id].t[1])}</figcaption><div class="vz"></div></figure>
  ${VIZ[id].ch ? `<a class="btn" href="#/c/${VIZ[id].ch}">${bi('Read the chapter', 'অধ্যায়টি পড়ুন', 1)} →</a>` : ''}`;
  mountViz(app());
  const on = $('.chips .on'); if (on) $('.chips').scrollLeft = on.offsetLeft - $('.chips').offsetLeft - 16;
  $('.chips').onclick = e => { const b = e.target.closest('button'); if (b) location.hash = '#/lab/' + b.dataset.k; };
}
function bank() {
  const all = []; CH.forEach(c => c.b.forEach(b => { if (b.k === 'q') all.push({ b, c }); }));
  const groups = { All: /./, BCS: /BCS/, BPSC: /BPSC|PSC/, Bank: /Bank|BB |PKB|RAKUB|DBBL|PSB|BBL|BNPS/, NTRCA: /NTRCA/, BUET: /BUET/, Power: /BPDB|DESCO|NESCO|PGCB|BAPEX|Titas|SGFL|BGDCL|NSFCL|WZPDCL/ };
  let g = 'All', term = '';
  app().innerHTML = `<div class="chead"><h1>${bi('Question bank', 'প্রশ্ন ব্যাংক')}</h1><p class="mute">${bi(`${all.length} past written questions with answers you can reproduce in the exam. Tap a question to open it.`, `${bn2(all.length)}টি বিগত লিখিত প্রশ্ন, পরীক্ষায় লেখার মতো উত্তরসহ। প্রশ্নে চাপ দিলে উত্তর খুলবে।`)}</p></div>
  <input class="find" id="bf" type="search" placeholder="Search: stack, BFS, 45th BCS…" aria-label="Search questions">
  <div class="chips">${Object.keys(groups).map(k => `<button data-k="${k}" class="${k === 'All' ? 'on' : ''}">${k}</button>`).join('')}</div>
  <p class="mute sm" id="bc"></p><div id="bl" style="display:flex;flex-direction:column;gap:8px"></div>`;
  const draw = () => { const r = all.filter(x => groups[g].test(x.b.tag) && (x.b.q + x.b.tag + x.b.en).toLowerCase().includes(term));
    $('#bc').textContent = r.length + ' / ' + all.length; $('#bl').innerHTML = r.map(x => qHTML(x.b, x.c)).join('') || `<p class="mute">${bi('Nothing matches. Try a shorter word.', 'কিছু মেলেনি। ছোট শব্দ দিয়ে খুঁজুন।')}</p>`; };
  $('#bf').oninput = e => { term = e.target.value.trim().toLowerCase(); draw(); };
  $('.chips').onclick = e => { const b = e.target.closest('button'); if (!b) return; g = b.dataset.k; $$('.chips button').forEach(x => x.classList.toggle('on', x === b)); draw(); };
  draw();
}
function mock() {
  const pool = QUICK.concat(...CH.map(c => c.z));
  app().innerHTML = `<div class="chead"><h1>${bi('Mock test', 'মক টেস্ট')}</h1><p class="mute">${bi(`20 questions picked at random from ${pool.length}. 15 minutes. Answers and reasons appear after you submit.`, `${bn2(pool.length)}টি থেকে এলোমেলোভাবে ২০টি প্রশ্ন। সময় ১৫ মিনিট। Submit করার পর উত্তর ও ব্যাখ্যা দেখাবে।`)}</p></div>
  <div class="card row" style="justify-content:space-between;position:sticky;top:58px;z-index:5"><span class="timer" id="tm">15:00</span><button class="btn pri" id="go">${bi('Start', 'শুরু করুন', 1)}</button></div><div id="mq" style="display:flex;flex-direction:column;gap:10px"></div>`;
  let t = null, left = 900, qz = null;
  const end = () => { clearInterval(t); t = null; if (qz) qz.submit(); qz = null; $('#go').innerHTML = bi('New test', 'নতুন টেস্ট', 1); };
  STOP.push(() => clearInterval(t));
  $('#go').onclick = () => {
    if (t) return end();
    const items = pool.slice().sort(() => Math.random() - .5).slice(0, 20); left = 900; $('#tm').textContent = '15:00';
    qz = quiz($('#mq'), items, { instant: false, onDone: sc => { if (sc > S.best) { S.best = sc; save(); } window.scrollTo({ top: 0 }); $('#tm').textContent = sc + ' / 20'; } });
    $('#go').innerHTML = bi('Submit', 'Submit করুন', 1);
    t = setInterval(() => { left--; $('#tm').textContent = String(left / 60 | 0).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); if (left <= 0) end(); }, 1000);
  };
}
function sheet() {
  app().innerHTML = `<div class="chead"><h1>${bi('Final revision sheet', 'চূড়ান্ত রিভিশন শিট')}</h1><p class="mute">${bi('Read only this page in the last hour before the exam.', 'পরীক্ষার আগের শেষ এক ঘণ্টায় শুধু এই পাতাটা পড়ুন।')}</p></div><article>` +
    SHEET.map(s => `<h3>${bi(s.h[0], s.h[1])}</h3>` + (s.t ? `<div class="tw"><table class="num"><thead><tr>${s.t[0].map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${s.t.slice(1).map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : `<div class="lines">${s.l.map(([e, n], i) => `<div class="ln"><p class="en"><b>${i + 1}.</b> ${e}</p><p class="bn">${n}</p></div>`).join('')}</div>`)).join('') + `</article>`;
}

/* ---------- router + chrome ---------- */
function route() {
  STOP.splice(0).forEach(f => f());
  const [, a, b] = location.hash.split('/');
  ({ c: () => chapter(b), lab: () => lab(b), bank, mock, sheet }[a] || home)();
  $$('.tabs a').forEach(x => x.classList.toggle('on', x.dataset.tab === (a === 'c' || !a ? 'home' : a)));
  window.scrollTo(0, 0);
}
function setLang(l) { S.lang = l; save(); document.body.className = 'lang-' + l; $$('.seg button').forEach(b => b.classList.toggle('on', b.dataset.lang === l)); }
function boot() {
  CH.forEach((c, i) => c.n = i + 1);
  if (S.theme) document.documentElement.dataset.theme = S.theme;
  setLang(S.lang);
  $('.seg').onclick = e => { const b = e.target.closest('button'); if (b) setLang(b.dataset.lang); };
  $('#theme').onclick = () => { const dark = S.theme ? S.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches; S.theme = dark ? 'light' : 'dark'; document.documentElement.dataset.theme = S.theme; save(); };
  addEventListener('hashchange', route); route();
}
