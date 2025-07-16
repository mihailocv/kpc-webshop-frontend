import { inject, Injectable } from '@angular/core';
import type { Product } from './product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './services/auth';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private authService = inject(Auth);

  private readonly _products = new BehaviorSubject<Product[]>([]);
  readonly products$ = this._products.asObservable();

  constructor() {
    this.loadInitialAds();
  }

  private loadInitialAds(): void {
    this.http.get<Product[]>(`${this.apiUrl}/ads`).pipe(
      catchError(() => of([]))
    ).subscribe(ads => {
      this._products.next(ads);
    });
  }

  getAds(): Observable<Product[]> {
    return this.products$;
  }

  getAdById(adId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/ads/${adId}`);
  }

  createAdWithFile(formData: FormData): Observable<Product> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Product>(`${this.apiUrl}/ads`, formData, { headers }).pipe(
      tap(newAd => {
        const currentAds = this._products.getValue();
        this._products.next([...currentAds, newAd]);
      })
    );
  }

  updateAd(adId: string, formData: FormData): Observable<Product> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch<Product>(`${this.apiUrl}/ads/${adId}`, formData, { headers }).pipe(
      tap(updatedAd => {
        const currentAds = this._products.getValue();
        const updatedAds = currentAds.map(ad => ad._id === updatedAd._id ? updatedAd : ad);
        this._products.next(updatedAds);
      })
    );
  }

  deleteAd(adId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/ads/${adId}`, { headers }).pipe(
      tap(() => {
        const currentAds = this._products.getValue();
        const filteredAds = currentAds.filter(ad => ad._id !== adId);
        this._products.next(filteredAds);
      })
    );
  }
}
