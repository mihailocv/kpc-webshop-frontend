import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../users.model';

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

// export interface UserPayload {
//   username: string;
//   sub: string; // "Subject", obično ID korisnika
//   // Ovde dodajte i druga polja ako ih vaš token sadrži
// }

export interface TokenPayload {
  id: string; // ID korisnika
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  private router = inject(Router);

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor() {
    this.loadUserOnAuthInit();
  }

  // Metoda za preuzimanje korisničkih podataka sa servera
  private getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  private loadUserOnAuthInit(): void {
    const token = this.getToken();
    if (token) {
      try {
        const payload: TokenPayload = JSON.parse(atob(token.split('.')[1]));

        // Ako je token validan, preuzmi podatke o korisniku
        this.getUserProfile(payload.id).subscribe({
          next: (user) => {
            this._currentUser.next(user);
            this._isLoggedIn.next(true);
          },
          error: (err) => {
            console.error('Greška pri preuzimanju profila korisnika', err);
            this.logout(); // Ako ne možemo dobiti korisnika, odjavi ga
          }
        });
      } catch (e) {
        console.error('Neispravan token, odjavljivanje...', e);
        this.logout();
      }
    }
  }


  signUp(user: SignUpDto) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, user).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    );
  }

  logIn(user: LogInDto) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    // Nakon snimanja, dekodiraj token i obavesti sve delove aplikacije
    this.loadUserOnAuthInit();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    // Resetuj stanja
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
    this.router.navigate(['/']);
  }
}
