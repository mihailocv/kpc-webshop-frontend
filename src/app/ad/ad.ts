import { Component, effect, inject, input, signal } from '@angular/core';
import { Products } from '../products';
import type { Product } from '../product.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ad',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './ad.html',
  styleUrl: './ad.css',
})
export class Ad {
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
