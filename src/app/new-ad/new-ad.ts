import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../products';
import { AdForm } from '../ad-form/ad-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-ad',
  standalone: true,
  imports: [AdForm, CommonModule],
  templateUrl: './new-ad.html',
  styleUrl: './new-ad.css',
})
export class NewAd {
  private productsService = inject(Products);
  private router = inject(Router);
  serverError: string | null = null;

  onSubmit(formData: FormData): void {
    this.serverError = null;
    this.productsService.createAdWithFile(formData).subscribe({
      next: (newAd) => {
        this.router.navigate(['/artikal', newAd._id]);
      },
      error: (error) => {
        this.serverError = error.error?.message || 'Došlo je do greške na serveru.';
      },
    });
  }
}
