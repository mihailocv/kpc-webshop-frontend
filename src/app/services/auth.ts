import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../users.model';
import {environment} from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';

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

export interface TokenPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor() {
    this.loadUserOnAuthInit();
  }

  signUp(user: SignUpDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, user).pipe(
      tap(response => this.handleAuthSuccess(response.token))
    );
  }

  logIn(user: LogInDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      tap(response => this.handleAuthSuccess(response.token))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleAuthSuccess(token: string): void {
    localStorage.setItem('token', token);
    this.loadUserFromToken(token);
  }

  private loadUserFromToken(token: string): void {
    try {
      const payload: TokenPayload = jwtDecode(token);
      const isTokenExpired = payload.exp * 1000 < Date.now();

      if (isTokenExpired) {
        this.logout();
        return;
      }

      this.getUserProfile(payload.id).subscribe({
        next: (user) => {
          this._currentUser.next(user);
          this._isLoggedIn.next(true);
        },
        error: () => {
          this.logout();
        }
      });
    } catch (e) {
      console.error('Invalid token', e);
      this.logout();
    }
  }

  private loadUserOnAuthInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadUserFromToken(token);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
    this.router.navigate(['/']);
  }

  private getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
}
