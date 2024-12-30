import { Observable } from "rxjs";
import { Task } from "../../domain/entities/task";
import { TaskGateway } from "../../domain/interfaces/task-gateway";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GetTasksUseCase {
  constructor(private _taskGateway: TaskGateway) {}

  getAllTasks(email:string): Observable<Task[]> {
    return this._taskGateway.fetchTasks(email)
  }

}