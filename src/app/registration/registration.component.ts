import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import {
  validateLowerCase,
  validateNumbers,
  validateUpperCase
} from '../validators';

@Component({
  selector: 'crf-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm = this.fb.group({
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
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(
        this.registrationForm.value.email,
        this.registrationForm.value.password
      )
      .catch(error => alert(error.message));
  }
}
