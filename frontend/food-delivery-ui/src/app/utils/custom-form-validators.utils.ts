
import {AbstractControl,ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Creates a validator that checks whether the password and
 * confirm-password fields contain the same value.
 *
 * @returns A passwordMismatch error when the values differ; otherwise null.
 */
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Skip mismatch validation until both fields have values.
    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };
}
