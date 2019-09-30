import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'crf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: [
      '',
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('[a-z]'),
      Validators.pattern('[A-Z]'),
      Validators.pattern('[0-9]')
    ]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
