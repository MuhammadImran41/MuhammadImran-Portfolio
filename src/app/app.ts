import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ServicesComponent } from './components/services/services';
import { SkillsComponent } from './components/skills/skills';
import { ProjectsComponent } from './components/projects/projects';
import { ExperienceComponent } from './components/experience/experience';
import { ContactComponent } from './components/contact/contact';
import { AnimationService } from './services/animation';

declare const initAllAnimations: any;

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Muhammad Imran Portfolio';

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    // Load portfolio script
    const script = document.createElement('script');
    script.src = 'assets/script.js';
    script.async = true;
    document.body.appendChild(script);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animationService.initScrollAnimations();
      
      // Call global animations if available
      if (typeof initAllAnimations !== 'undefined') {
        initAllAnimations();
      }
    }, 500);
  }
}
