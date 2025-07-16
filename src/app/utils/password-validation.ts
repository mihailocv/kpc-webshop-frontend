import { FormControl } from '@angular/forms';

export class PasswordValidator {
  private static readonly passwordRegex = {
    hasLowercase: /[a-z]/,
    hasUppercase: /[A-Z]/,
    hasDigit: /\d/,
    hasSpecialChar: /[@$!%*?&.,]/,
  };

  static isLengthValid(control: FormControl): boolean {
    const password = control.value || '';
    return password.length >= 8 && password.length <= 64;
  }

  static hasLowercase(control: FormControl): boolean {
    return this.passwordRegex.hasLowercase.test(control.value || '');
  }

  static hasUppercase(control: FormControl): boolean {
    return this.passwordRegex.hasUppercase.test(control.value || '');
  }

  static hasDigit(control: FormControl): boolean {
    return this.passwordRegex.hasDigit.test(control.value || '');
  }

  static hasSpecialChar(control: FormControl): boolean {
    return this.passwordRegex.hasSpecialChar.test(control.value || '');
  }
}
