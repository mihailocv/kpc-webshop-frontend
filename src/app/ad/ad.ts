import { Component, effect, inject, input, signal } from '@angular/core';
import { Products } from '../products';
import { Product } from '../product.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ad',
  standalone: true, // Pretpostavljam da je komponenta standalone
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './ad.html',
  styleUrl: './ad.css',
})
export class Ad {
  adId = input.required<string>();
  private productsService = inject(Products);

  product = signal<Product | undefined>(undefined);

  constructor() {
    // `effect` će se automatski pokrenuti kada se `adId` promeni
    effect(() => {
      const id = this.adId();
      if (id) {
        // Pozivamo servis da preuzme podatke za ovaj specifičan oglas
        this.productsService.getAdById(id).subscribe({
          next: (productData) => {
            this.product.set(productData);
          },
          error: (err) => {
            console.error('Greška pri učitavanju oglasa:', err);
            // Opciono: preusmeriti na 404 stranicu ako oglas ne postoji
          },
        });
      }
    });
  }
}
