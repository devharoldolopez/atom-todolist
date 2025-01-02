import { TestBed } from "@angular/core/testing";
import { NotificationService } from "./notification.service";
import { NotificationType } from "../enums/notification-types";

describe('NotificationService', () => {

  let notificationService:NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    notificationService = TestBed.inject(NotificationService);
  });

  it('should create an instance', () => {
    notificationService.info('test');
    expect(notificationService).toBeTruthy();
  });

  it('should receive information notifications', () => {
    const notificationMessage = 'test';
    notificationService.info(notificationMessage);
    notificationService.notification$.subscribe({
      next: (notification) => {
        expect(notification.msg).toBe(notificationMessage);
        expect(notification.type).toBe(NotificationType.INFO);
      }
    })
  });

  it('should receive error notifications', () => {
    const notificationMessage = 'error test';
    notificationService.error(notificationMessage);
    notificationService.notification$.subscribe({
      next: (notificationError) => {
        expect(notificationError.msg).toBe(notificationMessage);
        expect(notificationError.type).toBe(NotificationType.ERROR);
      }
    })
  });
});