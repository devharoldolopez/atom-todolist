import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { UserAuthUseCase } from '../../../application/use-cases/user-auth-use-case';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authRegisterForm: FormGroup;
  isVisible$ = this.registerService.isVisible$;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private userAuthUseCase:UserAuthUseCase,
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
    this.registerService.close();
  }

  onSubmit():void {
    if(this.authRegisterForm.invalid){
      this.logValidationErrors();
      return;
    }
    this.userAuthUseCase.registerUser(this.authRegisterForm.value)
      .pipe(
        finalize(() => {
          this.registerService.close();
        })
      )
      .subscribe({
        next: (user) => {
          this.userAuthUseCase.setAuthEmail(user.email);
          this.authRegisterForm.reset();
          this.router.navigate(['/tasks']);
        },
        error: (authError:HttpErrorResponse) => {
          console.log("Error en el login:", authError);
          this.router.navigate(['/auth/login']);
        }
      });
  }

  private logValidationErrors(): void {
    Object.keys(this.authRegisterForm.controls).forEach(key => {
      const controlErrors = this.authRegisterForm.get(key)?.errors;
      if(controlErrors != null){
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

}
