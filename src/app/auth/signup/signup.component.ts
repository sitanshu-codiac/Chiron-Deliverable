import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ 'signup.component.css' ]
})

export class SignupModalComponent {

  message = '';

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser('chiron@gmail.com', 'chiron_test');
  }
}
