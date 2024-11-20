import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-browser-notification-api',
  imports: [FormsModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule],
  templateUrl: './browser-notification-api.component.html',
  styleUrl: './browser-notification-api.component.scss'
})
export class BrowserNotificationApiComponent {
  isNotificationApiEnable = false;
  notificationApiPermission?: string;

  ngOnInit() {
    this.check();
  }

  check() {
    this.isNotificationApiEnable = 'Notification' in window;
    if (this.isNotificationApiEnable) {
      this.notificationApiPermission = Notification.permission;
    }
  }
  title: string = '';
  options: {
    body?: string,
    icon?: string,
    tag?: string,
    requireInteraction: boolean
  } = {
      body: undefined,
      icon: undefined,
      tag: undefined,
      requireInteraction: false
    };

  notify?: Notification;
  notificationTest() {
    Notification.requestPermission().then((result) => {
      this.check();
      this.notificationClose();
      if (result == 'granted') {
        this.notify = new Notification(this.title, this.options);
        this.notify.onclick = (e) => {
          e.preventDefault(); // prevent the browser from focusing the Notification's tab
          focus();
          this.notificationClose();
        }
      }
    });
  }
  notificationClose() {
    if (this.notify) {
      this.notify?.close();
    }
  }
}
