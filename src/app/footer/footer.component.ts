import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  emailAddress: string = '';

  subscribeNewsletter() {
    if (this.emailAddress && this.emailAddress.includes('@')) {
      console.log('Subscribing email:', this.emailAddress);
      alert('Thank you for subscribing to our newsletter!');
      this.emailAddress = '';
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
