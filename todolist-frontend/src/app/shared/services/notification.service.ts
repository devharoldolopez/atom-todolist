import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NotificationType } from "../enums/notification-types";
import { NotificationMessage } from "../interfaces/notification-message.interface";
import { CommonConstants } from "../../constants/general/app.constants";

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new BehaviorSubject<NotificationMessage>(CommonConstants.INITIAL_OBJ);

  notification$ = this.notificationSubject.asObservable();

  info(msg: string): void {
    this.notificationSubject.next({
      type: NotificationType.INFO,
      msg
    });
  }

  error(msg: string): void {
    this.notificationSubject.next({
      type: NotificationType.ERROR,
      msg
    });
  }

}