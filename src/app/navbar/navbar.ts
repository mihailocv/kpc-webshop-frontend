import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../products';
import { Users } from '../users';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  products: Products = inject(Products);
  users: Users = inject(Users);

  usersList = this.users.users;

  isLoggedIn = this.products.isLoggedIn;
  loggedInUser = this.users.loggedInUser;

  whoIsLoggedIn() {
    return (
      this.usersList.find((user) => user.username === this.loggedInUser)
        ?.username || 'Korisnik'
    );
  }
}
