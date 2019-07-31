import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import {Component, Injectable, OnInit, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

@Injectable()
export class GetPageService {
    private retryCount = 3;
    constructor(httpClient: HttpClient, private _http: HttpClient) {
    }

    getPage(url: any) {
    return this._http.get(url).subscribe(result => {
        return result;
        }, error => console.error(error));
    }
}
