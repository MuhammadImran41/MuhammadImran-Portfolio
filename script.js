gsap.registerPlugin(ScrollTrigger);

// ΓöÇΓöÇ PARTICLES ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - .5) * .3;
    this.vy = (Math.random() - .5) * .3;
    this.r  = Math.random() * 1.5 + .5;
    this.alpha = Math.random() * .5 + .1;
    this.color = Math.random() > .5 ? '124,58,237' : '6,182,212';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${.12 * (1 - dist/120)})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(loop);
}
loop();

// ΓöÇΓöÇ CURSOR PARALLAX ON PARTICLES ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gsap.to('#bg-canvas', { x: (mx - W/2) * -.015, y: (my - H/2) * -.015, duration: 1, ease: 'power2.out' });
});

// ΓöÇΓöÇ NAV SCROLL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('solid', scrollY > 60);
});

// ΓöÇΓöÇ MOBILE MENU ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
document.getElementById('mbtn').onclick  = () => document.getElementById('mmenu').classList.add('open');
document.getElementById('mclose').onclick = () => document.getElementById('mmenu').classList.remove('open');
function cm() { document.getElementById('mmenu').classList.remove('open'); }

// ΓöÇΓöÇ SMOOTH SCROLL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { t.scrollIntoView({ behavior: 'smooth' }); cm(); }
  });
});

// ΓöÇΓöÇ HERO LOAD ANIMATIONS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
window.addEventListener('load', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.to('#h-badge', { opacity:1, y:0, duration:.6 }, .3)
    .to('#h-head',  { opacity:1, y:0, duration:.9 }, .5)
    .to('#h-sub',   { opacity:1, y:0, duration:.7 }, .8)
    .to('#h-btns',  { opacity:1, y:0, duration:.6 }, 1.0)
    .to('#h-term',  { opacity:1, x:0, duration:.9 }, .6);

  gsap.to('.tl', { opacity:1, y:0, duration:.4, stagger:.12, ease:'power2.out', delay:1.1 });

  // Counter animation
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.getAttribute('data-target');
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: target, duration: 2, delay: 1.2, ease: 'power2.out', snap: { innerText: 1 },
      onUpdate() { el.innerText = Math.ceil(+el.innerText) + '+'; }
    });
  });
});

// ΓöÇΓöÇ SCROLL REVEALS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
gsap.utils.toArray('.rv').forEach(el => {
  gsap.to(el, { opacity:1, y:0, duration:.9, ease:'power3.out',
    scrollTrigger: { trigger: el, start:'top 87%', toggleActions:'play none none none' }
  });
});
gsap.utils.toArray('.rl').forEach(el => {
  gsap.to(el, { opacity:1, x:0, duration:.9, ease:'power3.out',
    scrollTrigger: { trigger: el, start:'top 87%', toggleActions:'play none none none' }
  });
});
gsap.utils.toArray('.rr').forEach(el => {
  gsap.to(el, { opacity:1, x:0, duration:.9, ease:'power3.out',
    scrollTrigger: { trigger: el, start:'top 87%', toggleActions:'play none none none' }
  });
});

// ΓöÇΓöÇ SKILL BARS + SCROLL ANIMATIONS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Simple intersection observer ΓÇö no GSAP opacity issues
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';

      // Stagger chips inside this card
      entry.target.querySelectorAll('.chip').forEach((chip, i) => {
        chip.style.opacity = '0';
        chip.style.transform = 'translateY(12px) scale(0.85)';
        chip.style.transition = `opacity 0.4s ease ${0.2 + i*0.07}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.2 + i*0.07}s`;
        setTimeout(() => {
          chip.style.opacity = '1';
          chip.style.transform = 'translateY(0) scale(1)';
        }, (0.2 + i * 0.07) * 1000);
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.sk-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px) scale(0.96)';
  card.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`;
  skillObs.observe(card);
});

// Full stack card slide in
const fsCard = document.querySelector('#skillbars > .gcard');
if (fsCard) {
  fsCard.style.opacity = '0';
  fsCard.style.transform = 'translateX(-50px)';
  fsCard.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)';

  const fsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateX(0)';

        // Stagger full stack chips
        e.target.querySelectorAll('.chip').forEach((chip, i) => {
          chip.style.opacity = '0';
          chip.style.transform = 'scale(0.7)';
          chip.style.transition = `opacity 0.35s ease ${0.3 + i*0.06}s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i*0.06}s`;
          setTimeout(() => {
            chip.style.opacity = '1';
            chip.style.transform = 'scale(1)';
          }, (0.3 + i * 0.06) * 1000);
        });

        fsObs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  fsObs.observe(fsCard);
}

// Hover lift
document.querySelectorAll('.sk-card, #skillbars .gcard').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-6px)';
    card.style.transition = 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    card.style.boxShadow = '0 20px 60px rgba(124,58,237,0.18)';
    card.style.borderColor = 'rgba(124,58,237,0.5)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '';
    card.style.borderColor = '';
  });
});

// ΓöÇΓöÇ TIMELINE LINE ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
ScrollTrigger.create({
  trigger: '#timeline', start: 'top 70%', once: true,
  onEnter() { gsap.to('#tlline', { scaleY:1, duration:1.8, ease:'power2.out' }); }
});

// ΓöÇΓöÇ 3D TILT ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = (e.clientX - r.left - r.width/2)  / (r.width/2);
    const y  = (e.clientY - r.top  - r.height/2) / (r.height/2);
    gsap.to(card, { rotateY: x*8, rotateX: -y*8, duration:.3, ease:'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY:0, rotateX:0, duration:.6, ease:'elastic.out(1,.4)' });
  });
});

// ΓöÇΓöÇ MAGNETIC BUTTONS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - r.left - r.width/2)  * .25,
      y: (e.clientY - r.top  - r.height/2) * .25,
      duration:.3, ease:'power2.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x:0, y:0, duration:.6, ease:'elastic.out(1,.4)' });
  });
});

// ΓöÇΓöÇ TYPEWRITER ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const phrases = ['building AI systems.','shipping real products.','from Lahore, Pakistan.','always learning.','open to work.'];
let pi=0, ci=0, del=false;
const tw = document.getElementById('tw');
function type() {
  const p = phrases[pi];
  tw.textContent = del ? p.slice(0, --ci) : p.slice(0, ++ci);
  if (!del && ci === p.length) { del=true; setTimeout(type,1800); return; }
  if (del && ci === 0) { del=false; pi=(pi+1)%phrases.length; }
  setTimeout(type, del ? 38 : 65);
}
setTimeout(type, 1400);

// ΓöÇΓöÇ CONTACT FORM ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function sendMsg(e) {
  e.preventDefault();
  const b = document.getElementById('sbtn');
  b.textContent = 'Sending...';
  setTimeout(() => { b.textContent = 'Sent Γ£ô'; e.target.reset(); setTimeout(()=>b.textContent='Send Message',3000); }, 1200);
}

// ΓöÇΓöÇ STATS COUNT UP ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
ScrollTrigger.create({
  trigger: '#stats', start: 'top 80%', once: true,
  onEnter() {
    document.querySelectorAll('.anim-num').forEach((el, i) => {
      const val = +el.getAttribute('data-val');
      const sfx = el.getAttribute('data-suffix') || '';
      setTimeout(() => {
        gsap.fromTo({v:0},{v:val},{
          v: val, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].v) + sfx; }
        });
      }, i * 100);
    });
  }
});

// ΓöÇΓöÇ ABOUT CARD 3D TILT ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const aboutCard = document.getElementById('about-card');
if (aboutCard) {
  aboutCard.addEventListener('mousemove', e => {
    const r = aboutCard.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2)  / (r.width/2);
    const y = (e.clientY - r.top  - r.height/2) / (r.height/2);
    gsap.to(aboutCard, {
      rotateY: x * 6, rotateX: -y * 6,
      duration: .3, ease: 'power2.out',
      transformPerspective: 900
    });
    // Move glow with mouse
    gsap.to('#about-card .gb-inner', {
      backgroundImage: `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(124,58,237,.08), transparent 60%)`,
      duration: .3
    });
  });
  aboutCard.addEventListener('mouseleave', () => {
    gsap.to(aboutCard, { rotateY:0, rotateX:0, duration:.7, ease:'elastic.out(1,.4)' });
  });
}

// Stat number count-up on scroll
ScrollTrigger.create({
  trigger: '#about-card', start: 'top 80%', once: true,
  onEnter() {
    const vals = [{ el: null, end: 4, sfx: '+' }, { el: null, end: 20, sfx: '+' }, { el: null, end: 3, sfx: '' }];
    document.querySelectorAll('.stat-num-text').forEach((el, i) => {
      vals[i].el = el;
      gsap.fromTo({ v: 0 }, { v: vals[i].end }, {
        v: vals[i].end, duration: 1.8, ease: 'power2.out',
        delay: i * 0.15,
        onUpdate() { el.textContent = Math.round(this.targets()[0].v) + vals[i].sfx; }
      });
    });
  }
});
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#'+current ? '#fff' : '#555577';
  });
});

// ΓöÇΓöÇ PROCESS STEPS ΓÇö looping animation ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function runProcessAnim() {
  const line = document.getElementById('process-line');
  const steps = document.querySelectorAll('.process-step');
  const circles = document.querySelectorAll('.proc-circle');
  if (!line || !steps.length) return;

  // Reset
  line.style.transition = 'none';
  line.style.width = '0';
  steps.forEach(s => {
    s.style.transition = 'none';
    s.style.opacity = '0';
    s.style.transform = 'translateY(30px)';
  });

  // Small delay then animate
  setTimeout(() => {
    // Line draws
    line.style.transition = 'width 1.2s ease';
    line.style.width = '100%';

    // Steps stagger in
    steps.forEach((step, i) => {
      setTimeout(() => {
        step.style.transition = 'opacity .6s ease, transform .7s cubic-bezier(0.22,1,0.36,1)';
        step.style.opacity = '1';
        step.style.transform = 'translateY(0)';

        const circle = step.querySelector('.proc-circle');
        if (circle) {
          circle.style.boxShadow = '0 0 28px rgba(124,58,237,.55)';
          setTimeout(() => { circle.style.boxShadow = ''; }, 700);
        }
      }, 200 + i * 280);
    });

    // After all done, wait then restart
    setTimeout(runProcessAnim, 200 + 4 * 280 + 2200);
  }, 80);
}

ScrollTrigger.create({
  trigger: '#process-steps',
  start: 'top 80%',
  once: true,
  onEnter() { runProcessAnim(); }
});
