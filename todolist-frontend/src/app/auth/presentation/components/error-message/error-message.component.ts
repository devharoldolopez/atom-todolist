import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl | null = null;

  getErrorMessage(errors: ValidationErrors | null): string {
    if(!errors) return "";

    if(errors['required']) return "El campo es requerido";
    if(errors['email']) return "Email inválido";

    return "Campo inválido";
  }

}
