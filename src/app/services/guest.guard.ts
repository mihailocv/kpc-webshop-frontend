import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import {Auth} from './auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {
  }

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
          console.warn(
            'Ulogovan korisnik pokušao pristupiti javnoj ruti, preusmeravanje...',
          );
          return this.router.createUrlTree(['/']);
        } else {
          return true;
        }
      }),
    );
  }
}
