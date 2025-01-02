import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNotificationComponent } from './custom-notification.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationType } from '../../enums/notification-types';

describe('CustomNotificationComponent', () => {
  let component: CustomNotificationComponent;
  let fixture: ComponentFixture<CustomNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomNotificationComponent
      ],
      providers: [
        {provide: MAT_SNACK_BAR_DATA, useValue: {type: 'info', msg: 'test'}}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should evaluate icon', () => {
    expect(component.evaluateIcon(NotificationType.INFO)).toBe('snackbar-success-icon');
    expect(component.evaluateIcon(NotificationType.ERROR)).toBe('snackbar-error-icon');
    expect(component.evaluateIcon(undefined)).toBe('snackbar-error-icon');
  });
});
