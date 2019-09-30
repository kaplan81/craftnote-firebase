import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  validateLowerCase,
  validateNumbers,
  validateUpperCase
} from '../validators';

@Component({
  selector: 'crf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        validateLowerCase(),
        validateUpperCase(),
        validateNumbers()
      ])
    ]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
