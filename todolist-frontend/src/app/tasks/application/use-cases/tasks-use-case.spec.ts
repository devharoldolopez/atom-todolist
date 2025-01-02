import { TestBed } from "@angular/core/testing";
import { TasksUseCase } from "./tasks-use-case";
import { TaskApiService } from "../../infrastructure/gateways/task-api.service";
import { TaskGateway } from "../../domain/interfaces/task-gateway";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { User } from "../../../auth/domain/entities/user";
import { of } from "rxjs";
import { Task } from "../../domain/entities/task";

describe('TasksUseCase', () => {

  let tasksUseCase:TasksUseCase
  let taskGateway: TaskGateway;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TasksUseCase,
        {provide: TaskGateway, useClass: TaskApiService}
      ]
    });

    taskGateway = TestBed.inject(TaskGateway);
    tasksUseCase = TestBed.inject(TasksUseCase);
  });

  it('should create an instance', () => {
    expect(tasksUseCase).toBeTruthy();
  });

  it('should get all tasks', () => {
    const user:User = {
      id: '1',
      email: 'test@test.com'
    };

    const taskList = [new Task('id', 'test', 'test description', 'PENDING', new Date())];
    spyOn(taskGateway, 'fetchTasks').and.returnValue(of(taskList));

    const tasksResponse = tasksUseCase.getAllTasks(user);
    tasksResponse.subscribe({
      next: (tasks) => {
        expect(tasks.length).toBe(1);
      }
    });

  });

  it('should create a task', () => {
    const task = new Task('id', 'test', 'test description', 'PENDING', new Date());
    spyOn(taskGateway, 'createTask').and.returnValue(of(task));

    tasksUseCase.createTask(task).subscribe({
      next: (createdTask) => {
        expect(createdTask).toEqual(task);
      },
    });

    expect(taskGateway.createTask).toHaveBeenCalledWith(task);
  });

  it('should update a task', () => {
    const task = new Task('id', 'updated title', 'updated description', 'COMPLETED', new Date());
    spyOn(taskGateway,'updateTask').and.returnValue(of(task));

    tasksUseCase.updateTask(task).subscribe({
      next: (updatedTask) => {
        expect(updatedTask).toEqual(task);
      },
    });

    expect(taskGateway.updateTask).toHaveBeenCalledWith(task);
  });

  it('should delete a task', () => {
    const taskId = 'id';
    spyOn(taskGateway,'deleteTask').and.returnValue(of(true));

    tasksUseCase.deleteTask(taskId).subscribe({
      next: (result) => {
        expect(result).toBeTrue();
      },
    });

    expect(taskGateway.deleteTask).toHaveBeenCalledWith(taskId);
  });


});