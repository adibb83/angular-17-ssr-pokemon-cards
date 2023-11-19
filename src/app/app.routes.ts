import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '', loadComponent: () => HomeComponent
  },
  {
    path: 'home', loadComponent: () => HomeComponent
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../app/modules/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
