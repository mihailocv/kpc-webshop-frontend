import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../products';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  products: Products = inject(Products);

  productsList = this.products.products;
  isLoggedIn = this.products.isLoggedIn;
  loggedInUserId = this.products.loggedInUserId;

  loggedInUser(){
    return this.productsList.find(product => product.id === this.loggedInUserId)?.seller || 'Korisnik';
  }
}
