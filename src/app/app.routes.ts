import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { NotFound } from './not-found/not-found';
import { NewAd } from './new-ad/new-ad';
import { Ad } from './ad/ad';
import { EditAd } from './edit-ad/edit-ad';
import { AuthGuard } from './services/auth.guard';
import { GuestGuard } from './services/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
  },
  {
    path: 'homepage',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [GuestGuard], // Assuming GuestGuard is implemented to protect this route
  },
  {
    path: 'signup',
    component: SignUp,
    canActivate: [GuestGuard],
  },
  {
    path: 'objavi-oglas',
    component: NewAd,
    canActivate: [AuthGuard], // Assuming AuthGuard is implemented to protect this route
  },
  {
    path: 'artikal/:adId',
    component: Ad,
  },
  {
    path: 'artikal/uredi/:adId',
    component: EditAd,
    canActivate: [AuthGuard], // Assuming AuthGuard is implemented to protect this route
  },
  {
    path: '**',
    component: NotFound,
  },
];
