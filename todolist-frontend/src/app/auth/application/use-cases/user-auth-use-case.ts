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

  getLocalUserAuth(): User | null {
    return this.authGateway.getAuthLocalData();
  }

  setLocalUserAuth(user: User): void {
    this.authGateway.setAuthLocalData(user);
  }

  registerUser(user:User): Observable<User> {
    return this.authGateway.registerUser(user);
  }

}