import { Component, effect, inject, input, signal } from '@angular/core';
import { Products } from '../products';
import { Product } from '../product.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './ad.html',
  styleUrl: './ad.css',
})
export class Ad {
  adId = input.required<string>();
  private productsService = inject(Products);

  product = signal<Product | undefined>(undefined);

  constructor() {
    effect(() => {
      const id = this.adId();
      if (id) {
        this.productsService.getAdById(id).subscribe({
          next: (productData) => {
            this.product.set(productData);
          },
          error: (err) => {
            console.error('Greška pri učitavanju oglasa:', err);
          },
        });
      }
    });
  }
}
