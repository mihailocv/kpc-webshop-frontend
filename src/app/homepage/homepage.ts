import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../products';

@Component({
  selector: 'app-homepage',
  imports: [CurrencyPipe, FormsModule, NgOptimizedImage],
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

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
