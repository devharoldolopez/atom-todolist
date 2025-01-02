import { TestBed } from "@angular/core/testing";
import { AuthApiService } from "./auth-api.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { User } from "../../domain/entities/user";
import { API_BASE_URL } from "../../../app.tokens";
import { ServiceResponse } from "../models/service-response.interface";
import { CommonConstants } from "../../../constants/general/app.constants";
import { AuthEndpoints } from "../config/auth-endpoints.config";

describe('AuthApiService', () => {
  let authApiService: AuthApiService;

  let httpMock: HttpTestingController;

  const fakeUrlApi = 'http://fakeapi.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthApiService,
        {provide: API_BASE_URL, useValue: fakeUrlApi}
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    authApiService = TestBed.inject(AuthApiService);
    
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(authApiService).toBeTruthy();
  });

  it('should do login', () => {
    const user:User = {
      id: 'test',
      email: 'test@test.com'
    }

    authApiService.doLogin(user).subscribe({
      next: (result) => {
        expect(result.id).toEqual(user.id);
      }
    });

    const req = httpMock.expectOne(`${fakeUrlApi}${AuthEndpoints.login}`);
    expect(req.request.method).toEqual('POST');
  
    const response:ServiceResponse = {
      status: 200,
      data: {
        message: "Usuario creado exitosamente",
        payload: {...user, username: 'test name'}
      }
    }
    req.flush(response);

  });

  it('should check server authentication', () => {
    const email = 'test@test.com';

    authApiService.checkServerAuthentication(email).subscribe({
      next: (result) => {
        expect(result.isAuthenticated).toBeTrue();
      }
    });

    const req = httpMock.expectOne(`${fakeUrlApi}${AuthEndpoints.checkAuthentication}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(email);

    req.flush({ isAuthenticated: true });
  });

  it('should set user in local storage', () => {
    const user: User = {
      id: 'test',
      email: 'test@test.com'
    };
    authApiService.setAuthLocalData(user);
    expect(localStorage.getItem(CommonConstants.AUTH_LOCAL_STORAGE_KEY))
      .toEqual(JSON.stringify(user));
  });

  it('should get user from local storage', () => {
    const user: User = {
      id: 'test',
      email: 'test@test.com'
    };
    localStorage.setItem(CommonConstants.AUTH_LOCAL_STORAGE_KEY,JSON.stringify(user));
    const result = authApiService.getAuthLocalData();
    expect(result).toEqual(user);
  });

  it('should register user', () => {
    const user: User = {
      id: 'test',
      email: 'test@test.com'
    };

    authApiService.registerUser(user).subscribe({
      next: (result) => {
        console.log("AuthApiService next: ", result);
        expect(result.id).toEqual(user.id);
      }
    });

    const req = httpMock.expectOne(`${fakeUrlApi}${AuthEndpoints.register}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);

    const response: ServiceResponse = {
      status: 201,
      data: {
        message: "Usuario registrado exitosamente",
        payload: {...user, username: 'test name'}
      }
    };
    req.flush(response);
  });

});