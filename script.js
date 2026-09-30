/* ==================================================
   SINH NHẬT BVON — SCRIPT (FULL FIXED)
================================================== */

// ===== TIỆN ÍCH =====
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (arr) => arr[randInt(0, arr.length - 1)];
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== CẤU HÌNH =====
const CONFIG = {
  friendName: 'BVON',
  // Danh sách ảnh — 13 ảnh (đã xóa 3 ảnh gốc #1, #10, #14)
  // Nếu bạn đổi tên ảnh khác, sửa mảng này
  photoList: [
  'images/photo2.jpg',
  'images/photo3.jpg',
  'images/photo4.jpg',
  'images/photo5.jpg',
  'images/photo6.jpg',
  'images/photo7.jpg',
  'images/photo8.jpg',
  'images/photo9.jpg',
  'images/photo11.jpg',
  'images/photo12.jpg',
  'images/photo13.jpg',
  'images/photo15.jpg',
  'images/photo16.jpg',
],
  countdownFrom: 3,
  slideDuration: 4000,
};

// ===== STATE =====
let state = {
  currentScreen: 'countdown',
  giftChosen: null,
  cakeDropped: false,
  candleBlown: false,
  currentSlide: 0,
  slideTimer: null,
  envelopeOpened: false,
  micStream: null,
  micAnalyser: null,
  micListening: false,
};

// ==================================================
// 1. NỀN
// ==================================================
(function createStars() {
  const container = $('#stars');
  if (!container) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 180; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = rand(1, 3);
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = rand(0, 100) + '%';
    s.style.top = rand(0, 100) + '%';
    s.style.animationDelay = rand(0, 4) + 's';
    s.style.animationDuration = rand(3, 6) + 's';
    if (Math.random() > 0.75) {
      s.style.boxShadow = '0 0 8px #e0eaff, 0 0 16px #5b9bd5';
    }
    frag.appendChild(s);
  }
  container.appendChild(frag);
})();

(function shootingStars() {
  const container = $('#shootingStars');
  if (!container) return;
  function spawn() {
    const s = document.createElement('div');
    s.className = 'shooting-star';
    s.style.left = rand(-5, 70) + 'vw';
    s.style.top = rand(0, 50) + 'vh';
    container.appendChild(s);
    const duration = rand(900, 1800);
    const driftX = rand(350, 700);
    const driftY = rand(150, 350);
    s.animate([
      { transform: `translate(0, 0) rotate(35deg)`, opacity: 0 },
      { transform: `translate(${driftX * 0.15}px, ${driftY * 0.15}px) rotate(35deg)`, opacity: 1, offset: 0.15 },
      { transform: `translate(${driftX}px, ${driftY}px) rotate(35deg)`, opacity: 0 }
    ], { duration, easing: 'ease-out' });
    setTimeout(() => s.remove(), duration);
  }
  setInterval(() => { if (Math.random() < 0.4) spawn(); }, 2500);
})();

(function floatingObjects() {
  const container = $('#floatingObjects');
  if (!container) return;
  const objects = [
    { svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M30 60 Q30 35 50 35 Q70 35 70 60 Q70 80 50 85 Q30 80 30 60 Z" fill="rgba(91,155,213,0.15)"/><circle cx="50" cy="58" r="6" fill="rgba(184,208,240,0.4)"/><line x1="50" y1="35" x2="50" y2="10"/><line x1="45" y1="10" x2="55" y2="10"/></svg>`, size: 70 },
    { svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="15" y="55" width="70" height="35" rx="4" fill="rgba(91,155,213,0.15)"/><circle cx="50" cy="72" r="12" fill="rgba(184,208,240,0.3)"/><circle cx="35" cy="72" r="2" fill="currentColor"/><circle cx="65" cy="72" r="2" fill="currentColor"/><circle cx="45" cy="80" r="2" fill="currentColor"/><circle cx="55" cy="80" r="2" fill="currentColor"/><path d="M25 55 Q50 40 75 55" fill="rgba(91,155,213,0.2)"/></svg>`, size: 65 },
    { svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="30" width="80" height="45" rx="3" fill="rgba(91,155,213,0.15)"/><circle cx="35" cy="52" r="8" fill="none"/><circle cx="65" cy="52" r="8" fill="none"/><circle cx="35" cy="52" r="3" fill="currentColor"/><circle cx="65" cy="52" r="3" fill="currentColor"/><line x1="35" y1="52" x2="65" y2="52"/></svg>`, size: 75 },
    { svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="50" cy="50" r="40" fill="rgba(91,155,213,0.1)"/><circle cx="50" cy="50" r="30" fill="none"/><circle cx="50" cy="50" r="20" fill="none"/><circle cx="50" cy="50" r="8" fill="rgba(184,208,240,0.4)"/><circle cx="50" cy="50" r="3" fill="currentColor"/></svg>`, size: 80 },
    { svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="50" cy="50" r="35" fill="rgba(91,155,213,0.12)"/><line x1="50" y1="50" x2="50" y2="30"/><line x1="50" y1="50" x2="65" y2="55"/><circle cx="50" cy="50" r="2" fill="currentColor"/></svg>`, size: 60 },
    { svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 25 L20 75 L50 80 L50 30 Z" fill="rgba(91,155,213,0.15)"/><path d="M50 30 L50 80 L80 75 L80 25 Z" fill="rgba(184,208,240,0.15)"/><line x1="50" y1="30" x2="50" y2="80"/></svg>`, size: 60 },
    { svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 40 L50 40 L75 25 L75 75 L50 60 L20 60 Z" fill="rgba(91,155,213,0.15)"/></svg>`, size: 55 },
  ];
  const positions = [
    { top: '12%', left: '8%', delay: '0s' },
    { top: '8%', left: '78%', delay: '2s' },
    { top: '25%', left: '88%', delay: '4s' },
    { top: '35%', left: '5%', delay: '1s' },
    { top: '55%', left: '12%', delay: '3s' },
    { top: '70%', left: '85%', delay: '5s' },
    { top: '82%', left: '20%', delay: '2.5s' },
  ];
  objects.forEach((obj, i) => {
    const el = document.createElement('div');
    el.className = 'float-obj';
    el.innerHTML = obj.svg;
    el.style.width = obj.size + 'px';
    el.style.height = obj.size + 'px';
    const pos = positions[i % positions.length];
    el.style.top = pos.top;
    el.style.left = pos.left;
    el.style.animationDelay = pos.delay;
    el.style.animationDuration = rand(15, 25) + 's';
    container.appendChild(el);
  });
})();

// ==================================================
// 2. PHÁO HOA
// ==================================================
const canvas = $('#fireworks');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const shellColors = ['#5b9bd5', '#a8c8e8', '#e0eaff', '#3b6ba5', '#1e3a63', '#b8d0f0', '#7ba8d8', '#ffffff'];

class Particle {
  constructor(x, y, color, opts = {}) {
    this.x = x; this.y = y; this.color = color;
    const angle = opts.angle !== undefined ? opts.angle : rand(0, Math.PI * 2);
    const speed = opts.speed !== undefined ? opts.speed : rand(1.5, 5);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = rand(0.006, 0.015);
    this.size = rand(1, 2.8);
    this.gravity = opts.gravity !== undefined ? opts.gravity : 0.04;
    this.friction = opts.friction !== undefined ? opts.friction : 0.99;
    this.trail = [];
    this.maxTrail = opts.maxTrail || 6;
    this.glow = opts.glow !== undefined ? opts.glow : 15;
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.maxTrail) this.trail.shift();
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.friction; this.vy *= this.friction;
    this.life -= this.decay;
    this.size *= 0.992;
  }
  draw() {
    ctx.save();
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.globalAlpha = (this.life * i) / this.trail.length * 0.4;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.size * (i / this.trail.length), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.glow;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function createFirework(x, y, type = 'default', count = null) {
  const color = pick(shellColors);
  const color2 = pick(shellColors);
  if (type === 'ring') {
    const n = count || 70;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      particles.push(new Particle(x, y, color, { angle, speed: 4 }));
    }
  } else if (type === 'willow') {
    const n = count || 90;
    for (let i = 0; i < n; i++) {
      const angle = rand(0, Math.PI * 2);
      particles.push(new Particle(x, y, pick([color, color2]), { angle, speed: rand(1, 4), gravity: 0.08, maxTrail: 8 }));
    }
  } else if (type === 'burst') {
    const n = count || 100;
    for (let i = 0; i < n; i++) {
      particles.push(new Particle(x, y, pick([color, color2, '#ffffff']), { speed: rand(1.5, 7), maxTrail: 7, glow: 20 }));
    }
  } else {
    const n = count || randInt(50, 80);
    for (let i = 0; i < n; i++) {
      particles.push(new Particle(x, y, Math.random() > 0.5 ? color : color2));
    }
  }
}

function animateFireworks() {
  ctx.fillStyle = 'rgba(5, 13, 31, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) particles.splice(i, 1);
  }
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

setInterval(() => {
  if (state.currentScreen === 'countdown') return;
  createFirework(
    rand(canvas.width * 0.15, canvas.width * 0.85),
    rand(canvas.height * 0.1, canvas.height * 0.5),
    pick(['default', 'ring', 'willow', 'burst'])
  );
}, 3000);

// ==================================================
// 3. CONFETTI
// ==================================================
const confettiColors = ['#5b9bd5', '#a8c8e8', '#e0eaff', '#3b6ba5', '#b8d0f0', '#ffffff'];
const confettiShapes = ['50%', '2px', '0', '50% 0 50% 0'];

function createConfetti(count = 1) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.style.position = 'fixed';
    c.style.top = '-30px';
    c.style.zIndex = '9';
    c.style.pointerEvents = 'none';
    c.style.left = rand(0, 100) + 'vw';
    const size = rand(6, 14);
    c.style.width = size + 'px';
    c.style.height = size * rand(0.5, 1) + 'px';
    const color = pick(confettiColors);
    c.style.background = color;
    c.style.borderRadius = pick(confettiShapes);
    c.style.boxShadow = `0 0 8px ${color}`;
    frag.appendChild(c);
    const duration = rand(3500, 6500);
    const drift = rand(-250, 250);
    const rotate = rand(-900, 900);
    c.animate([
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${drift}px, 105vh) rotate(${rotate}deg)`, opacity: 0 }
    ], { duration, easing: 'cubic-bezier(0.2, 0.6, 0.5, 1)' });
    setTimeout(() => c.remove(), duration);
  }
  document.body.appendChild(frag);
}

// ==================================================
// 4. QUẢN LÝ SCREEN
// ==================================================
function goToScreen(name) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const target = $(`#screen${name.charAt(0).toUpperCase() + name.slice(1)}`);
  if (target) target.classList.add('active');
  state.currentScreen = name;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ==================================================
// 5. BEEP
// ==================================================
function playBeep(freq = 440, duration = 0.15) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

// ==================================================
// 6. COUNTDOWN
// ==================================================
let countdownTimers = [];

function startCountdown() {
  goToScreen('countdown');
  clearCountdownTimers();

  const numberEl = $('#countdownNumber');
  const hintEl = $('#countdownHint');
  const particlesEl = $('#countdownParticles');

  if (!numberEl) { console.error('❌ Không tìm thấy #countdownNumber'); return; }
  if (particlesEl) createCountdownParticles(particlesEl);
  if (hintEl) hintEl.textContent = 'Chuẩn bị';

  numberEl.className = 'countdown-number';
  numberEl.textContent = '';

  let n = CONFIG.countdownFrom;

  function showNumber(num) {
    if (numberEl.textContent && numberEl.textContent !== '') {
      numberEl.classList.remove('enter', 'final');
      numberEl.classList.add('exit');
      const t = setTimeout(() => {
        numberEl.classList.remove('exit');
        numberEl.textContent = num;
        numberEl.classList.add('enter');
      }, 400);
      countdownTimers.push(t);
    } else {
      numberEl.textContent = num;
      numberEl.classList.add('enter');
    }
    playBeep(500 + (CONFIG.countdownFrom - num) * 100, 0.12);
  }

  function tick() {
    if (n > 0) {
      showNumber(n);
      n--;
      const t = setTimeout(tick, 1000);
      countdownTimers.push(t);
    } else {
      numberEl.classList.remove('enter');
      numberEl.classList.add('exit');
      const t1 = setTimeout(() => {
        numberEl.classList.remove('exit');
        numberEl.textContent = '🎁';
        numberEl.classList.add('final');
        if (hintEl) hintEl.textContent = 'Món quà dành cho bạn';
        playBeep(900, 0.4);
      }, 400);
      countdownTimers.push(t1);
      const t2 = setTimeout(() => {
        goToScreen('gifts');
        startAmbientMusic();
      }, 1800);
      countdownTimers.push(t2);
    }
  }

  const t0 = setTimeout(tick, 500);
  countdownTimers.push(t0);
}

function clearCountdownTimers() {
  countdownTimers.forEach(t => clearTimeout(t));
  countdownTimers = [];
}

function createCountdownParticles(container) {
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'countdown-particle';
    p.style.left = rand(10, 90) + '%';
    p.style.top = rand(40, 90) + '%';
    p.style.animationDelay = rand(0, 3) + 's';
    p.style.animationDuration = rand(2, 4) + 's';
    const color = pick(['#e0eaff', '#a8c8e8', '#5b9bd5', '#b8d0f0']);
    p.style.background = color;
    p.style.boxShadow = `0 0 10px ${color}`;
    container.appendChild(p);
  }
}

// ==================================================
// 7. CHỌN HỘP QUÀ
// ==================================================
function chooseGift(n) {
  if (state.giftChosen) return;
  state.giftChosen = n;

  const boxes = $$('.gift-box');
  boxes.forEach(box => {
    const boxN = parseInt(box.dataset.gift);
    if (boxN === n) box.classList.add('opening');
    else box.classList.add('dimmed');
  });

  const chosen = boxes[n - 1];
  const rect = chosen.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      createFirework(cx + rand(-100, 100), cy + rand(-50, 50), 'burst', 70);
    }, i * 150);
  }
  createConfetti(60);

  setTimeout(() => {
    goToScreen('cake');
    startBuildMusic();
    setTimeout(() => dropCake(), 500);
  }, 1400);
}

// ==================================================
// 8. BÁNH RƠI
// ==================================================
function dropCake() {
  if (state.cakeDropped) return;
  state.cakeDropped = true;

  const pieces = $$('.cake-piece');
  const cake = $('#cake');
  const cakeWrap = $('#cakeWrap');
  const delays = [0, 700, 1400, 2100, 2900];

  pieces.forEach((piece, index) => {
    setTimeout(() => {
      piece.classList.add('dropping');
      setTimeout(() => {
        createDust(piece, cakeWrap);
        if (cake) {
          cake.classList.add('shake');
          setTimeout(() => cake.classList.remove('shake'), 400);
        }
        playBeep(rand(200, 300), 0.08);
        const rect = piece.getBoundingClientRect();
        createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 'burst', 30);
      }, 550);
      setTimeout(() => {
        piece.classList.remove('dropping');
        piece.classList.add('landed');
      }, 950);
    }, delays[index]);
  });

  setTimeout(() => {
    const flame = $('#flame');
    if (flame) flame.classList.add('lit');
    playBeep(800, 0.4);
    const cakeRect = cake.getBoundingClientRect();
    createFirework(cakeRect.left + cakeRect.width / 2, cakeRect.top + cakeRect.height / 2 - 100, 'ring', 80);
    setTimeout(() => {
      const hint = $('#cakeHint');
      if (hint) hint.style.display = 'none';
      const btn = $('#btnBlow');
      if (btn) btn.classList.remove('hidden');
      const mic = $('#micHint');
      if (mic) mic.classList.remove('hidden');
      setupMicrophone();
    }, 800);
  }, delays[4] + 1100);
}

function createDust(piece, container) {
  if (!container) return;
  const rect = piece.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  for (let i = 0; i < 12; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust-particle';
    const offsetX = (Math.random() - 0.5) * 160;
    dust.style.left = (rect.left - containerRect.left + rect.width / 2 + offsetX) + 'px';
    dust.style.top = (rect.bottom - containerRect.top) + 'px';
    const dx = (Math.random() - 0.5) * 120;
    const dy = -Math.random() * 40 - 10;
    dust.style.setProperty('--dx', dx + 'px');
    dust.style.setProperty('--dy', dy + 'px');
    const color = pick(['#a8c8e8', '#e0eaff', '#b8d0f0', '#5b9bd5']);
    dust.style.background = color;
    dust.style.boxShadow = `0 0 10px ${color}`;
    const size = 3 + Math.random() * 5;
    dust.style.width = size + 'px';
    dust.style.height = size + 'px';
    container.appendChild(dust);
    setTimeout(() => dust.remove(), 800);
  }
}

// ==================================================
// 9. MIC
// ==================================================
function setupMicrophone() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    const s = $('#micStatus');
    if (s) s.textContent = 'Thiết bị không hỗ trợ mic';
    return;
  }
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      state.micStream = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      state.micAnalyser = analyser;
      const s = $('#micStatus');
      if (s) { s.textContent = 'Đang lắng nghe...'; s.classList.add('active'); }
      listenForBlow();
    })
    .catch(err => {
      console.warn('Mic error:', err);
      const s = $('#micStatus');
      if (s) s.textContent = 'Không truy cập được mic — dùng nút bên trên';
    });
}

function listenForBlow() {
  if (!state.micAnalyser || state.candleBlown) return;
  state.micListening = true;
  const dataArray = new Uint8Array(state.micAnalyser.frequencyBinCount);
  let blowCount = 0;
  function check() {
    if (state.candleBlown) return;
    state.micAnalyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
    const avg = sum / dataArray.length;
    if (avg > 60) {
      blowCount++;
      if (blowCount > 5) { blowCandle(); return; }
    } else {
      blowCount = Math.max(0, blowCount - 1);
    }
    requestAnimationFrame(check);
  }
  check();
}

// ==================================================
// 10. THỔI NẾN
// ==================================================
function blowCandle() {
  if (state.candleBlown) return;
  state.candleBlown = true;

  if (state.micStream) state.micStream.getTracks().forEach(t => t.stop());
  const mic = $('#micHint');
  if (mic) mic.classList.add('hidden');
  const btn = $('#btnBlow');
  if (btn) btn.classList.add('hidden');

  const flame = $('#flame');
  if (flame) flame.classList.add('out');

  const types = ['default', 'ring', 'willow', 'burst'];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      createFirework(rand(canvas.width * 0.05, canvas.width * 0.95), rand(canvas.height * 0.1, canvas.height * 0.7), types[i % types.length], 100);
    }, i * 180);
  }
  createConfetti(150);
  setTimeout(() => createConfetti(100), 450);
  setTimeout(() => createConfetti(100), 950);

  setTimeout(() => {
    const popup = $('#wishPopup');
    if (popup) popup.classList.add('show');
  }, 800);

  setTimeout(() => {
    const popup = $('#wishPopup');
    if (popup) popup.classList.remove('show');
    setTimeout(() => {
      goToScreen('gallery');
      startEmotionalMusic();
      playVoiceWish();
      startSlideshow();
    }, 500);
  }, 4500);
}

// ==================================================
// 11. SLIDESHOW — DÙNG photoList
// ==================================================
function buildSlideshow() {
  const track = $('#slidesTrack');
  const indicators = $('#slideIndicators');
  if (!track) return;
  track.innerHTML = '';
  indicators.innerHTML = '';

  const list = CONFIG.photoList;
  list.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
      <img src="${src}" alt="Kỷ niệm ${i + 1}"
           onerror="this.src='https://picsum.photos/800/800?random=${i + 1}&grayscale'">
      <div class="slide-caption">Kỷ niệm ${String(i + 1).padStart(2, '0')}</div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    indicators.appendChild(dot);
  });
}

function startSlideshow() {
  buildSlideshow();
  state.currentSlide = 0;
  clearInterval(state.slideTimer);
  state.slideTimer = setInterval(() => nextSlide(), CONFIG.slideDuration);
}

function goToSlide(n) {
  const slides = $$('.slide');
  const dots = $$('.slide-dot');
  if (!slides.length) return;
  n = (n + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === n));
  dots.forEach((d, i) => d.classList.toggle('active', i === n));
  state.currentSlide = n;
}

function nextSlide() { goToSlide(state.currentSlide + 1); }
function prevSlide() { goToSlide(state.currentSlide - 1); }

// ==================================================
// 12. LÁ THƯ
// ==================================================
function goToLetter() {
  clearInterval(state.slideTimer);
  goToScreen('letter');
}

function openEnvelope() {
  if (state.envelopeOpened) return;
  state.envelopeOpened = true;
  const env = $('#envelope');
  if (env) env.classList.add('open');
  createConfetti(40);
  playBeep(700, 0.2);
  setTimeout(() => {
    const btn = $('#btnNextLetter');
    if (btn) btn.classList.remove('hidden');
  }, 1500);
}

function goToEnding() {
  goToScreen('ending');

  // 🌟 Tạo sao bay
  setTimeout(() => {
    createEndingStars();
  }, 300);

  // Hiện chữ dần
  setTimeout(() => { const l = $('#endingLine1'); if (l) l.classList.add('show'); }, 2000);
  setTimeout(() => { const l = $('#endingLine2'); if (l) l.classList.add('show'); }, 3500);
  setTimeout(() => { const l = $('#endingLine3'); if (l) l.classList.add('show'); }, 5000);
}

// ==================================================
// TẠO SAO Ở ENDING
// ==================================================
let endingStarInterval = null;

function createEndingStars() {
  const container = $('#endingStars');
  if (!container) return;

  // Xóa sao cũ (nếu replay)
  container.innerHTML = '';
  if (endingStarInterval) clearInterval(endingStarInterval);

  // Tạo 60 sao bay lên
  function spawnStar() {
    const star = document.createElement('div');
    star.className = 'ending-star-particle';

    // Vị trí ngang ngẫu nhiên
    star.style.left = rand(0, 100) + '%';

    // Kích thước ngẫu nhiên
    const size = rand(2, 5);
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    // Thời gian bay ngẫu nhiên
    const duration = rand(6, 14);
    star.style.animationDuration = duration + 's';

    // Delay ngẫu nhiên
    star.style.animationDelay = rand(0, 3) + 's';

    // Màu ngẫu nhiên (trắng, xanh nhạt)
    const colors = ['#ffffff', '#e0eaff', '#a8c8e8', '#b8d0f0'];
    const color = pick(colors);
    star.style.background = color;
    star.style.boxShadow = `0 0 6px ${color}, 0 0 12px var(--blue-pale), 0 0 20px var(--blue-glow)`;

    container.appendChild(star);

    // Tự xóa sau khi bay xong
    setTimeout(() => star.remove(), (duration + 3) * 1000);
  }

  // Tạo 30 sao ngay lập tức
  for (let i = 0; i < 30; i++) {
    setTimeout(spawnStar, rand(0, 2000));
  }

  // Tạo sao liên tục mỗi 400ms
  endingStarInterval = setInterval(spawnStar, 400);

  // Tạo 15 sao lớn nhấp nháy cố định
  for (let i = 0; i < 15; i++) {
    const bigStar = document.createElement('div');
    bigStar.className = 'ending-star-big';
    bigStar.style.left = rand(5, 95) + '%';
    bigStar.style.top = rand(10, 90) + '%';
    bigStar.style.animationDuration = rand(2, 5) + 's';
    bigStar.style.animationDelay = rand(0, 3) + 's';
    container.appendChild(bigStar);
  }
}

function clearEndingStars() {
  const container = $('#endingStars');
  if (container) container.innerHTML = '';
  if (endingStarInterval) {
    clearInterval(endingStarInterval);
    endingStarInterval = null;
  }
}

// ==================================================
// 13. REPLAY
// ==================================================
function replayAll() {
  clearCountdownTimers();
  clearInterval(state.slideTimer);
  clearEndingStars(); 

  state = {
    currentScreen: 'countdown',
    giftChosen: null,
    cakeDropped: false,
    candleBlown: false,
    currentSlide: 0,
    slideTimer: null,
    envelopeOpened: false,
    micStream: null,
    micAnalyser: null,
    micListening: false,
  };

  $$('.gift-box').forEach(b => b.classList.remove('opening', 'dimmed', 'chosen'));
  $$('.cake-piece').forEach(p => p.classList.remove('dropping', 'landed'));
  const flame = $('#flame'); if (flame) flame.classList.remove('lit', 'out');
  const btnBlow = $('#btnBlow'); if (btnBlow) btnBlow.classList.add('hidden');
  const mic = $('#micHint'); if (mic) mic.classList.add('hidden');
  const btnNext = $('#btnNextLetter'); if (btnNext) btnNext.classList.add('hidden');
  const env = $('#envelope'); if (env) env.classList.remove('open');
  const star = $('#endingStar'); if (star) star.classList.remove('grow');
  const glow = $('#endingGlow'); if (glow) glow.classList.remove('grow');
  $$('.ending-line').forEach(l => l.classList.remove('show'));

  stopAllMusic();
  startCountdown();
}

// ==================================================
// 14. NHẠC
// ==================================================
function playAudio(id, volume = 0.4, loop = true) {
  const audio = $(`#${id}`);
  if (!audio) return;
  audio.volume = volume;
  audio.loop = loop;
  audio.play().catch(err => console.warn(`Không phát được ${id}:`, err.message));
}

function stopAllMusic() {
  ['audioAmbient', 'audioBuild', 'audioEmotional', 'audioVoice'].forEach(id => {
    const a = $(`#${id}`);
    if (a) { a.pause(); a.currentTime = 0; }
  });
}

function startAmbientMusic() { playAudio('audioAmbient', 0.3, true); }
function startBuildMusic() {
  const a = $('#audioAmbient'); if (a) a.pause();
  playAudio('audioBuild', 0.4, true);
}
function startEmotionalMusic() {
  const a = $('#audioBuild'); if (a) a.pause();
  playAudio('audioEmotional', 0.35, true);
}
function playVoiceWish() {
  const voice = $('#audioVoice');
  if (!voice) return;
  setTimeout(() => {
    voice.volume = 0.7;
    voice.play().catch(() => {});
  }, 1500);
}

// ==================================================
// 15. EXPOSE GLOBAL — QUAN TRỌNG
// ==================================================
window.chooseGift = chooseGift;
window.dropCake = dropCake;
window.blowCandle = blowCandle;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToLetter = goToLetter;         // ← Nút "Đi tiếp" gọi hàm này
window.openEnvelope = openEnvelope;
window.goToEnding = goToEnding;
window.replayAll = replayAll;
window.startCountdown = startCountdown;

// ==================================================
// 16. INIT
// ==================================================
window.addEventListener('load', () => {
  console.log('%c🌊 BIRTHDAY FOR BVON', 'color: #5b9bd5; font-size: 18px; font-weight: bold;');
  console.log('%c💙 Chúc mừng sinh nhật!', 'color: #a8c8e8; font-size: 14px;');
  console.log('%c✅ Hàm goToLetter() đã sẵn sàng.', 'color: #7ba8d8; font-size: 12px;');

  const startWhenReady = () => {
    setTimeout(() => startCountdown(), 200);
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(startWhenReady).catch(startWhenReady);
  } else {
    startWhenReady();
  }
});