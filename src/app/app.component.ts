import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

declare var NotificationEvent: {
  prototype: NotificationEvent;
  new(type: string, eventInitDict?: NotificationEventInit): NotificationEvent;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'GX.loyalty.app';

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
  }

  ngOnInit(): void {
    (self as any).addEventListener('notificationclick', function (event: NotificationEvent) {
      event.notification.close();
      
      const redirectUrl = event.notification.data?.redirectUrl || 'https://default-url.com';
      
      event.waitUntil(
        (self as any).clients.openWindow(redirectUrl)
      );
    });
  }
  

}
