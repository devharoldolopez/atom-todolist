import { Inject, Injectable } from "@angular/core";
import { AuthGateway } from "../../domain/interfaces/auth-gateway";
import { HttpClient } from "@angular/common/http";
import { User } from "../../domain/entities/user";
import { map, Observable } from "rxjs";
import { API_BASE_URL } from "../../../app.tokens";
import { AuthEndpoints } from "../config/auth-endpoints.config";
import { LoginResponse } from "../models/login-response.interface";
import { RegisterResponse } from "../models/register-response.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends AuthGateway {

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string
  ) {super();}
  
  override doLogin(credentials: User): Observable<User>{
    return this.http
      .post<LoginResponse>(`${this.baseUrl}${AuthEndpoints.login}`, credentials)
      .pipe(
        map((response: LoginResponse) => this.mapToDomain(response))
      );
  }

  override isAuthenticatedLocally(): boolean {
    return !!localStorage.getItem('authEmail');
  }

  override checkServerAuthentication(email:string): Observable<{ isAuthenticated: boolean; }> {
    return this.http.post<{ isAuthenticated: boolean; }>(`${this.baseUrl}${AuthEndpoints.checkAuthentication}`, email);
  }

  override setAuthEmail(email: string): void {
    localStorage.setItem('authEmail', email);
  }

  override getAuthEmail(): string {
    return localStorage.getItem('authEmail') || '';
  }

  override registerUser(user: User): Observable<User> {
    console.log("registerUser infra", user);
    return this.http
      .post<RegisterResponse>(`${this.baseUrl}${AuthEndpoints.register}`, user)
      .pipe(
        map((response: RegisterResponse) => this.mapToDomain(response))
      );
  }

  private mapToDomain(response: LoginResponse): User {
    return {
      id: response.data.id,
      email: response.data.email
    }
  }

}