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

    const userData = this.authGateway.getAuthLocalData();

    if(!userData?.email)
      return of(false)

    return this.authGateway.checkServerAuthentication(userData?.email).pipe(
      map((response) => response.isAuthenticated),
      catchError(() => of(false))
    )
  }

}