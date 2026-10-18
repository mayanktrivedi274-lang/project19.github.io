/*
 PROJECT 19 — Personalization settings
 1) Replace the values in SETTINGS below.
 2) Put her photo at assets/her-photo.jpg (JPG, PNG, or WebP; update PHOTO_PATH if needed).
 3) Write your own message in PERSONAL_MESSAGE.
*/
const SETTINGS = {
  NAME: "prathna",
  HER_NAME: "Prathna",
  PHOTO_PATH: "assets/portrait.jpg",
  US_PATH: "assets/us.jpg",
  PHOTO_CAPTION: "Mayank & Prathna",
  SCRAPBOOK_NOTE: "Same universe,\na good day ♡"
};
const BORN = new Date(2006, 9, 19, 0, 0, 0);

// Write the message yourself. Use a template literal (`...`) to keep line breaks.
const PERSONAL_MESSAGE = `Agar tum ye Msg padh rhi ho means mera project 19 properly work kar rha hai ( ofc karega hee, mene jo banaya hai)... 
Happy birthday Prathna, May all your wishes come true.

I've noticed your laugh, your energy, the way you show up, more than I've ever said, and tumhari laught (hasi) best hai in sabme... kch bhi bolne do tumhari hasi k liye, mene to pehele bhi bola hai kee mjhe to bht pasand hai tumhari hasi. Also tum smile kara kro, ye dullness achaa nhi lagta tumpe. Aside from that, mjhe lagta thaa kee mere 4th year mai bht bore hounga me, mere dono dosto k jaane k baad kch bhi khaas nhi rhega yaha, but I was wrong... Abhi bhi agar clg aane kaa mann kr rha hai to wo tumhari wajah se hee hai, lonely type feel nhi hota tumhare saath, Thank you for that...

Also fir ab graduation k baad sad to feel hoga hee, and tumahri yaad bhi ayegi, tum bhi kabbhi yaad kr lena agar time mile to madam ko... ab mere jesi hasti life mai aati bhi to ek hee baar hai... hehe... 

Aside from regrets kee tumhari practice and performance dono nhi dekh paya... usko cover up krne k liye mene tumhara dance performance around 100 baar dekh liya hai, so its all good, and tumhara dance sahi mai bht achaa thaa, mere ghar walo ne bhi yahi bola and meri mummy ne bhi bola... pita ji ko bhi dikha deta but wo thoda different matter ho jata so fir kbhi,,, hahahaha...

Wese to bolne k liye aur baate hai mere paas, but baadme better and sahi time pr bol dunga... also me normal way mai bhi wish kr skta thaa, but Mjhe to adat hee padi ye batane kee ki me to hu hee genius.

happy birthday again... enjoy kro, another gift awaits... 
Twenty already suits you.`;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const screens = $$(".screen");
let currentScreen = "screen-boot";
let wishesOpened = new Set();
let toastTimer;

function showScreen(id) {
  const target = document.getElementById(id);
  if (!target) return;
  screens.forEach(screen => {
    const active = screen.id === id;
    screen.classList.toggle("active", active);
    screen.setAttribute("aria-hidden", String(!active));
  });
  currentScreen = id; onEnter(id);
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  if (id === "screen-final") launchConfetti(100);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function configurePhotos() {
  $("#her-name-display").textContent = SETTINGS.HER_NAME;
  $("#photo-caption").textContent = SETTINGS.PHOTO_CAPTION;
  $("#scrap-note").textContent = SETTINGS.SCRAPBOOK_NOTE;
  $("#personal-letter").textContent = PERSONAL_MESSAGE;

  [$("#hero-photo"), $("#gallery-photo")].forEach(img => {
    img.src = img.id === "hero-photo" ? SETTINGS.PHOTO_PATH : SETTINGS.US_PATH;
    img.addEventListener("error", () => {
      img.style.display = "none";
      const placeholder = img.closest(".portrait-frame")?.querySelector(".photo-placeholder")
        || img.closest(".scrap-photo")?.querySelector(".scrap-placeholder");
      if (placeholder) placeholder.style.display = "flex";
    });
    img.addEventListener("load", () => {
      img.style.display = "block";
      const placeholder = img.closest(".portrait-frame")?.querySelector(".photo-placeholder")
        || img.closest(".scrap-photo")?.querySelector(".scrap-placeholder");
      if (placeholder) placeholder.style.display = "none";
    });
  });
}

const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const R = (a, b) => a + Math.random() * (b - a);
let ageTimer;
function ageNow() {
  const t = new Date();
  let y = t.getFullYear() - BORN.getFullYear(), m = t.getMonth() - BORN.getMonth(), d = t.getDate() - BORN.getDate();
  if (d < 0) { m--; d += new Date(t.getFullYear(), t.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  return { y, m, d, h: t.getHours(), mi: t.getMinutes(), s: t.getSeconds() };
}
const p2 = n => String(n).padStart(2, "0");
const AG = ["years", "months", "days", "hours", "minutes", "seconds"];
function tickAge() {
  const a = ageNow(), vals = [a.y, a.m, a.d, a.h, a.mi, a.s];
  $("#boot-status").textContent = `time on this planet: ${a.y}y ${a.m}m ${a.d}d ${p2(a.h)}:${p2(a.mi)}:${p2(a.s)}`;
  const g = $("#age-grid");
  if (!g.children.length) g.innerHTML = AG.map(k => `<div><b></b><small>${k}</small></div>`).join("");
  AG.forEach((k, i) => { const b = g.children[i].firstChild, v = String(vals[i]);
    if (b.textContent !== v) { b.textContent = v; if (b.dataset.on) { b.classList.remove("roll"); void b.offsetWidth; b.classList.add("roll"); } b.dataset.on = 1; } });
  const now = new Date(), st = new Date(2006 + a.y, 9, 19), en = new Date(2006 + a.y + 1, 9, 19), p = a.y >= 20 ? 1 : (now - st) / (en - st);
  $("#ring-f").style.strokeDashoffset = 100 - p * 100;
  $("#ring-t").textContent = a.y >= 20 ? "20" : Math.floor(p * 100) + "%";
  $("#ring-c").textContent = a.y >= 20 ? "welcome to twenty" : "of the way to twenty";
}
function runBootSequence() {
  document.body.classList.add("booting");
  const t = $("#terminal-lines"), box = $("#term-input"), inp = $("#name-in");
  t.innerHTML = ""; box.hidden = true; inp.value = ""; $("#boot-status").textContent = "Waiting for input...";
  const say = (txt, cls = "") => new Promise(res => {
    const d = document.createElement("div"); d.className = "terminal-line " + cls; t.appendChild(d);
    let i = 0; (function k() { d.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(k, RM ? 0 : 24); else res(); })();
  });
  (async () => {
    await sleep(700); await say("project 19 ... online"); await say("identify yourself.");
    box.hidden = false; inp.focus();
    inp.onkeydown = async e => {
      if (e.key !== "Enter") return;
      const v = inp.value.trim().toLowerCase(); inp.value = "";
      if (v !== SETTINGS.NAME) { await say(`"${v}" not recognised. try again.`, "bad"); return; }
      inp.onkeydown = null; box.hidden = true;
      await say("user verified: " + SETTINGS.HER_NAME);
      tickAge(); clearInterval(ageTimer); ageTimer = setInterval(tickAge, 1000);
      for (const l of ["measuring your time on earth ... ok", "planting the garden ... ok", "loading little moments ... ok", "compiling birthday ... 100%"]) { await say(l); await sleep(RM ? 0 : 350); }
      await say("launching in 3 . 2 . 1"); await sleep(RM ? 0 : 700); boom();
    };
  })();
}
function boom() {
  $("#flash").classList.remove("go"); void $("#flash").offsetWidth; $("#flash").classList.add("go");
  launchConfetti(140); sparkle(innerWidth / 2, innerHeight / 2, 200);
  setTimeout(() => { document.body.classList.remove("booting"); $("#cine").classList.add("show"); startDust(); }, 260);
}
/* sparkles */
const fx = $("#fx"), fc = fx.getContext("2d"); let P = [], run = false;
function rz() { fx.width = innerWidth; fx.height = innerHeight; } addEventListener("resize", rz); rz();
function star(x, y, r) { fc.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, d = i % 2 ? r * .3 : r; fc.lineTo(x + Math.cos(a) * d, y + Math.sin(a) * d); } fc.closePath(); fc.fill(); }
function loop() {
  fc.clearRect(0, 0, fx.width, fx.height); P = P.filter(p => p.l > 0);
  for (const p of P) { p.x += p.vx; p.y += p.vy; p.vy += .07; p.vx *= .985; p.l -= p.d; fc.globalAlpha = Math.max(p.l, 0); fc.fillStyle = p.c; star(p.x, p.y, p.r * (.5 + p.l)); }
  if (P.length) requestAnimationFrame(loop); else run = false;
}
function sparkle(x, y, n = 60) {
  const C = ["#fff", "#ff9fd8", "#cdb4ff", "#f6d88c", "#9de9dc"];
  for (let i = 0; i < n; i++) { const a = R(0, 6.28), v = R(1.5, 8); P.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, l: 1, d: R(.01, .024), r: R(3, 9), c: C[i % 5] }); }
  if (!run) { run = true; requestAnimationFrame(loop); }
}
function wish(x, y) {
  const w = $("#wish"); w.textContent = "Happy Birthday, " + SETTINGS.HER_NAME;
  w.style.left = Math.min(Math.max(x, 150), innerWidth - 150) + "px"; w.style.top = y + "px";
  w.classList.remove("go"); void w.offsetWidth; w.classList.add("go");
}
/* flowers: stems grow, leaves unfurl, heads bloom */
const COL = ["#ff8fab", "#ff6f91", "#f7a8c4", "#c4a1ff", "#ffb86b", "#ff7b8a", "#ffd1dc", "#9fd0ff"], TY = ["rose", "daisy", "tulip", "sun"];
function head(t, c) {
  let s = "";
  if (t === "daisy") { for (let i = 0; i < 16; i++) s += `<ellipse cx="0" cy="-17" rx="3.4" ry="15" transform="rotate(${i * 22.5})" fill="#fff" stroke="${c}" stroke-width=".7"/>`; s += '<circle r="8" fill="#f4c542"/><circle r="8" fill="none" stroke="#c98f1c" stroke-width="1.5" stroke-dasharray="1.5 2.5"/>'; }
  else if (t === "sun") { for (let k = 0; k < 2; k++) for (let i = 0; i < 14; i++) s += `<ellipse cx="0" cy="-22" rx="4.6" ry="14" transform="rotate(${i * 25.7 + k * 12})" fill="${k ? "#f7c92b" : "#e9a90f"}"/>`; s += '<circle r="11.5" fill="#5a3418"/><circle r="11.5" fill="none" stroke="#8a5a2b" stroke-width="2" stroke-dasharray="1 2.4"/>'; }
  else if (t === "tulip") { const p = "M-13 4C-19 -18 -8 -34 0 -40C8 -34 19 -18 13 4C6 9 -6 9 -13 4Z"; s += `<path d="${p}" transform="rotate(-16)" fill="${c}" opacity=".85"/><path d="${p}" transform="rotate(16)" fill="${c}" opacity=".85"/><path d="${p}" fill="${c}" stroke="rgba(255,255,255,.4)"/><path d="M0 -38C-3 -22 -3 -8 0 6" stroke="rgba(255,255,255,.35)" fill="none"/>`; }
  else { for (let k = 0; k < 6; k++) s += `<ellipse rx="${22 - k * 3.4}" ry="${19 - k * 3}" transform="rotate(${k * 41})" fill="${c}" stroke="rgba(90,0,30,.35)" stroke-width=".8" opacity="${.78 + k * .04}"/>`; s += '<path d="M-4 -2C-2 -6 4 -6 4 -1S-2 4 -5 1" stroke="rgba(90,0,30,.5)" fill="none" stroke-width="1.2"/>'; }
  return s;
}
function mkFlower(parent, o) {
  const b = R(-12, 12), hx = 50 + b * .5, hy = 46, H = o.H;
  const leaf = (y, d, l) => `<g class="leaf" style="--l:${l}s;transform-origin:${d > 0 ? "0%" : "100%"} 100%"><path d="M50 ${y}q${d * 30} -4 ${d * 38} -32q${-d * 30} 2 ${-d * 38} 32z"/><path d="M50 ${y}q${d * 18} -8 ${d * 30} -26" fill="none"/></g>`;
  const f = document.createElement("div"); f.className = "fl" + (o.back ? " back" : "");
  f.style.cssText = `left:${o.left};--d:${o.d}s;--sw:${R(3.8, 5.8)}s;--sd:${-R(0, 4)}s`;
  f.innerHTML = `<svg class="fsvg" viewBox="0 0 100 ${H}" style="width:${o.s}px;height:${o.s * H / 100}px"><path class="stem" pathLength="1" d="M50 ${H}C${50 - b} ${H * .72} ${50 + b} ${H * .42} ${hx} ${hy}"/>${leaf(H * .8, 1, 0)}${leaf(H * .62, -1, .25)}${H > 200 ? leaf(H * .46, 1, .5) : ""}<g transform="translate(${hx} ${hy}) scale(.8)"><g class="head"><g class="hd2">${head(o.t, o.c)}</g></g></g></svg>`;
  f.addEventListener("click", () => {
    const r = f.querySelector(".head").getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    sparkle(x, y); wish(x, y); f.classList.add("pop"); setTimeout(() => f.classList.remove("pop"), 600);
    if (o.g && !f.dataset.d) { f.dataset.d = 1; popped++; $("#garden-hint").textContent = popped === TOT ? "Every one of them was for you." : `${popped} / ${TOT} bloomed`; }
  });
  parent.appendChild(f);
}
const TOT = 18; let popped = 0;
for (let i = 0; i < TOT; i++) {
  const back = i < 8, j = back ? i : i - 8;
  mkFlower($("#garden"), { left: back ? 4 + j * 12 + "%" : 1 + j * 9.6 + "%", s: back ? R(56, 74) : R(78, 104), H: back ? R(130, 230) : R(150, 300), t: TY[(i * 3 + 1) % 4], c: COL[(i * 5) % COL.length], d: R(.2, 2.4), back, g: 1 });
}
[["1%", 0], ["10%", 1], ["19%", 2], ["80%", 3], ["89%", 0], ["98%", 1]].forEach(([l, k], i) => mkFlower($("#screen-reveal"), { left: l, s: R(54, 70), H: R(110, 200), t: TY[(k + 1) % 4], c: COL[(i * 3) % COL.length], d: R(1.5, 3), back: i % 3 == 1 }));
[["-13%", 0], ["-2%", 1], ["90%", 2], ["102%", 3]].forEach(([l, k], i) => mkFlower($(".scrapbook"), { left: l, s: R(54, 66), H: R(120, 190), t: TY[k], c: COL[(i * 2 + 1) % COL.length], d: R(1.2, 2.4) }));
/* wreath around the portrait */
(function () {
  const N = 14, Rr = 84; let s = "";
  for (let i = 0; i < N; i++) {
    const a = i * 360 / N, a2 = a + 180 / N, lf = "M0 0q7 -11 22 -9q-7 11 -22 9z";
    s += `<g class="wi" style="--i:${i}"><path d="${lf}" fill="#2f8450" transform="rotate(${a2}) translate(${Rr} 0) rotate(100)"/><path d="${lf}" fill="#3a9560" transform="rotate(${a2}) translate(${Rr} 0) rotate(-100)"/></g>`;
    s += `<g class="wi" style="--i:${i + .5}"><g transform="rotate(${a}) translate(${Rr} 0) rotate(${-a}) scale(.27)">${head(TY[i % 4], COL[i % COL.length])}</g></g>`;
  }
  $("#wreath").innerHTML = `<svg viewBox="-110 -110 220 220">${s}</svg>`;
})();
/* staggered entrances */
$$("#screen-reveal .reveal-content>*").forEach((el, i) => { el.classList.add(i === 0 ? "bloomin" : el.tagName === "H2" ? "nostag" : el.classList.contains("hand") ? "hd" : "st-in"); el.style.setProperty("--i", i); });
$$("#screen-gallery .gallery-copy>*").forEach((el, i) => { el.classList.add("st-in"); el.style.setProperty("--i", i); });
$(".scrapbook").classList.add("sbin");
/* drifting petals */
const pc = $("#petals"), px = pc.getContext("2d"); let pw, ph, pet = [];
function pr() { pw = pc.width = innerWidth; ph = pc.height = innerHeight; pet = Array.from({ length: Math.min(26, Math.round(pw / 40)) }, () => ({ x: R(0, pw), y: R(0, ph), s: R(5, 13), v: R(.35, 1), w: R(0, 6.28), r: R(0, 6.28), z: Math.random(), c: ["#ffb6c6", "#ffd9e2", "#f4a9d0", "#ffe7a8"][Math.floor(R(0, 4))] })); }
addEventListener("resize", pr); pr();
(function dp(t) {
  px.clearRect(0, 0, pw, ph);
  if (!document.body.classList.contains("booting")) for (const p of pet) {
    if (!RM) { p.y += p.v * (.6 + p.z); p.x += Math.sin(t / 1400 + p.w) * .7; p.r += .012; }
    if (p.y > ph + 20) { p.y = -20; p.x = R(0, pw); }
    px.save(); px.translate(p.x, p.y); px.rotate(p.r); px.globalAlpha = .25 + .5 * p.z; px.fillStyle = p.c; px.beginPath(); px.ellipse(0, 0, p.s * (.6 + p.z * .7), p.s * .4, 0, 0, 6.28); px.fill(); px.restore();
  }
  requestAnimationFrame(dp);
})(0);
/* typed letter */
let typeTok = 0;
function onEnter(id) {
  typeTok++;
  if (id === "screen-letter") startLetter();
  if (id === "screen-garden") { popped = 0; $$("#garden .fl").forEach(f => delete f.dataset.d); $("#garden-hint").textContent = `0 / ${TOT} bloomed`; }
}
async function startLetter() {
  const tok = typeTok, el = $("#personal-letter"), so = $(".letter-signoff"), end = $("#end-line"), rp = $("#replay-button");
  el.textContent = PERSONAL_MESSAGE; el.style.minHeight = el.offsetHeight + "px"; el.textContent = "";
  so.classList.remove("on"); end.classList.remove("on"); rp.hidden = true; el.classList.add("typing");
  let skip = false; $(".letter-paper").onclick = () => skip = true;
  for (const ch of PERSONAL_MESSAGE) {
    if (tok !== typeTok) return;
    el.textContent += ch;
    if (!skip && !RM) await sleep(ch === "\n" ? 380 : /[.,]/.test(ch) ? 190 : R(28, 52));
  }
  if (tok !== typeTok) return;
  el.classList.remove("typing"); so.classList.add("on"); await sleep(900); if (tok !== typeTok) return;
  end.classList.add("on"); sparkle(innerWidth / 2, end.getBoundingClientRect().top + 20, 90); launchConfetti(40);
  await sleep(1500); if (tok === typeTok) rp.hidden = false;
}

function launchConfetti(count = 70) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;
  const colors = ["#ff9fd8", "#cdb4ff", "#9de9dc", "#f8f4ff", "#f6d88c"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.setProperty("--fall-time", `${2.2 + Math.random() * 2.4}s`);
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
}

// A light, responsive starfield; no external graphics or libraries required.
function setupStarfield() {
  const canvas = $("#starfield");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width = 0, height = 0, stars = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const total = Math.min(150, Math.floor(width * height / 7000));
    stars = Array.from({ length: total }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      r: Math.random() * 1.35 + .2, phase: Math.random() * Math.PI * 2,
      speed: .003 + Math.random() * .009
    }));
    draw(0);
  }
  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
      const alpha = reduceMotion ? .45 : .25 + (Math.sin(t * star.speed + star.phase) + 1) * .28;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(222, 207, 255, ${alpha})`;
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();
}

$$("[data-next]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.next)));

$$(".wish-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.wish;
    const opening = card.getAttribute("aria-expanded") !== "true";
    card.setAttribute("aria-expanded", String(opening));
    if (opening) wishesOpened.add(key); else wishesOpened.delete(key);
    $("#wish-progress").textContent = `${wishesOpened.size} / 3 wishes discovered`;
    $("#continue-wishes").disabled = wishesOpened.size !== 3;
    if (wishesOpened.size === 3) $("#continue-wishes").textContent = "All wishes discovered — continue ↗";
  });
});
$("#continue-wishes").addEventListener("click", () => showScreen("screen-gallery"));
$("#replay-button").addEventListener("click", () => {
  wishesOpened.clear();
  $$(".wish-card").forEach(card => card.setAttribute("aria-expanded", "false"));
  $("#wish-progress").textContent = "0 / 3 wishes discovered";
  $("#continue-wishes").disabled = true;
  $("#continue-wishes").textContent = "Unlock the next little thing ↗";
  showScreen("screen-boot");
  runBootSequence();
});

configurePhotos();
setupStarfield();
runBootSequence();

/* cinematic portrait, dust, trail, tilt */
let dustOn = false;
function startDust() {
  const c = $("#dust"), x = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight; dustOn = true;
  const D = Array.from({ length: 90 }, () => ({ x: R(0, c.width), y: R(0, c.height), r: R(.6, 2.6), v: R(.2, .8), p: R(0, 6.28) }));
  (function f(t) {
    if (!dustOn) return; x.clearRect(0, 0, c.width, c.height);
    for (const d of D) { d.y -= d.v; d.x += Math.sin(t / 1200 + d.p) * .4; if (d.y < -5) { d.y = c.height + 5; d.x = R(0, c.width); }
      x.globalAlpha = .3 + .6 * Math.abs(Math.sin(t / 700 + d.p)); x.fillStyle = "#ffe7a8"; x.shadowColor = "#ffd37a"; x.shadowBlur = 8; x.beginPath(); x.arc(d.x, d.y, d.r, 0, 6.28); x.fill(); }
    requestAnimationFrame(f);
  })(0);
}
$("#cine-go").addEventListener("click", e => { showScreen("screen-reveal"); $("#cine").classList.remove("show"); sparkle(e.clientX, e.clientY, 70); setTimeout(() => dustOn = false, 1800); });
addEventListener("pointermove", e => {
  if (document.body.classList.contains("booting") || RM || Math.random() > .45) return;
  P.push({ x: e.clientX, y: e.clientY, vx: R(-.6, .6), vy: R(-.8, .2), l: 1, d: .03, r: R(2, 5), c: ["#fff", "#ff9fd8", "#f6d88c", "#cdb4ff"][Math.floor(R(0, 4))] });
  if (!run) { run = true; requestAnimationFrame(loop); }
});
const po = $("#photo-orbit");
po.addEventListener("pointermove", e => { const r = po.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; $(".portrait-frame").style.transform = `perspective(700px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`; });
po.addEventListener("pointerleave", () => $(".portrait-frame").style.transform = "");
