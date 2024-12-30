import { Inject, Injectable } from "@angular/core";
import { TaskGateway } from "../../domain/interfaces/task-gateway";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Task } from "../../domain/entities/task";
import { API_BASE_URL } from "../../../app.tokens";
import { TaskEndpoints } from "../config/task-endpoints.config";
import { map, Observable } from "rxjs";
import { TaskListResponse } from "../models/task-list-response.interface";


@Injectable({
  providedIn: 'root'
})
export class TaskApiService extends TaskGateway {

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl: string) {super();}

  override fetchTasks(email:string): Observable<Task[]> {
    
    const params = new HttpParams().set('email', email);

    return this.http.get<TaskListResponse>(`${this.baseUrl}${TaskEndpoints.getTasks}`,{params}).pipe(
      map((response: TaskListResponse) => this.mapToTaskDomain(response))
    );
  }

  override createTask(task: Task) {
    return this.http.post<Task>(`${this.baseUrl}${TaskEndpoints.createTask}`, task);
  }

  override updateTask(task: Task) {
    return this.http.put<Task>(`${this.baseUrl}${TaskEndpoints.updateTask}`, task);
  }

  override deleteTask(taskId: number) {
    return this.http.delete<void>(`${this.baseUrl}${TaskEndpoints.deleteTask}/${taskId}`);
  }

  private mapToTaskDomain(response: TaskListResponse): Task[] {
    return response.data.map((task:Task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      state: task.state,
      createdDate: task.createdDate,
    }));
  }


}