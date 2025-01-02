import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { NotificationMessage } from '../../interfaces/notification-message.interface';
import { NotificationType } from '../../enums/notification-types';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  let notificationService: NotificationService;
  let notificationBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent, BrowserAnimationsModule],
      providers: [
        {provide: MAT_SNACK_BAR_DATA, useValue: {type: 'info', msg: 'test'}},
        NotificationService,
      ]
    })
    .compileComponents();

    notificationService = TestBed.inject(NotificationService);
    notificationBar = TestBed.inject(MatSnackBar);

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recieve notifications', () => {
    const notificationMessage = 'test';
    notificationService.info(notificationMessage);
    notificationService.notification$.subscribe({
      next: (notification:NotificationMessage) => {
        expect(notification.msg).toBe(notificationMessage);
        expect(notification.type).toBe(NotificationType.INFO);
      }
    })
  });
});
