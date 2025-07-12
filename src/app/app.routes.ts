import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { NotFound } from './not-found/not-found';
import { NewAd } from './new-ad/new-ad';
import { Ad } from './ad/ad';
import { EditAd } from './edit-ad/edit-ad';

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
  },
  {
    path: 'signup',
    component: SignUp,
  },
  {
    path: 'objavi-oglas',
    component: NewAd,
  },
  {
    path: 'artikal/:adId',
    component: Ad,
  },
  {
    path: 'artikal/uredi/:adId',
    component: EditAd,
  },
  {
    path: '**',
    component: NotFound,
  },
];
