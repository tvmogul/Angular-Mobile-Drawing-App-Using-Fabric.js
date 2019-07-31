import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  sendMessage(message: string) {
    this.subject.next({ text: message });
}

clearMessage() {
    this.subject.next();
}

getMessage(): Observable<any> {
    return this.subject.asObservable();
}

  // constructor() { }
    // The angular router events has different classes,
    // and what gets passed to the subscription from the
    // router.events observable can either be NavigationEnd,
    // NavigationCancel, NavigationError, or NavigationStart.
    // The one that will actually trigger a routing update will
    // be NavigationEnd. I would stay away from using instanceof
    // or event.constructor.name because after minification class
    // names will get mangled it will not work correctly.
    // You can use the router's isActive function instead, here:
    // https://angular.io/docs/ts/latest/api/router/index/Router-class.html
    // this.routerEventSubscription = this.router.events.subscribe((event: any) => {
    //   if (this.router.isActive(event.url, false)) {
    //       // true if the url route is active
    //       if (event instanceof NavigationStart) {
    //           if (this.keepAfterNavigationChange) {
    //               // only keep for a single location change
    //               this.keepAfterNavigationChange = false;
    //           } else {
    //               // clear alert
    //               this.subject.next();
    //           }
    //       }
    //   }
    // });



  // <div *ngIf="message" [ngClass]="{ 'alert': message,
  // 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }">{{message.text}}</div>

//   success(message: string, keepAfterNavigationChange = false) {
//       this.keepAfterNavigationChange = keepAfterNavigationChange;
//       this.subject.next({ type: 'success', text: message });
//   }

//   error(message: string, keepAfterNavigationChange = false) {
//       this.keepAfterNavigationChange = keepAfterNavigationChange;
//       this.subject.next({ type: 'error', text: message });
//   }



}


