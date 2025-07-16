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
    title: 'Početna',
  },
  {
    path: 'prijava',
    component: Login,
    canActivate: [GuestGuard],
    title: 'Prijava',
  },
  {
    path: 'registracija',
    component: SignUp,
    canActivate: [GuestGuard],
    title: 'Registracija',
  },
  {
    path: 'objavi-oglas',
    component: NewAd,
    canActivate: [AuthGuard],
    title: 'Novi oglas',
  },
  {
    path: 'artikal/:adId',
    component: Ad,
    title: 'Detalji o artiklu',
  },
  {
    path: 'artikal/uredi/:adId',
    component: EditAd,
    canActivate: [AuthGuard],
    title: 'Uredi artikal',
  },
  {
    path: '**',
    component: NotFound,
    title: 'Nije pronađeno'
  },
];
