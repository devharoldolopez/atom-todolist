import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CheckUserStatusUseCase } from "./check-user-status-use-case";
import { AuthGateway } from "../../domain/interfaces/auth-gateway";
import { AuthApiService } from "../../infrastructure/gateways/auth-api.service";
import { API_BASE_URL } from "../../../app.tokens";

describe('CheckUserStatusUseCase', () => {
  let checkUserStatusUseCase: CheckUserStatusUseCase;
  let authGateway: AuthGateway;

  const fakeUrlApi = 'http://fakeapi.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CheckUserStatusUseCase,
        { provide: AuthGateway, useClass: AuthApiService },
        {provide: API_BASE_URL, useValue: fakeUrlApi},
      ]
    });

    authGateway = TestBed.inject(AuthGateway);
    checkUserStatusUseCase = TestBed.inject(CheckUserStatusUseCase);

  });

  it('should create', () => {
    expect(checkUserStatusUseCase).toBeTruthy();
  });

  it('should return true if user is logged in', async () => {
    const spyAuthGateway = spyOn(authGateway, 'isAuthenticatedLocally').and.returnValue(true);
    
    const isUserLoggedIn = checkUserStatusUseCase.isUserLoggedIn();

    expect(spyAuthGateway).toHaveBeenCalled();
    isUserLoggedIn.subscribe({
      next: (result) => {
        expect(result).toBeTrue();
      }
    });
    
  });


});