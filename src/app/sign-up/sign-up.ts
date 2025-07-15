import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: 'sign-up.css',
})
export class SignUp {
  signupForm!: FormGroup;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {}

  private passwordRegex = {
    hasLowercase: /[a-z]/,
    hasUppercase: /[A-Z]/,
    hasDigit: /\d/,
    hasSpecialChar: /[@$!%*?&.,]/, // Dodaj/ukloni simbole po potrebi
  };
  passwordInputType: string = 'password';

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [
        '',
        [
          Validators.required, // Obavezno polje
          Validators.minLength(3), // Minimalna dužina 1 karakter (Instagram tehnički dozvoljava)
          Validators.maxLength(30), // Maksimalna dužina 30 karaktera
          // Regex za Instagram-like username
          Validators.pattern(
            /^(?!.*\.\.)(?!.*__)(?!.*\._)(?!.*_\.)(?!^\.)(?!^_)(?!.*_.$)(?!.*\.$)[a-z0-9._]+$/,
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required, // Lozinka je obavezna
          Validators.minLength(8), // Minimalna dužina 8 karaktera
          Validators.maxLength(64), // Maksimalna dužina (npr. 64 karaktera)
          // Regex za složenost lozinke
          Validators.pattern(this.passwordRegex.hasLowercase),
          Validators.pattern(this.passwordRegex.hasUppercase),
          Validators.pattern(this.passwordRegex.hasDigit),
          Validators.pattern(this.passwordRegex.hasSpecialChar),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required, // Broj telefona je obavezan
          // Regex za format telefonskih brojeva na Balkanu (ili sličan format)
          Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/),
        ],
      ],
    });
  }

  get usernameControl() {
    return this.signupForm.get('username') as FormControl;
  }

  get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  get phoneNumberControl() {
    return this.signupForm.get('phoneNumber') as FormControl;
  }

  get isPasswordLengthValid(): boolean {
    const password = this.passwordControl.value || ''; // Uvek proveri da li je vrednost null/undefined
    return password.length >= 8 && password.length <= 64;
  }

  get hasPasswordLowercase(): boolean {
    const password = this.passwordControl.value || '';
    return this.passwordRegex.hasLowercase.test(password);
  }

  get hasPasswordUppercase(): boolean {
    const password = this.passwordControl.value || '';
    return this.passwordRegex.hasUppercase.test(password);
  }

  get hasPasswordDigit(): boolean {
    const password = this.passwordControl.value || '';
    return this.passwordRegex.hasDigit.test(password);
  }

  get hasPasswordSpecialChar(): boolean {
    const password = this.passwordControl.value || '';
    return this.passwordRegex.hasSpecialChar.test(password);
  }

  togglePasswordVisibility(): void {
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    this.serverError = null;
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signUp(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Uspešna registracija!', response);
        this.authService.saveToken(response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.serverError =
          error.error?.message ||
          'Došlo je do neočekivane greške. Molimo pokušajte ponovo.';
        console.error('Sign up failed', error);
      },
    });
  }
}
