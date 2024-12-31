import { Routes } from "@angular/router";
import { authRoutes } from "./auth/auth.routes";
import { tasksRoutes } from "./tasks/tasks.routes";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/tasks",
    pathMatch: "full"
  },
  {
    path: "tasks",
    children: tasksRoutes,
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: '**',
    loadComponent: () => import("./shared/components/not-found/not-found.component").then(m => m.NotFoundComponent)
  },
];
