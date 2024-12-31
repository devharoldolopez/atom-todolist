import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { UserAuthUseCase } from '../../../application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { RegisterComponent } from "../../components/register/register.component";
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../../../../shared/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { UserErrorsConstants } from '../../../../constants/errors/user-errors.constants';
import { User } from '../../../domain/entities/user';
import { CommonConstants } from '../../../../constants/general/app.constants';
import { FormLogService } from '../../../../shared/services/form-log.service';


@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorMessageComponent, RegisterComponent, MatIconModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  userForm: FormGroup;
  showRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userAuthUseCase:UserAuthUseCase,
    private router: Router,
    private modalService: ModalService<User>,
    private formLogService: FormLogService,
  ){
    this.userForm = this.createUserForm();
  }

  private createUserForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit():void {
    if(this.userForm.invalid){
      this.formLogService.logValidationErrors(this.userForm);
      return;
    }

    console.log("Enviando login");

    const credentials = this.userForm.value;
    this.userAuthUseCase.doLogin(credentials)
      .subscribe({
        next: (user) => {
          this.userAuthUseCase.setLocalUserAuth(user);
          this.router.navigate(['/tasks']);
        },
        error: (authError:HttpErrorResponse) => {
          console.log("Error en el login:", authError.error);
          if(authError.error.details.internalCode === UserErrorsConstants.USER_NOT_FOUND_EMAIL.internalCode)
            this.modalService.open(CommonConstants.EMPTY_OBJ);
          else
            console.log("Error en el login: ", authError.error.message);
        }
      });

  }

}
