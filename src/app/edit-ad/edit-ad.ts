import {Component, effect, inject, input, signal} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Products} from '../products';
import {Product} from '../product.model';
import {AdForm} from '../ad-form/ad-form';

@Component({
  selector: 'app-edit-ad',
  standalone: true,
  imports: [CommonModule, AdForm],
  templateUrl: './edit-ad.html',
  styleUrl: './edit-ad.css',
})
export class EditAd {
  adId = input.required<string>();
  private productsService = inject(Products);
  private router = inject(Router);

  product = signal<Product | undefined>(undefined);
  serverError: string | null = null;

  constructor() {
    effect(() => {
      const id = this.adId();
      if (id) {
        this.productsService.getAdById(id).subscribe({
          next: (productData) => this.product.set(productData),
          error: (err) => {
            console.error("Greška pri preuzimanju oglasa", err);
            this.router.navigate(['/not-found']);
          }
        });
      }
    });
  }

  onSubmit(formData: FormData): void {
    this.serverError = null;
    this.productsService.updateAd(this.adId(), formData).subscribe({
      next: (updatedAd) => {
        this.router.navigate(['/artikal', updatedAd._id]);
      },
      error: (err) => {
        this.serverError = err.error?.message || 'Došlo je do greške.';
      }
    });
  }
}
