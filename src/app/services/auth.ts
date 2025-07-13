import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface SignUpDto {
  username: string;
  password: string;
  phoneNumber: string;
}

export interface LogInDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000';

  private http = inject(HttpClient);
  private router = inject(Router);

  signUp(user: SignUpDto) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, user);
  }

  logIn(user: LogInDto) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, user);
  }

  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this._isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
    this.router.navigate(['/']);
  }
}
