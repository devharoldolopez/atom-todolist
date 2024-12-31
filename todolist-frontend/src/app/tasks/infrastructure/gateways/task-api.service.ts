import { Inject, Injectable } from "@angular/core";
import { TaskGateway } from "../../domain/interfaces/task-gateway";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Task } from "../../domain/entities/task";
import { API_BASE_URL } from "../../../app.tokens";
import { TaskEndpoints } from "../config/task-endpoints.config";
import { map, Observable } from "rxjs";
import { CommonConstants } from "../../../constants/general/app.constants";
import { User } from "../../../auth/domain/entities/user";
import { GeneralResponse } from "../models/general-response.interface";


@Injectable({
  providedIn: 'root'
})
export class TaskApiService extends TaskGateway {

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl: string) {super();}

  override fetchTasks(user:User): Observable<Task[]> {
    
    const userId = user.id || CommonConstants.NOT_DEFINED_USER;

    return this.http.get<GeneralResponse>(`${this.baseUrl}${TaskEndpoints.getTasks}${CommonConstants.ID_USER_QUERY_PARAM}${userId}`)
      .pipe(
        map((response: GeneralResponse) => this.mapToTaskDomain(response))
      );
  }

  override createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${this.baseUrl}${TaskEndpoints.createTask}`, task);
  }

  override updateTask(task: Task): Observable<Task>  {
    return this.http.put<Task>(`${this.baseUrl}${TaskEndpoints.updateTask}${task.id}`, task);
  }

  override deleteTask(taskId: string): Observable<boolean> {
    return this.http.delete<GeneralResponse>(`${this.baseUrl}${TaskEndpoints.deleteTask}${taskId}`)
      .pipe(
        map((response: GeneralResponse)=> response.status === CommonConstants.SUCCESS_RESPONSE)
      );
  }

  private mapToTaskDomain(response: GeneralResponse): Task[] {
    return response.data.payload.map((task:Task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      state: task.state,
      createdDate: task.createdDate
    }));
  }


}