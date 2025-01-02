import { Component, OnInit, signal } from '@angular/core';
import { Task } from '../../../domain/entities/task';
import { finalize, Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { UserAuthUseCase } from '../../../../auth/application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../auth/domain/entities/user';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { TasksUseCase } from '../../../application/use-cases/tasks-use-case';
import { LoadingService } from '../../../../shared/services/loading.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationError } from '../../../../constants/errors/notification-errors.constants';


@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule, MatToolbarModule, MatIconModule, FormatDatePipe, TaskModalComponent, MatCheckboxModule],
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
    private router: Router,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.localUser = this.userAuthUseCase.getLocalUserAuth() || User.getEmptyUser()
    if(this.localUser.id){
      this.renderTasks();
    }
  }

  renderTasks() {
    this.loadingService.show();
    this.tasksResponse$ = this.tasksUseCase.getAllTasks(this.localUser);
    this.tasksResponse$
    .pipe(
      finalize(() => {
        this.loadingService.hide()
      })
    ).subscribe({
      next: (tasks:Task[]) => {
        this.taskListCompleted = tasks.filter(task => task.state === CommonConstants.STATE_COMPLETED)
        this.taskListPending = tasks.filter(task => task.state === CommonConstants.STATE_PENDING)
      },
      error: (error) => {
        console.log("Error al obtener las tareas: ", error);
        this.taskListCompleted = CommonConstants.EMPTY_ARRAY
        this.taskListPending = CommonConstants.EMPTY_ARRAY
      }
    });
  }

  finishAction(message:string){
    this.notificationService.info(message)
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
    this.loadingService.show()
    this.tasksUseCase.deleteTask(taskId)
      .pipe(
        finalize(() => {
          this.loadingService.hide()
        })
      )
      .subscribe({
        next: ()=>{
          this.notificationService.info(CommonConstants.DELETE_TASK_SUCCESSFUL_MSG)
          this.renderTasks()
        },
        error: ()=>{
          this.notificationService.error(NotificationError.GENERAL_ERROR)
        }
      })
  }

  changeTaskStatus(task: Task, isChecked: boolean){

    this.loadingService.show()

    const completedTask:Task = {
      ...task,
      state: isChecked ? CommonConstants.STATE_COMPLETED : CommonConstants.STATE_PENDING
    }
    this.tasksUseCase.updateTask(completedTask)
      .pipe(
        finalize(() => {
          this.loadingService.hide()
        })
      )
      .subscribe({
        next: (task:Task) => {
          console.log("Tarea editada estado: ", task);
          this.notificationService.info(CommonConstants.UPDATE_STATE_TASK_SUCCESSFUL_MSG)
          this.renderTasks();
        }
      })
  }

  goLogin() {
    this.router.navigate(['/auth/login']);
  }

  evaluateStatus(status:string) {
    return CommonConstants.STATE_COMPLETED === status;
  }

  verifyTasks() {
    return this.taskListCompleted?.length === CommonConstants.ZERO && this.taskListPending?.length === CommonConstants.ZERO
  }

  evaluateStateTask(state:string) {
    return CommonConstants.STATE_COMPLETED === state ? CommonConstants.STATE_COMPLETED_MSG : CommonConstants.STATE_PENDING_MSG;
  }

}
