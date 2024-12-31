import { Inject, Injectable } from "@angular/core";
import { AuthGateway } from "../../domain/interfaces/auth-gateway";
import { HttpClient } from "@angular/common/http";
import { User } from "../../domain/entities/user";
import { map, Observable } from "rxjs";
import { API_BASE_URL } from "../../../app.tokens";
import { AuthEndpoints } from "../config/auth-endpoints.config";
import { CommonConstants } from "../../../constants/general/app.constants";
import { LocalStorageUtil } from "../utils/local-storage.util";
import { ServiceResponse } from "../models/service-response.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends AuthGateway {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string
  ) {
    super();
  }

  override doLogin(credentials: User): Observable<User> {
    return this.http
      .post<ServiceResponse>(`${this.baseUrl}${AuthEndpoints.login}`, credentials)
      .pipe(map((response: ServiceResponse) => this.mapToDomain(response)));
  }

  override isAuthenticatedLocally(): boolean {
    return !!LocalStorageUtil.get<User>(CommonConstants.AUTH_LOCAL_STORAGE_KEY);
  }

  override checkServerAuthentication(email: string): Observable<{ isAuthenticated: boolean }> {
    return this.http.post<{ isAuthenticated: boolean }>(
      `${this.baseUrl}${AuthEndpoints.checkAuthentication}`,
      email
    );
  }

  override setAuthLocalData(user: User): void {
    LocalStorageUtil.save(CommonConstants.AUTH_LOCAL_STORAGE_KEY, user);
  }

  override getAuthLocalData(): User|null {
    return LocalStorageUtil.get<User>(CommonConstants.AUTH_LOCAL_STORAGE_KEY);
  }

  override registerUser(user: User): Observable<User> {
    console.log("registerUser infra", user);
    return this.http
      .post<ServiceResponse>(`${this.baseUrl}${AuthEndpoints.register}`, user)
      .pipe(map((response: ServiceResponse) => this.mapToDomain(response)));
  }

  private mapToDomain(response: ServiceResponse): User {
    return {
      id: response.data.payload.id,
      email: response.data.payload.email,
    };
  }
}