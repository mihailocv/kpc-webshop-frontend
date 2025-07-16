import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Auth} from '../services/auth';
import {PasswordValidator} from '../utils/password-validation';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: 'login.css',
})
export class Login {
  loginForm!: FormGroup;
  serverError: string | null = null;
  passwordInputType: string = 'password';

  PasswordValidator = PasswordValidator;

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  ngOnInit() {
    this.loginForm = this.fb.group({
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
    });
  }

  get usernameControl() {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    this.serverError = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.logIn(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.serverError = error.error?.message || 'Došlo je do neočekivane greške.';
        console.error('Login failed', error);
      },
    });
  }
}
