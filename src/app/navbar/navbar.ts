import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Users } from '../users';
import { Auth } from '../services/auth';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
})
export class Navbar {
  users: Users = inject(Users);
  usersList = this.users.users;
  loggedInUser = this.users.loggedInUser;

  isLoggedIn$!: Observable<boolean>;
  authService = inject(Auth);
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  logout() {
    this.authService.logout();
  }

  whoIsLoggedIn() {
    return (
      this.usersList.find((user) => user.username === this.loggedInUser)
        ?.username || 'Korisnik'
    );
  }
}
