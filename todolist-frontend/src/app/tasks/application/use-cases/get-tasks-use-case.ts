import { Observable } from "rxjs";
import { Task } from "../../domain/entities/task";
import { TaskGateway } from "../../domain/interfaces/task-gateway";
import { Injectable } from "@angular/core";
import { User } from "../../../auth/domain/entities/user";

@Injectable({
  providedIn: 'root'
})
export class GetTasksUseCase {
  constructor(private taskGateway: TaskGateway) {}

  getAllTasks(user:User): Observable<Task[]> {
    return this.taskGateway.fetchTasks(user)
  }

}