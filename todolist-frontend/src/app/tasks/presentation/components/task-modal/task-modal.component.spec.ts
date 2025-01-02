import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModalComponent } from './task-modal.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { FormLogService } from '../../../../shared/services/form-log.service';
import { TasksUseCase } from '../../../application/use-cases/tasks-use-case';
import { NotificationService } from '../../../../shared/services/notification.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskGateway } from '../../../domain/interfaces/task-gateway';
import { Task } from '../../../domain/entities/task';
import { UserAuthUseCase } from '../../../../auth/application/use-cases/user-auth-use-case';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { TaskApiService } from '../../../infrastructure/gateways/task-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_BASE_URL } from '../../../../app.tokens';
import { TaskEndpoints } from '../../../infrastructure/config/task-endpoints.config';
import { AuthGateway } from '../../../../auth/domain/interfaces/auth-gateway';
import { of } from 'rxjs';
import { NotificationError } from '../../../../constants/errors/notification-errors.constants';


describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  let userAuthUseCase: UserAuthUseCase;
  let taskGateway: TaskGateway;
  let taskUseCase: TasksUseCase;

  let httpMock: HttpTestingController;

  const fakeUrlApi = 'http://fakeapi.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskModalComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        ModalService,
        FormLogService,
        TasksUseCase,
        UserAuthUseCase,
        NotificationService,
        LoadingService,
        AuthGateway,
        {provide: TaskGateway, useClass: TaskApiService},
        {provide: API_BASE_URL, useValue: fakeUrlApi}
      ]
    })
    .compileComponents();
    
    TestBed.inject(API_BASE_URL);
    
    userAuthUseCase = TestBed.inject(UserAuthUseCase);
    taskGateway = TestBed.inject(TaskGateway);
    taskUseCase = TestBed.inject(TasksUseCase);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Send data to create task', () => {

    component.taskForm.patchValue({
      title: 'Test title',
      description: 'Test description'
    });

    const spyLocalUserAuth = spyOn(userAuthUseCase, 'getLocalUserAuth').and.returnValue({
      id: '1',
      email: 'test@test.com'
    });

    const currentDate = new Date();

    const newTaskCreated: Task = {
      id: '1',
      title: 'Test title',
      description: 'Test description',
      state: 'PENDING',
      createdDate: currentDate
    };

    component.onSubmit();

    expect(spyLocalUserAuth).toHaveBeenCalled();

    const req = httpMock.expectOne(`${fakeUrlApi}${TaskEndpoints.createTask}`);
    expect(req.request.method).toBe('POST');

    req.flush(newTaskCreated);
    
    component.finishAction.asObservable().subscribe({
      next: (message) => {
        expect(message).toBe(CommonConstants.INSERT_SUCCESSFUL_MSG);
      }
    });

  });


  it('should send data to update task', () => {
    component.taskForm.patchValue({
      title: 'Updated title',
      description: 'Updated description'
    });

    component.currentEditTask = {
      id: '1',
      title: 'last title',
      description: 'last description',
      state: 'PENDING',
      createdDate: new Date()
    };

    const spyUpdateTask = spyOn(taskUseCase, 'updateTask').and.returnValue(of({
      ...component.currentEditTask,
      ...component.taskForm.value
    }));

    component.onSubmit();

    expect(spyUpdateTask).toHaveBeenCalled();

    component.finishAction.asObservable().subscribe({
      next: (message) => {
        expect(message).toBe(CommonConstants.UPDATE_SUCCESSFUL_MSG);
      }
    });
  });

  it('should log validation errors for invalid form', () => {
    component.taskForm.patchValue({
      title: '',
      description: ''
    });

    const spyLogValidationErrors = spyOn(TestBed.inject(FormLogService), 'logValidationErrors');
    const spyNotificationError = spyOn(TestBed.inject(NotificationService), 'error');
    const spyLoadingServiceHide = spyOn(TestBed.inject(LoadingService), 'hide');

    component.onSubmit();

    expect(spyLogValidationErrors).toHaveBeenCalledWith(component.taskForm);
    expect(spyNotificationError).toHaveBeenCalledWith(NotificationError.VALIDATION_TASK_ERROR);
    expect(spyLoadingServiceHide).toHaveBeenCalled();
  });

});
