import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { FormLogService } from '../../../../shared/services/form-log.service';
import { TasksUseCase } from '../../../application/use-cases/tasks-use-case';
import { filter, finalize, map, Observable } from 'rxjs';
import { Task } from '../../../domain/entities/task';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthUseCase } from '../../../../auth/application/use-cases/user-auth-use-case';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationError } from '../../../../constants/errors/notification-errors.constants';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ErrorMessageComponent } from '../../../../auth/presentation/components/error-message/error-message.component';


@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent implements OnInit{

  @Input() title:string = CommonConstants.EMPTY_STR;
  @Output() finishAction = new EventEmitter<string>();
  taskForm: FormGroup;
  isVisible$ = this.modalService.isVisible$.pipe(map(value=>value.visible));
  currentEditTask: Task;
  isEdited: boolean = CommonConstants.FALSE_VALUE;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService<Task>,
    private formLogService: FormLogService,
    private taskUseCase: TasksUseCase,
    private userAuthUseCase: UserAuthUseCase,
    private notificationService: NotificationService,
    private loadingService : LoadingService
  ){
    this.taskForm = this.createAuthRegisterForm();
    this.currentEditTask = Task.getEmptyTask();
  }

  ngOnInit(): void {
    this.modalService.isVisible$
      .pipe(
        filter(modalData => modalData.visible)
      )
      .subscribe((modalData) => {

        this.currentEditTask = modalData.data || Task.getEmptyTask();

        this.taskForm.reset();

        this.taskForm.patchValue({
          title: modalData.data?.title || CommonConstants.EMPTY_STR,
          description: modalData.data?.description || CommonConstants.EMPTY_STR
        })
      });
  }

  closeModal():void {
    this.modalService.close();
  }

  onSubmit():void {
    
    this.loadingService.show();

    if(this.taskForm.invalid){
      this.formLogService.logValidationErrors(this.taskForm);
      this.loadingService.hide();
      this.notificationService.error(NotificationError.VALIDATION_TASK_ERROR)
      return;
    }

    const handledTask = this.currentEditTask.id ? 
      this.editTask() :
      this.createTask()

    handledTask.pipe(
      finalize(() => {
        this.modalService.close();
        this.loadingService.hide();
        this.currentEditTask = Task.getEmptyTask();
        this.isEdited = CommonConstants.FALSE_VALUE;
        this.loadingService.hide();
      })
    )
    .subscribe({
      next: (task: Task) => {
        console.log("Is editing: ",this.isEdited);
        console.log("Task actualizada: ", task);

        const msgTask = this.isEdited ? 
          CommonConstants.UPDATE_SUCCESSFUL_MSG :
          CommonConstants.INSERT_SUCCESSFUL_MSG;

        this.finishAction.emit(msgTask);
      },
      error: (taskError:HttpErrorResponse) => {
        console.log("Error en el modal task:", taskError);
        this.notificationService.error(NotificationError.GENERAL_ERROR)
      }
    });
  }

  private createAuthRegisterForm(): FormGroup {
    return this.formBuilder.group({
      title: [CommonConstants.EMPTY_STR, [Validators.required]],
      description: [CommonConstants.EMPTY_STR, [Validators.required]]
    });
  }

  private createTask():Observable<Task>{

    const currentUser = this.userAuthUseCase.getLocalUserAuth()

    const newTask:Task = {
      userId: currentUser?.id || CommonConstants.NOT_DEFINED_USER,
      ...this.taskForm.value,
      state: CommonConstants.STATE_PENDING
    }
    return this.taskUseCase.createTask(newTask);
  }

  private editTask():Observable<Task>{
    this.isEdited = CommonConstants.TRUE_VALUE;
    const editedTask: Task = {
      ...this.currentEditTask,
      ...this.taskForm.value,
    }
    return this.taskUseCase.updateTask(editedTask);
  }

}
