import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationService } from '../../services/animation';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  currentPhrase = '';
  private phrases = [
    'Full Stack Developer',
    'Angular Expert',
    'AI Interfaces Builder',
    'Python Developer',
    'Building Production Apps'
  ];
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingInterval: any;

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    setTimeout(() => {
      this.animationService.initParticles();
      this.animationService.initHeroAnimations();
      this.startTypewriter();
    }, 100);
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  private startTypewriter() {
    this.typingInterval = setInterval(() => {
      const currentFullPhrase = this.phrases[this.phraseIndex];

      if (this.isDeleting) {
        this.currentPhrase = currentFullPhrase.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        this.currentPhrase = currentFullPhrase.substring(0, this.charIndex + 1);
        this.charIndex++;
      }

      if (!this.isDeleting && this.charIndex === currentFullPhrase.length) {
        this.isDeleting = true;
        setTimeout(() => {}, 1800);
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      }
    }, this.isDeleting ? 38 : 65);
  }
}
