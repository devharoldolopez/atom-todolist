import { map, Observable, tap } from "rxjs";
import { CheckUserStatusUseCase } from "../use-cases/check-user-status-use-case";
import { inject } from "@angular/core";
import { Router } from "@angular/router";


export const authGuard = (): Observable<boolean> => {
  const checkUserStatusUseCase = inject(CheckUserStatusUseCase);
  const router = inject(Router);

  return checkUserStatusUseCase.isUserLoggedIn().pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/auth/login']);
      }
    }),
    map((isLoggedIn) => isLoggedIn)
  );
};