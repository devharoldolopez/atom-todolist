import { Component, OnInit, signal } from '@angular/core';
import { Task } from '../../../domain/entities/task';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { UserAuthUseCase } from '../../../../auth/application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../../auth/domain/entities/user';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { TasksUseCase } from '../../../application/use-cases/tasks-use-case';


@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule, MatToolbarModule, MatIconModule, FormatDatePipe, TaskModalComponent, MatCheckboxModule, MatSnackBarModule],
  providers: [DatePipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  
  modalTitle: string = CommonConstants.EMPTY_STR;
  tasksResponse$: Observable<Task[]> | undefined;
  localUser: User = User.getEmptyUser();
  taskListCompleted?: Task[] = [];
  taskListPending?: Task[] = [];
  

  readonly panelOpenState = signal(false);

  constructor(
    private tasksUseCase: TasksUseCase,
    private userAuthUseCase:UserAuthUseCase,
    private modalService: ModalService<Task>,
    private notificationBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {
    this.localUser = this.userAuthUseCase.getLocalUserAuth() || User.getEmptyUser()
    if(this.localUser.id){
      this.renderTasks();
    }
  }

  renderTasks() {
    this.tasksResponse$ = this.tasksUseCase.getAllTasks(this.localUser);
    this.tasksResponse$.subscribe({
      next: (tasks:Task[]) => {
        this.taskListCompleted = tasks.filter(task => task.state === CommonConstants.STATE_COMPLETED)
        this.taskListPending = tasks.filter(task => task.state === CommonConstants.STATE_PENDING)
        console.log("Las tareas son: ", tasks);
  
      },
      error: (error) => {
        console.log("Error al obtener las tareas: ", error);
      }
    });
  }

  finishAction(message:string){
    this.notificationBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });

    this.renderTasks();
  }

  createTask() {
    this.modalTitle = CommonConstants.MODAL_CREATE_TASK_TITLE
    this.modalService.open(CommonConstants.EMPTY_TASK)
  }

  editTask(task: Task) {
    this.modalTitle = CommonConstants.MODAL_EDIT_TASK_TITLE;
    this.modalService.open(task);
  }

  deleteTask(taskId: string) {
    this.tasksUseCase.deleteTask(taskId).subscribe(()=>{
      console.log("Tarea eliminada con éxito");
      this.renderTasks()
    })
  }

  changeTaskStatus(task: Task, isChecked: boolean){
    console.log(`Checkbox con ID ${task.id} cambió a: ${isChecked}`);

    const completedTask:Task = {
      ...task,
      state: isChecked ? CommonConstants.STATE_COMPLETED : CommonConstants.STATE_PENDING
    }
    this.tasksUseCase.updateTask(completedTask).subscribe((task:Task) => {
      console.log("Tarea editada estado: ", task);
      this.renderTasks();
    })
  }

  goLogin() {
    console.log("Redirigiendo a login");
    this.router.navigate(['/auth/login']);
  }

  evaluateStatus(status:string) {
    return CommonConstants.STATE_COMPLETED === status;
  }

}
