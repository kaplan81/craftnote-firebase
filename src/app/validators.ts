import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validateLowerCase(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regEx = /[a-z]+/;
    const allowed = regEx.test(control.value);

    return allowed ? null : { validateLowerCase: { valid: false } };
  };
}

export function validateUpperCase(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regEx = /[A-Z]+/;
    const allowed = regEx.test(control.value);

    return allowed ? null : { validateLowerCase: { valid: false } };
  };
}

export function validateNumbers(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regEx = /[0-9]+/;
    const allowed = regEx.test(control.value);

    return allowed ? null : { validateLowerCase: { valid: false } };
  };
}
