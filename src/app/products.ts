import { inject, Injectable } from '@angular/core';
import type { Product } from './product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './services/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  private authService = inject(Auth);

  // Niz će sada biti popunjen podacima sa servera
  products: Product[] = [];

  // Metoda za preuzimanje svih oglasa sa servera
  getAds(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/ads`);
  }

  getAdById(adId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/ads/${adId}`);
  }

  createAdWithFile(formData: FormData): Observable<Product> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Product>(`${this.apiUrl}/ads`, formData, { headers });
  }

  deleteAd(adId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/ads/${adId}`, { headers });
  }

  updateAd(adId: string, formData: FormData): Observable<Product> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // Koristimo PATCH jer obično šaljemo samo izmenjena polja
    return this.http.patch<Product>(`${this.apiUrl}/ads/${adId}`, formData, { headers });
  }
}
