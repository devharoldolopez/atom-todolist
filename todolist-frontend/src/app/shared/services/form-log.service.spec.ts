import { TestBed } from "@angular/core/testing";
import { FormLogService } from "./form-log.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

describe('FormLogService', () => {

  let formLogService: FormLogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FormLogService]
    });

    formLogService = TestBed.inject(FormLogService);
  });

  it('should create an instance', () => {
    expect(formLogService).toBeTruthy();
  });

  it('should log validation errors', () => {
    const form:FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    form.patchValue({
      email: 'test-email.com'
    })

    formLogService.logValidationErrors(form);

    expect(form.get('name')?.errors).toBeDefined();
    expect(form.get('email')?.errors).toBeUndefined();
  });

});