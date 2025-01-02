import { TestBed } from "@angular/core/testing";
import { TaskApiService } from "./task-api.service";
import { API_BASE_URL } from "../../../app.tokens";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { User } from "../../../auth/domain/entities/user";
import { TaskEndpoints } from "../config/task-endpoints.config";
import { CommonConstants } from "../../../constants/general/app.constants";
import { GeneralResponse } from "../models/general-response.interface";
import { Task } from "../../domain/entities/task";

describe('TaskApiService', () => {

  let taskApiService: TaskApiService;

  let httpMock: HttpTestingController;

  const fakeUrlApi = 'http://fakeapi.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskApiService,
        {provide: API_BASE_URL, useValue: fakeUrlApi}
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    taskApiService = TestBed.inject(TaskApiService);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create an instance', () => {
    expect(taskApiService).toBeTruthy();
  });

  it('should fetch tasks', () => {
    const user:User = {
      id: '1',
      email: 'test@test.com'
    };
    
    const task = {id: '1', title: 'test', description: 'test description', state: 'PENDING', createdDate: new Date()};

    taskApiService.fetchTasks(user).subscribe({
      next: (tasks) => {
        expect(tasks.length).toBe(1);
      }
    });

    const req = httpMock.expectOne(`${fakeUrlApi}${TaskEndpoints.getTasks}${CommonConstants.ID_USER_QUERY_PARAM}${user.id}`);
    expect(req.request.method).toEqual('GET');

    const response:GeneralResponse = {
          status: "200",
          data: {
            message: "Usuario creado exitosamente",
            payload: [task]
          }
        }
    req.flush(response);

  });

  it('should create a task', () => {
    const task: Task = { id: '1', title: 'test', description: 'test description', state: 'PENDING', createdDate: new Date() };

    taskApiService.createTask(task).subscribe({
      next: (createdTask) => {
        expect(createdTask).toEqual(task);
      },
    });

    const req = httpMock.expectOne(`${fakeUrlApi}${TaskEndpoints.createTask}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(task);

    req.flush(task);
  });

  it('should update a task', () => {
    const task: Task = { id: '1', title: 'updated title', description: 'updated description', state: 'COMPLETED', createdDate: new Date() };

    taskApiService.updateTask(task).subscribe({
      next: (updatedTask) => {
        expect(updatedTask).toEqual(task);
      },
    });

    const req = httpMock.expectOne(`${fakeUrlApi}${TaskEndpoints.updateTask}${task.id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(task);

    req.flush(task);
  });

  it('should delete a task', () => {
    const taskId = '1';

    taskApiService.deleteTask(taskId).subscribe({
      next: (result) => {
        expect(result).toBeTrue();
      },
    });

    const req = httpMock.expectOne(`${fakeUrlApi}${TaskEndpoints.deleteTask}${taskId}`);
    expect(req.request.method).toEqual('DELETE');

    const response: GeneralResponse = {
      status: CommonConstants.SUCCESS_RESPONSE,
      data: {
        message: "Task deleted successfully",
        payload: [],
      },
    };
    req.flush(response);
  });

});