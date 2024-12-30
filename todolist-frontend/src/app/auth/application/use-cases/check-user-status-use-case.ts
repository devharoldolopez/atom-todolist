import { Injectable } from "@angular/core";
import { AuthGateway } from "../../domain/interfaces/auth-gateway";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CheckUserStatusUseCase {

  constructor(private authGateway: AuthGateway) {}

  isUserLoggedIn(): Observable<boolean> {
    if(this.authGateway.isAuthenticatedLocally()){
      return of(true);
    }

    const email = this.authGateway.getAuthEmail();

    return this.authGateway.checkServerAuthentication(email).pipe(
      map((response) => response.isAuthenticated),
      catchError(() => of(false))
    )
  }

}