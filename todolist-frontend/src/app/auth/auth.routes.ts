import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./presentation/pages/auth-page/auth-page.component').then(m => m.AuthPageComponent),
  },
];