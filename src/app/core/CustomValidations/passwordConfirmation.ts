import { AbstractControl } from '@angular/forms';

//AbstractControl represents a form control or form group
export function confirmPasswordValidator(controls: AbstractControl) {
  const password = controls.get('password');
  const rePassword = controls.get('rePassword');

  //If either field is pristine (not touched), return null (no validation error)
  if (password?.pristine || rePassword?.pristine) {
    return null;
  }

  //If both fields have been touched, compare their values 
  //If the values don't match, return an error object {'passwordMismatch': true}
  //If the values match, return null (no validation error)
  return password && rePassword && password.value !== rePassword.value
    ? { passwordMismatch: true }
    : null;
}
