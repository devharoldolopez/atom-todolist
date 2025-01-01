import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationMessage } from '../../interfaces/notification-message.interface';
import { CommonModule } from '@angular/common';
import { NotificationType } from '../../enums/notification-types';

@Component({
  selector: 'app-custom-notification',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './custom-notification.component.html',
  styleUrl: './custom-notification.component.scss'
})
export class CustomNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: NotificationMessage){}

  evaluateIcon(type:NotificationType|undefined){
    return type === NotificationType.INFO ?
      'snackbar-success-icon':
      'snackbar-error-icon'
  }
    
}
