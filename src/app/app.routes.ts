import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: 'homepage',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Homepage,
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
    path: '**',
    component: NotFound
  }
];
