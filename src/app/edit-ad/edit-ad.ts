import { Component, effect, inject, input, signal } from '@angular/core';
import { Products } from '../products';
import type { Product } from '../product.model';

@Component({
  selector: 'app-edit-ad',
  imports: [],
  templateUrl: './edit-ad.html',
  styleUrl: './edit-ad.css',
})
export class EditAd {
  adId = input.required<string>();
  private products = inject(Products);

  product = signal<Product | undefined>(undefined);

  constructor() {
    effect(() => {
      const id = this.adId();
      this.product.set(this.products.getProduct(id));
    });
  }
}
