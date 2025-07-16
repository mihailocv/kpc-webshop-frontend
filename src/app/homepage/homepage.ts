import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../products';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Auth } from '../services/auth';
import { Product } from '../product.model';
import { User } from '../users.model';

declare var bootstrap: any;

@Component({
  selector: 'app-homepage',
  imports: [FormsModule, NgOptimizedImage, RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './homepage.html',
  styleUrl: 'homepage.css',
})
export class Homepage implements OnInit {
  productsService: Products = inject(Products);
  authService = inject(Auth);

  isLoggedIn$!: Observable<boolean>;
  currentUser$!: Observable<User | null>;

  productsList$: Observable<Product[]> = this.productsService.products$;

  adToDeleteId: string | null = null;

  currentPage = 1;
  itemsPerPage = 10;

  paginatedProducts$!: Observable<Product[]>;
  totalPages$!: Observable<number>;
  pages$!: Observable<number[]>;

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;

    this.setupPaginationObservables();
  }

  private setupPaginationObservables() {
    this.totalPages$ = this.productsList$.pipe(
      map(products => Math.ceil(products.length / this.itemsPerPage))
    );

    this.paginatedProducts$ = this.productsList$.pipe(
      map(products => {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return products.slice(startIndex, startIndex + this.itemsPerPage);
      })
    );

    this.pages$ = this.totalPages$.pipe(
      map(totalPages => Array.from({ length: totalPages }, (_, i) => i + 1))
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.setupPaginationObservables();
  }

  selectAdForDeletion(adId: string): void {
    this.adToDeleteId = adId;
  }

  confirmDelete(): void {
    if (!this.adToDeleteId) return;

    this.productsService.deleteAd(this.adToDeleteId).subscribe({
      next: () => {
        this.adToDeleteId = null;

        const modalElement = document.getElementById('deleteAdModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      },
      error: (err) => {
        console.error('Greška pri brisanju oglasa', err);
        this.adToDeleteId = null;
      }
    });
  }
}
