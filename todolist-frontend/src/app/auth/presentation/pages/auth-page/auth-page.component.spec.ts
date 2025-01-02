import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAuthUseCase } from '../../../application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { ModalService } from '../../../../shared/services/modal.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthApiService } from '../../../infrastructure/gateways/auth-api.service';
import { AuthGateway } from '../../../domain/interfaces/auth-gateway';
import { API_BASE_URL } from '../../../../app.tokens';
import { of } from 'rxjs';
import { User } from '../../../domain/entities/user';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  let userAuthUseCase: UserAuthUseCase;

  const fakeUrlApi = 'http://fakeapi.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthPageComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        UserAuthUseCase,
        Router,
        ModalService,
        LoadingService,
        NotificationService,
        {provide: AuthGateway, useClass: AuthApiService},
        {provide: API_BASE_URL, useValue: fakeUrlApi}
      ]
    })
    .compileComponents();
    
    userAuthUseCase = TestBed.inject(UserAuthUseCase);


    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call doLogin when submit', () => {
    const user:User = {
      id: '1',
      email: 'test@test.com'
    }
    const userAuthUseCaseSpy = spyOn(userAuthUseCase, 'doLogin').and.returnValue(of(user));
    component.userForm.patchValue({
      email: 'test@test.com'
    });
    component.onSubmit();
    expect(userAuthUseCaseSpy).toHaveBeenCalled();
  });
  
});
