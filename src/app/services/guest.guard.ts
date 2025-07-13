import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from './auth'; // Pretpostavljamo da koristiš isti AuthService
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
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
    // Koristimo map operator da transformišemo Observable iz AuthService-a
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          // Ako je korisnik ulogovan, preusmeri ga na dashboard (ili home)
          console.warn(
            'Ulogovan korisnik pokušao pristupiti javnoj ruti, preusmeravanje...',
          );
          return this.router.createUrlTree(['/']); // Ili '/home'
        } else {
          // Ako korisnik NIJE ulogovan, dozvoli pristup ruti (login/signup)
          return true;
        }
      }),
    );
  }
}
