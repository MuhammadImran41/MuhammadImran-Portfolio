import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  buttonText = 'Send Message';

  onSubmit(event: Event) {
    event.preventDefault();
    this.buttonText = 'Sending...';
    
    setTimeout(() => {
      this.buttonText = 'Sent ✓';
      this.formData = { name: '', email: '', message: '' };
      
      setTimeout(() => {
        this.buttonText = 'Send Message';
      }, 3000);
    }, 1200);
  }
}
