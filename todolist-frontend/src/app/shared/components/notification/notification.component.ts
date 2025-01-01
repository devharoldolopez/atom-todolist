import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { NotificationMessage } from '../../interfaces/notification-message.interface';
import { CommonConstants } from '../../../constants/general/app.constants';
import { NotificationType } from '../../enums/notification-types';
import { MatIconModule } from '@angular/material/icon';
import { CustomNotificationComponent } from '../custom-notification/custom-notification.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatSnackBarModule, MatIconModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit{

  notification$ = this.notificationService.notification$;

  constructor(
    private notificationService: NotificationService,
    private notificationBar: MatSnackBar
  ){}

  ngOnInit(): void {

    this.notification$.subscribe((notification:NotificationMessage)=>{
      
      if (notification === CommonConstants.INITIAL_OBJ) {
        return;
      }

      const notificationClass = notification.type == NotificationType.INFO ?
        'success-snackbar' : 'error-snackbar'

      this.notificationBar.openFromComponent(CustomNotificationComponent,{
        data:{
          msg: notification.msg || CommonConstants.EMPTY_STR,
          type: notification.type
        },
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: [notificationClass]
      })
    })
  }
  
}
