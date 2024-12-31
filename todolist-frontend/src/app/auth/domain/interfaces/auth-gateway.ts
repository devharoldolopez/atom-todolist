import { Observable } from "rxjs";
import { User } from "../entities/user";

export abstract class AuthGateway {
  abstract doLogin(credentials: User): Observable<User>;
  abstract isAuthenticatedLocally(): boolean;
  abstract checkServerAuthentication(email:string): Observable<{ isAuthenticated: boolean }>;
  abstract setAuthLocalData(user: User) : void;
  abstract getAuthLocalData(): User | null;
  abstract registerUser(user: User): Observable<User>;
}