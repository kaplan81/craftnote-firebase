import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  constructor(
    private angularFireAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    this.angularFireAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
