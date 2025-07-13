import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../products';
import { RouterLink } from '@angular/router';
import { Users } from '../users';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-homepage',
  imports: [CurrencyPipe, FormsModule, NgOptimizedImage, RouterLink, AsyncPipe],
  templateUrl: './homepage.html',
  styleUrl: 'homepage.css',
})
export class Homepage {
  products: Products = inject(Products);
  users = inject(Users);

  isLoggedIn$!: Observable<boolean>;
  authService = inject(Auth);
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  loggedInUser = this.users.loggedInUser;
  productsList = this.products.products;

  //pagination
  currentPage = 1;
  itemsPerPage = 10;

  get totalPages(): number {
    return Math.ceil(this.productsList.length / this.itemsPerPage);
  }

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.productsList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
