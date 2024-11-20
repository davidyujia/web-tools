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
  options: NotificationOptions = {
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

      let options = {} as any;
      Object.keys(this.options).forEach(key => {
        if ((this.options as any)[key] != undefined) {
          options[key] = (this.options as any)[key];
        }
      });
      if (result == 'granted') {
        this.notify = new Notification(this.title, options);
        this.notify.onclick = (e) => {
          e.preventDefault(); // prevent the browser from focusing the Notification's tab
          focus();
          this.notificationClose();
        }
      }
      options.title = this.title;
      console.log(options);
    });
  }
  notificationClose() {
    if (this.notify) {
      this.notify?.close();
    }
  }
}
