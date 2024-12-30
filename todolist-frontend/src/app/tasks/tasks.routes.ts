import { Routes } from '@angular/router';
import { authGuard } from '../auth/application/guards/auth.guard';

export const tasksRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/task-page/task-page.component').then((m) => m.TaskPageComponent),
    canActivate: [authGuard],
  },
];