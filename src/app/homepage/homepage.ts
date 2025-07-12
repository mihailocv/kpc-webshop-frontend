import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Products } from '../products';

@Component({
  selector: 'app-homepage',
  imports: [CurrencyPipe],
  templateUrl: './homepage.html',
})
export class Homepage {
  products: Products = inject(Products);

  isLoggedIn = this.products.isLoggedIn;
  loggedInUserId = this.products.loggedInUserId;
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

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
