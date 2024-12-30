import { Injectable } from "@angular/core";
import { AuthGateway } from "../../domain/interfaces/auth-gateway";
import { Observable } from "rxjs";
import { User } from "../../domain/entities/user";


@Injectable({
  providedIn: 'root'
})
export class UserAuthUseCase {

  constructor(private authGateway: AuthGateway) {}

  doLogin(user:User): Observable<User> {
    return this.authGateway.doLogin(user)
  }

  getUserEmailAuth(): string {
    return this.authGateway.getAuthEmail();
  }

  setAuthEmail(email: string): void {
    this.authGateway.setAuthEmail(email);
  }

  getAuthEmail(): string {
    return this.authGateway.getAuthEmail();
  }

  registerUser(user:User): Observable<User> {
    return this.authGateway.registerUser(user);
  }

}