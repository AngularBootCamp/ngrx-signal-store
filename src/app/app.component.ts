import { Component } from '@angular/core';

import { NotificationManagerComponent } from './notification-manager/notification-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NotificationManagerComponent]
})
export class AppComponent {}
