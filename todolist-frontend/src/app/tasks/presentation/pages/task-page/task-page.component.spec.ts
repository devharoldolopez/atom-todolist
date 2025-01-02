import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPageComponent } from './task-page.component';
import { TasksUseCase } from '../../../application/use-cases/tasks-use-case';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { UserAuthUseCase } from '../../../../auth/application/use-cases/user-auth-use-case';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormLogService } from '../../../../shared/services/form-log.service';
import { AuthGateway } from '../../../../auth/domain/interfaces/auth-gateway';
import { TaskGateway } from '../../../domain/interfaces/task-gateway';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Task } from '../../../domain/entities/task';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthApiService } from '../../../../auth/infrastructure/gateways/auth-api.service';
import { API_BASE_URL } from '../../../../app.tokens';
import { TaskApiService } from '../../../infrastructure/gateways/task-api.service';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;

  let modalService: ModalService<Task>;

  let tasksUseCase: TasksUseCase;
  let taskGateway: TaskGateway;
  let notificationService: NotificationService;

  const fakeUrlApi = 'http://fakeapi.com';

  const taskResponse: Task = {
    id: '1',
    title: 'title',description: 'description',
    state: 'state',
    createdDate: new Date() 
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TaskPageComponent,
        HttpClientTestingModule
      ],
      providers: [
        TasksUseCase,
        UserAuthUseCase,
        ModalService,
        Router,
        LoadingService,
        NotificationService,
        FormLogService,
        { provide: AuthGateway, useClass: AuthApiService },
        { provide: TaskGateway, useClass: TaskApiService },
        {provide: API_BASE_URL, useValue: fakeUrlApi},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    tasksUseCase = TestBed.inject(TasksUseCase);
    taskGateway = TestBed.inject(TaskGateway);
    notificationService = TestBed.inject(NotificationService);
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create task with button and should open modal', () => {
    const button = fixture.debugElement.query(By.css('.task-list__btn--create-task'));
    const modalSpy = spyOn(modalService, 'open');
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should render tasks', () => {
    const spyTaskUseCase = spyOn(tasksUseCase, 'getAllTasks').and.returnValue(
      of([taskResponse])
    );
    component.renderTasks();
    expect(spyTaskUseCase).toHaveBeenCalled();
    component.tasksResponse$?.subscribe({
      next: (tasks) => {
        expect(tasks).toEqual([taskResponse]);
      }
    });

  });

  it('should finish action', () => {
    const spyTaskUseCase = spyOn(tasksUseCase, 'getAllTasks').and.returnValue(
      of([taskResponse])
    );
    const spyNotificationService = spyOn(notificationService, 'info');

    component.finishAction('message');

    expect(spyNotificationService).toHaveBeenCalled();
    expect(spyTaskUseCase).toHaveBeenCalled();

    component.tasksResponse$?.subscribe({
      next: (tasks) => {
        expect(tasks).toEqual([taskResponse]);
      }
    });

  });

});