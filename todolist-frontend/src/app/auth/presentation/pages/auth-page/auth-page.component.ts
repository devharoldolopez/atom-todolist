import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { UserAuthUseCase } from '../../../application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { RegisterComponent } from "../../components/register/register.component";
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../../components/register/register.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorMessageComponent, RegisterComponent,MatIconModule ],
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
    private registerService: RegisterService,
  ){
    this.userForm = this.createUserForm();
    this.registerService.open()
  }

  private createUserForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit():void {
    if(this.userForm.invalid){
      this.logValidationErrors();
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
            this.registerService.open();
          else
            console.log("Error en el login: ", authError.error.message);
        }
      });

  }

  private logValidationErrors(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const controlErrors = this.userForm.get(key)?.errors;
      if(controlErrors != null){
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
