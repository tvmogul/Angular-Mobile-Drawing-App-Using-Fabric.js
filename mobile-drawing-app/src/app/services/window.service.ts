import {Injectable} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Injectable()
export class WindowService {
    // create more Observables as and when needed for various properties
    size$: Observable<Array<any>>;
    orientation$: Observable<any>;
    resizeObservable$: Observable<Event>;
    resizeSubscription$: Subscription;

    constructor() {
        this.resizeObservable$ = fromEvent(window, 'resize');
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
          console.log('event: ', evt);
        });
    }
}



