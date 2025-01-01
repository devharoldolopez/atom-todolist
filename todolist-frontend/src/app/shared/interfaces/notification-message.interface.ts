import { NotificationType } from "../enums/notification-types";

export interface NotificationMessage {
  type?: NotificationType,
  msg?: string
}