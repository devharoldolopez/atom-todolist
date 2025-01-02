import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { ValidationErrors } from '@angular/forms';
import { CommonConstants } from '../../../../constants/general/app.constants';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get error message', () => {
    const validationErrors:ValidationErrors = new Error(CommonConstants.INVALID_FIELD);
    const errorMessage = component.getErrorMessage(validationErrors);
    expect(errorMessage).toEqual(CommonConstants.INVALID_FIELD);
  });
});
