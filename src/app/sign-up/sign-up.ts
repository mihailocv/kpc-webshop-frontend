import { Component } from '@angular/core';
import {
  FormBuilder,
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

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  onSubmit() {
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
        console.error('Sign up failed', error);
        // Handle error appropriately, e.g., show a message to the user
      },
    });
  }
}
