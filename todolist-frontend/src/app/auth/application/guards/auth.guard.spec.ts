import { TestBed } from "@angular/core/testing"
import { authGuard } from "./auth.guard"
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { CheckUserStatusUseCase } from "../use-cases/check-user-status-use-case";

describe('AuthGuard', () => {

  let checkUserStatusUseCase: jasmine.SpyObj<CheckUserStatusUseCase>;
  let router: Router;

  beforeEach(async ()=>{
    const mockCheckUserStatusUseCase = jasmine.createSpyObj('CheckUserStatusUseCase', ['isUserLoggedIn']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: CheckUserStatusUseCase, useValue: mockCheckUserStatusUseCase },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();
    checkUserStatusUseCase = TestBed.inject(CheckUserStatusUseCase) as jasmine.SpyObj<CheckUserStatusUseCase>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  })

  it('should create',()=>{
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', (done) => {
    checkUserStatusUseCase.isUserLoggedIn.and.returnValue(of(true));
  
    TestBed.runInInjectionContext(() => {
      authGuard().subscribe({
        next: (result) => {
          expect(result).toBeTrue();
          expect(router.navigate).not.toHaveBeenCalled();
          done();
        }
      });
    });
  });

})