import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feed } from '../shared/interfaces';

@Injectable()
export class DataObservableService {
  public times = 0;
  insertAds: object[];
  headers: Headers;
  options: HttpHeaders;
  items: Array<Feed>;

  public rssFeeds: Array<any>;
  public feeds: any;
  rawfeeds: any;

  _category = 'movies';
  _mcat = ''; // movie category
  _start = 1; // rss_ads.start_index;
  _max = 50;
  _pc = '';   // Postal Code of store placing ads
  _rad = '';  // Radius around Postal Code to retrieve ads based on zip code radius

  // constructors do dependency injection in Angular2
  constructor(private _http: HttpClient) {
      this.headers = new Headers(
        {
            'Content-Type': 'application/json',
            dataType: 'jsonp'
        });
      // this.options = new HttpHeaders({ headers: this.headers });
      this.times = 0;
  }

  getServerPathway() {
    // tslint:disable-next-line:prefer-const
    let siteURL = window.location.origin + window.location.pathname.substring(0, window.location.pathname.indexOf('/Content'));
    // alert(siteURL);
    return siteURL;
  }

  // MVC Save Site Plan putSitePlanImage =  Calls C# Handler DrawingLayout.ashx
  // Called from rasterize() that is called to save site plan image
  putSitePlanImage(objData: any, appid: any, action: any, imageid: any) {
    // let url = document.location.protocol +'//'+ document.location.hostname + ':my_port';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };

    const _host = document.location.protocol + '//' + document.location.hostname + '/' + appid;
    // tslint:disable-next-line:max-line-length
    // TESTING==>http://localhost:4200/#?&appid=SomeApp&action=add&driveid=012626153&siteid=012012435&imageid=2&length=22&width=22&siteName=Central%20United%20Methodist%20Church%20&roomName=Family%20Life%20Center&siteAddress=300%20S.%20Main%20St.,%20,%20Asheboro,%20NC%2027203&rnd=0.41312466867008335
    const url = _host + '/DrawingLayout.ashx?action=save' + action + '&imageid=' + imageid + '&rnd=';
    return this._http.post(url + this.getRandomInt(1, 500), objData, httpOptions);
  }

  // MVC Get Site Plan - Calls C# Handler DrawingLayout.ashx
  getSitePlanJson(_driveid: string, _siteid: string, _appid: string, _imageid: string) {
    // tslint:disable-next-line:prefer-const
    let _host = document.location.protocol + '//' + document.location.hostname + '/' + _appid;
    // tslint:disable-next-line:max-line-length
    // TESTING==>http://localhost:4200/#?&appid=SomeApp&action=add&driveid=012626153&siteid=012012435&imageid=2&length=22&width=22&siteName=Central%20United%20Methodist%20Church%20&roomName=Family%20Life%20Center&siteAddress=300%20S.%20Main%20St.,%20,%20Asheboro,%20NC%2027203&rnd=0.41312466867008335
    // return this._http.request(s_url, { method: 'Get' })
    // .map( (res) => {
    //     const data = res.json();
    //     return data;
    // })
    // .catch(this.handleError);
  }

  // MVC Refreshs MVC Web Page - Calls C# Handler DrawingLayout.ashx
  putBack2app(objData: any, appid: any) {
    // let url = document.location.protocol +'//'+ document.location.hostname + ':my_port';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };
    // var _host = environment.APP_DOMAIN + appid;
    const _host = document.location.protocol + '//' + document.location.hostname + '/' + appid;
    const url: any = _host + '/DrawingLayout.ashx?action=refresh=&rnd=';
    return this._http.post(url + this.getRandomInt(1, 500), objData, httpOptions);
  }

  getConfigLocal() {
      // tslint:disable-next-line:variable-name
      const local_base = './assets/data/config.json?';
      // we add a random vaule to prevent caching - this trick works nicely!
      // tslint:disable-next-line:variable-name
      const local_rnd = 'rnd=' + this.getRandomInt(1, 500);
      // tslint:disable-next-line:variable-name
      const local_url = local_base + local_rnd;

      this._http.get(local_url).subscribe((res: any[]) => {
        console.log(res);
        });
  }

  xmlToJson(xml) {
    // Create the return object
    let obj = {};
    // console.log(xml.nodeType, xml.nodeName );
    if ((xml.attributes) && (xml.nodeType === 1)) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 4) { // cdata section
      obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof(obj[nodeName]) === 'undefined') {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].length) === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          if (typeof(obj[nodeName]) === 'object') {
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
    }
    return obj;
  }

  test() {
      // ttest
  }

  getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      return obj[key];
    });
  }

  getService(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };
    return this._http.get(url, httpOptions);
  }



  cleanHTMLEntities(str) {
      // block creating object more than once
      const rssItem = document.createElement('div');
      if (str && typeof str === 'string') {
          // remove script/html tags
          str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
          rssItem.innerHTML = str;
          // 'textContent' isn't avaiable in IE8
          if (rssItem.textContent === undefined) {
          str = rssItem.innerText;
          rssItem.innerText = '';
          } else {
          str = rssItem.textContent;
          rssItem.textContent = '';
          }
      }
      return str;
  }

  // tslint:disable-next-line:only-arrow-functions
  getDate = function(date, objDate) {
    // Create object whoose properties are feed values
    const day = date.getUTCDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    objDate.year = (year.toString().length === 1 ? '0' : '') + year;
    objDate.month = (month.toString().length === 1 ? '0' : '') + month;
    objDate.day = (day.toString().length === 1 ? '0' : '') + day;
    objDate.hours = (hours.toString().length === 1 ? '0' : '') + hours;
    objDate.minutes = (minutes.toString().length === 1 ? '0' : '') + minutes;
    objDate.seconds = (seconds.toString().length === 1 ? '0' : '') + seconds;
  };

  serialize(obj: any) {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          params.set(key, element);
        }
    }
    return params;
  }


} // end




