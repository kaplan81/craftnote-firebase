import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'crf-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm = this.fb.group({
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
