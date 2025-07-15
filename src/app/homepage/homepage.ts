import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../products';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth';
import { Product } from '../product.model';
import { User } from '../users.model'; // Import User model

declare var bootstrap: any;

@Component({
  selector: 'app-homepage',
  // standalone: true, // Ako je komponenta standalone
  imports: [FormsModule, NgOptimizedImage, RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './homepage.html',
  styleUrl: 'homepage.css',
})
export class Homepage implements OnInit {
  productsService: Products = inject(Products);
  authService = inject(Auth);

  isLoggedIn$!: Observable<boolean>;
  currentUser$!: Observable<User | null>; // Koristićemo Observable za trenutnog korisnika

  productsList: Product[] = [];
  adToDeleteId: string | null = null;

  // Paginacija
  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;

    this.productsService.getAds().subscribe({
      next: (adsFromDb) => {
        this.productsService.products = adsFromDb;
        this.productsList = adsFromDb;
      },
      error: (err) => {
        console.error('Greška pri učitavanju oglasa sa servera:', err);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.productsList.length / this.itemsPerPage);
  }

  get paginatedProducts(): Product[] { // Jaka tipizacija
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

  selectAdForDeletion(adId: string): void {
    this.adToDeleteId = adId;
  }

  confirmDelete(): void {
    if (!this.adToDeleteId) return;

    this.productsService.deleteAd(this.adToDeleteId).subscribe({
      next: () => {
        this.productsList = this.productsList.filter(p => p._id !== this.adToDeleteId);
        this.productsService.products = this.productsList;
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
