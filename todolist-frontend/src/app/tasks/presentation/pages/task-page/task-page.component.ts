import { Component, OnInit, signal } from '@angular/core';
import { Task } from '../../../domain/entities/task';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { UserAuthUseCase } from '../../../../auth/application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../auth/domain/entities/user';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { EditTaskComponent } from '../../components/edit-task/edit-task.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { TasksUseCase } from '../../../application/use-cases/tasks-use-case';


@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule, MatToolbarModule, MatIconModule, FormatDatePipe, EditTaskComponent],
  providers: [DatePipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  
  modalTitle: string = CommonConstants.EMPTY_STR;
  tasksResponse$: Observable<Task[]> | undefined;
  taskList?: Task[] = [];

  readonly panelOpenState = signal(false);

  constructor(
    private tasksUseCase: TasksUseCase,
    private userAuthUseCase:UserAuthUseCase,
    private modalService: ModalService<Task>,
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
    this.tasksResponse$ = this.tasksUseCase.getAllTasks(localUser);
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

  editTask(task: Task) {
    this.modalTitle = CommonConstants.MODAL_EDIT_TITLE;
    this.modalService.open(task);
  }

  goLogin() {
    console.log("Redirigiendo a login");
    this.router.navigate(['/auth/login']);
  }

}
