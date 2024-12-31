import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthUseCase } from '../../../application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ModalService } from '../../../../shared/services/modal.service';
import { FormLogService } from '../../../../shared/services/form-log.service';
import { User } from '../../../domain/entities/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authRegisterForm: FormGroup;
  isVisible$ = this.modalService.isVisible$;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService<User>,
    private userAuthUseCase: UserAuthUseCase,
    private formLogService: FormLogService,
    private router: Router
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
    this.modalService.close();
  }

  onSubmit():void {
    if(this.authRegisterForm.invalid){
      this.formLogService.logValidationErrors(this.authRegisterForm);
      return;
    }
    this.userAuthUseCase.registerUser(this.authRegisterForm.value)
      .pipe(
        finalize(() => {
          this.modalService.close();
        })
      )
      .subscribe({
        next: (user) => {

          console.log("Usuario registrado register cmp: ", user);

          this.userAuthUseCase.setLocalUserAuth(user);
          this.authRegisterForm.reset();
          this.router.navigate(['/tasks']);
        },
        error: (authError:HttpErrorResponse) => {
          console.log("Error en el login:", authError);
          this.router.navigate(['/auth/login']);
        }
      });
  }

  

}
