import { Observable } from "rxjs";
import { User } from "../entities/user";

export abstract class AuthGateway {
  abstract doLogin(credentials: User): Observable<User>;
  abstract isAuthenticatedLocally(): boolean;
  abstract checkServerAuthentication(email:string): Observable<{ isAuthenticated: boolean }>;
  abstract setAuthEmail(email: string): void;
  abstract getAuthEmail(): string;
  abstract registerUser(user: User): Observable<User>;
}