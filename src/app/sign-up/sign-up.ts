import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Auth} from '../services/auth';
import {PasswordValidator} from '../utils/password-validation';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: 'sign-up.css',
})
export class SignUp {
  signupForm!: FormGroup;
  serverError: string | null = null;
  passwordInputType: string = 'password';

  PasswordValidator = PasswordValidator;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^(?!.*\.\.)(?!.*__)(?!.*\._)(?!.*_\.)(?!^\.)(?!^_)(?!.*_.$)(?!.*\.$)[a-z0-9._]+$/),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/\d/),
        Validators.pattern(/[@$!%*?&.,]/),
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/),
      ]],
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

  togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    this.serverError = null;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.authService.signUp(this.signupForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.serverError = error.error?.message || 'Došlo je do neočekivane greške.';
        console.error('Sign up failed', error);
      },
    });
  }
}
