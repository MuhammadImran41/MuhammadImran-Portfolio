import { Injectable } from '@angular/core';

declare const gsap: any;
declare const ScrollTrigger: any;

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  
  initParticles() {
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    const particles: Particle[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      r: number = 0;
      alpha: number = 0;
      color: string = '';

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '124,58,237' : '6,182,212';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx!.fill();
      }
    }

    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx!.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      requestAnimationFrame(loop);
    };

    loop();
  }

  initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations
    gsap.utils.toArray('.rv').forEach((el: any) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      });
    });

    gsap.utils.toArray('.rl').forEach((el: any) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      });
    });

    gsap.utils.toArray('.rr').forEach((el: any) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      });
    });
  }

  initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('#h-badge', { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .to('#h-head', { opacity: 1, y: 0, duration: 0.9 }, 0.5)
      .to('#h-sub', { opacity: 1, y: 0, duration: 0.7 }, 0.8)
      .to('#h-btns', { opacity: 1, y: 0, duration: 0.6 }, 1.0)
      .to('#h-term', { opacity: 1, x: 0, duration: 0.9 }, 0.6);

    // Profile card animation
    const pc = document.getElementById('profile-card');
    if (pc) {
      setTimeout(() => {
        pc.classList.add('animate');
      }, 600);
    }
  }
}
