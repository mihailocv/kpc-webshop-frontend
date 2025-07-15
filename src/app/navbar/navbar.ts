import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Auth} from '../services/auth';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import {User} from '../users.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  currentUser$!: Observable<User | null>;

  authService = inject(Auth);

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
  }
}
