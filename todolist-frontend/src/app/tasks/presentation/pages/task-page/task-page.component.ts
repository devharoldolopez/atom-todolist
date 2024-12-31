import { Component, OnInit, signal } from '@angular/core';
import { GetTasksUseCase } from '../../../application/use-cases/get-tasks-use-case';
import { Task } from '../../../domain/entities/task';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { UserAuthUseCase } from '../../../../auth/application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../../../../auth/domain/entities/user';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';


@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule, MatToolbarModule, FormatDatePipe],
  providers: [DatePipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  
  tasksResponse$: Observable<Task[]> | undefined;
  taskList?: Task[] = [];

  readonly panelOpenState = signal(false);

  constructor(
    private getTasksUseCase: GetTasksUseCase,
    private userAuthUseCase:UserAuthUseCase,
    private router: Router) {}

  ngOnInit() {

    const localUser = this.userAuthUseCase.getLocalUserAuth()

    console.log("User email storage: ", localUser);

    if(!localUser){
      return;
    }

    this.renderTasks(localUser);
  }

  renderTasks(localUser: User) {
    this.tasksResponse$ = this.getTasksUseCase.getAllTasks(localUser);
    this.tasksResponse$.subscribe({
      next: (tasks:Task[]) => {
        this.taskList = tasks;
        console.log("Las tareas obtenidas son: ", this.taskList);
      },
      error: (error) => {
        console.log("Error al obtener las tareas: ", error);
      }
    });
  }

  goLogin() {
    console.log("Redirigiendo a login");
    this.router.navigate(['/auth/login']);
  }

}