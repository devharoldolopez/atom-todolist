import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../../../shared/services/modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormLogService } from '../../../../shared/services/form-log.service';
import { UserAuthUseCase } from '../../../application/use-cases/user-auth-use-case';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../../../../app.tokens';
import { AuthGateway } from '../../../domain/interfaces/auth-gateway';
import { AuthApiService } from '../../../infrastructure/gateways/auth-api.service';
import { of } from 'rxjs';
import { User } from '../../../domain/entities/user';
import { LoadingService } from '../../../../shared/services/loading.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userAuthUseCase: UserAuthUseCase;
  let authGateway: AuthGateway;

  const fakeUrlApi = 'http://fakeapi.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        ModalService,
        FormLogService,
        UserAuthUseCase,
        NotificationService,
        Router,
        LoadingService,
        {provide: AuthGateway, useClass: AuthApiService},
        {provide: API_BASE_URL, useValue: fakeUrlApi}
      ]
    })
    .compileComponents();

    userAuthUseCase = TestBed.inject(UserAuthUseCase);
    authGateway = TestBed.inject(AuthGateway);
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerUser when submit', () => {
    const userAuthUseCaseSpy = spyOn(userAuthUseCase, 'registerUser').and.returnValue(of(User.getEmptyUser()));
    component.authRegisterForm.patchValue({
      email: 'test@test.com',
      username: 'test'
    });
    component.onSubmit();
    expect(userAuthUseCaseSpy).toHaveBeenCalled();
  });

});
