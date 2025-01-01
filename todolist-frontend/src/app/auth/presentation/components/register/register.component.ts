import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthUseCase } from '../../../application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs';
import { ModalService } from '../../../../shared/services/modal.service';
import { FormLogService } from '../../../../shared/services/form-log.service';
import { User } from '../../../domain/entities/user';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationError } from '../../../../constants/errors/notification-errors.constants';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UserErrorsConstants } from '../../../../constants/errors/user-errors.constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authRegisterForm: FormGroup;
  isVisible$ = this.modalService.isVisible$.pipe(map(value=>value.visible));

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService<User>,
    private userAuthUseCase: UserAuthUseCase,
    private formLogService: FormLogService,
    private router: Router,
    private notificationService: NotificationService
  ){
    this.authRegisterForm = this.createAuthRegisterForm();
  }

  private createAuthRegisterForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]]
    });
  }

  closeModal():void {
    console.log("Close modal");
    this.modalService.close();
  }

  onSubmit():void {
    if(this.authRegisterForm.invalid){
      this.formLogService.logValidationErrors(this.authRegisterForm);
      this.notificationService.error(NotificationError.FORM_VALIDATION_ERROR)
      return;
    }
    this.userAuthUseCase.registerUser(this.authRegisterForm.value)
      .subscribe({
        next: (user) => {
          console.log("Usuario registrado register cmp: ", user);
          this.userAuthUseCase.setLocalUserAuth(user);
          this.authRegisterForm.reset();
          this.notificationService.info(CommonConstants.REGISTER_SUCCESSFUL_MSG)
          this.modalService.close();
          this.router.navigate(['/tasks']);
        },
        error: (authError:HttpErrorResponse) => {
          console.log("Error en el login:", authError);
          if(authError.error.details &&
            authError.error.details.internalCode == UserErrorsConstants.EMAIL_ALREADY_EXISTS.internalCode
          ){
            this.notificationService.error(UserErrorsConstants.EMAIL_ALREADY_EXISTS.msg)
          }else{
            this.router.navigate(['/auth/login']);
            this.notificationService.error(NotificationError.GENERAL_ERROR)
          }
        }
      });
  }

  

}
