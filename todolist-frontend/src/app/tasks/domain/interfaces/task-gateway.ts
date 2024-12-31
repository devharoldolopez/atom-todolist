import { Observable } from "rxjs";
import { Task } from "../entities/task";
import { User } from "../../../auth/domain/entities/user";

export abstract class TaskGateway {
  abstract fetchTasks(user:User): Observable<Task[]>;
  abstract createTask(task: Task): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(taskId: number): Observable<void>;
}