import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class FormLogService {

  logValidationErrors(form:FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if(controlErrors != null){
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

}