import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: 'login.css',
})
export class Login {
  loginForm!: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.logIn(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Uspešna ulogovanje!', response);
        this.authService.saveToken(response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Sign up failed', error);
        // Handle error appropriately, e.g., show a message to the user
      },
    });
  }
}
