import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { FormLogService } from '../../../../shared/services/form-log.service';
import { TasksUseCase } from '../../../application/use-cases/tasks-use-case';
import { filter, finalize, map } from 'rxjs';
import { Task } from '../../../domain/entities/task';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit{

  @Input()
  title:string = CommonConstants.EMPTY_STR;
  taskForm: FormGroup;
  isVisible$ = this.modalService.isVisible$.pipe(map(value=>value.visible));
  currentEditTask: Task;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService<Task>,
    private formLogService: FormLogService,
    private taskUseCase: TasksUseCase
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
    if(this.taskForm.invalid){
      this.formLogService.logValidationErrors(this.taskForm);
      return;
    }

    const editedTask: Task = {
      ...this.currentEditTask,
      ...this.taskForm.value,
    }

    console.log("Edited task: ", editedTask);

    this.taskUseCase.updateTask(editedTask)
      .pipe(
        finalize(() => {
          this.modalService.close();
        })
      )
      .subscribe({
        next: (task: Task) => {
          console.log("Task actualizada: ", task);
        },
        error: (taskError:HttpErrorResponse) => {
          console.log("Error en el login:", taskError);
        }
      });

  }

  private createAuthRegisterForm(): FormGroup {
    return this.formBuilder.group({
      title: [CommonConstants.EMPTY_STR, [Validators.required]],
      description: [CommonConstants.EMPTY_STR, [Validators.required]]
    });
  }

}
