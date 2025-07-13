// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from './auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true; // Dozvoli pristup ruti
        } else {
          console.warn(
            'Neregistrovan korisnik pokušao pristupiti privatnoj ruti, preusmeravanje...',
          );
          return this.router.createUrlTree(['/login']); // Preusmeri na login
        }
      }),
    );
  }
}
