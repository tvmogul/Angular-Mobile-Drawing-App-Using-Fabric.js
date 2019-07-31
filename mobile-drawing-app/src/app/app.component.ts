import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { Config } from './services/config.service';
import { DataObservableService } from './services/data-observable.service';
import { Router } from '@angular/router';
import { WindowService } from './services/window.service';
import { MessageService } from './services/message.service';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { Meta } from '@angular/platform-browser';
import { DialogComponent } from './shared/dialog/dialog.component';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component.css'],
  providers: [WindowService, DataObservableService],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sliderScale', null) sliderScale: IonRangeSliderComponent;

  public theme = 'android-holo';
  // theme = 'android-holo-light';
  public mode = 'scroller';
  public display = 'modal';
  public lang = 'en';
  public sub2: any; // -> Subscriber
  public categories: any;
  public message: any;

  minScale = 1;
  maxScale = 10;
  // sliderScale = {name: "sliderScale", onUpdate: undefined, onFinish: undefined};

  // minAngle: number = 0;
  // maxAngle: number = 360;
  // sliderAngle = {name: "sliderAngle", onUpdate: undefined, onFinish: undefined};

  insertAds: object[];


  // tslint:disable-next-line:variable-name
  myvideo_page = 'list';
  public _page: any;
  public sub: any; // -> Subscriber
  routerEventSubscription: any;
  elementRef: ElementRef;
  slideValue: number;
  curPage = 'siteplan';
  title = 'Eureka!';

  // tslint:disable-next-line:variable-name
  public show_siteplan = true;

  someValue: any;


  arr = Array; // Array type captured in a variable
  num = 20;
  public _rangeZoom = 1;

  public driveid: any = '';
  public _driveid: any = '';
  public siteid: any = '';
  public _siteid: any = '';
  public appid: any = '';
  public _appid: any = '';
  public imageid: any = '';
  public _imageid: any = '';
  public action: any = '';
  public _action: any = '';
  public length: any = '';
  public _length: any = '';
  public width: any = '';
  public _width: any = '';
  public latitude: any = '';
  public _latitude: any = '';
  public longitude: any = '';
  public _longitude: any = '';
  public address: any = '';
  public _address: any = '';
  public siteURL: any = '';
  public _siteURL: any = '';

  public siteName: any = '';
  public _siteName: any = '';
  public roomName: any = '';
  public _roomName: any = '';
  public siteAddress: any = '';
  public _siteAddress: any = '';
  resizeSubscription$: any;

  zfonts = [
    'Arial,Arial,Helvetica,sans-serif',
    'Arial Black,Arial Black,Gadget,sans-serif',
    'Comic Sans MS,Comic Sans MS,cursive',
    'Courier New,Courier New,Courier,monospace',
    'Georgia,Georgia,serif',
    'Impact,Charcoal,sans-serif',
    'Lucida Console,Monaco,monospace',
    'Lucida Sans Unicode,Lucida Grande,sans-serif',
    'Palatino Linotype,Book Antiqua,Palatino,serif',
    'Tahoma,Geneva,sans-serif',
    'Times New Roman,Times,serif',
    'Trebuchet MS,Helvetica,sans-serif',
    'Verdana,Geneva,sans-serif'
    ];

  constructor(private router: Router,
              private localStorage: LocalStorageService,
              private messageService: MessageService,
              private meta: Meta) {

    this.meta.addTag({ name: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' });
    this.meta.addTag({ name: 'Pragma', content: 'no-cache' }, true);
    this.meta.addTag({ name: 'Expires', content: '-1' });

    // this.meta.addTag({ name: 'description', content: 'How to use Angular 4 meta service' });
    // this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
    // this.meta.addTag({ name: 'author', content: 'Other Author' }, true);
    // const author = this.meta.getTags('name=author');
    // console.log(author[0]); //<meta name="author" content="talkingdotnet">
    // console.log(author[1]); //<meta name="author" content="Other Author">

    // this.meta.updateTag({ name: 'description', content: 'Angular 4 meta service' });
    // this.meta.removeTag('name="author"');

    // this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
    // const author = this.meta.getTag('name=author');
    // this.meta.removeTagElement(author);

    // const author = this.meta.getTag('name=Cache-Control');
    // alert(author.content);

    // const author = this.meta.getTags('name=author');
    // console.log(author[0]); //<meta name="author" content="talkingdotnet">
    // console.log(author[1]); //<meta name="author" content="Other Author">

    // override the route reuse strategy
    // this.router.routeReuseStrategy.shouldReuseRoute = function(){
    //   return false;
    // }

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //      // trick the Router into believing it's last link wasn't previously loaded
    //      this.router.navigated = false;
    //      // if you need to scroll back to top, here is the right place
    //      window.scrollTo(0, 0);
    //   }
    // });

    // Shim for proper handling SVG g element in Angular
    if (!('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
      const descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList');
      Object.defineProperty(SVGElement.prototype, 'classList', descr);
    }

    // window['angularComponentRef'] = {
    //   zone: _ngZone,
    //   componentFn: (value) => this.callFromOutside(value),
    //   component: this
    // };

    // subscribe to the window resize event
    // windowService.size$.subscribe((value: any) => {
    //   // alert('APP - windowService:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
    //   this.updateCanvasLayout();
    // });

    $(window).on('orientationchange', () => {
      // alert('APP - orientationchange:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      // this.updateCanvasLayout();
    });

    $(window).on('panelopen', () => {
      // $("div#panel_controls").css('width', '25%');
      $('.ui-panel-dismiss').css('width', '100%');
    });

    $(window).on('panelbeforeopen', () => {
      // $("div#panel_controls").css('width', '25%');
      $('.ui-panel-dismiss').css('width', '100%');
    });

    if (!localStorage.get('feeds_swipeclouds')) {
      localStorage.set('feeds_swipeclouds', {
        category: 'movies',
        mcat: '',
        start: 0,
        max: 50,
        pc: '33157',
        rad: ''
      });
    }

    // window.savedarray= inputArray


    // if (Config.DATA_SOURCE === 'remotejsonp') {
    //   this.feedsObservableService
    //     .setInstallDataJsonp('');
    // }

    // if (LocalStorage.isAvailable()) {
    //   if (!LocalStorage.get('myvideo_page')) {
    //       LocalStorage.set('myvideo_page', {
    //         'page': 'list'
    //       });
    //   }
    // }

    if (localStorage.isAvailable()) {

      this.localStorage.set('settings_ads', {
        adid: 0
      });

      // this.LocalStorage.get($('#movie_category_select').mobiscroll('getValue'));
      this.localStorage.set('movie_category_select', {
        movie_category: 'All'
      });

      localStorage.set('feeds_swipeclouds', {
        category: 'movies',
        mcat: 'All',
        start: 0,
        max: 50,
        pc: '33157',
        rad: ''
      });

      this.localStorage.set('settings_swipeclouds', {
        app_name: 'DTV01', // SC01 DTV01 WW01 BMTV01 MLS01 CF01 PTV01 NB01 RC01
        themeid: 'light',  // 'ios7light'
        bgimage: 0,
        cloudid: 0,        // this._cloudid
        shape: 'sphere',   // this._shape
        zoom: 1.0,         // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
        maxSpeed: .04,     // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
        drag: 'on'         // this._drag
      });
      this.localStorage.set('selected_video_swipeclouds', {
        linkType: '',
        linkValue: ''
      });
      this.localStorage.set('page_swipeclouds', {
        page: 'swipeclouds'
      });
      this.localStorage.set('orientation_swipeclouds', {
        orientation: 'portrait'
      });
      this.localStorage.set('browser_page_swipeclouds', {
        browserpage: 'about:blank'
      });
    }
    // jQuery('form#ppMerchant').bind('reload', function (event) {
    // });



  }

  getParameterByName2(name: any) {
    const url = window.location.href;
    name = name.replace(/[[]]/g, '\$&');
    // tslint:disable-next-line:one-variable-per-declaration
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace('/+/g', ' '));
  }

  scalePanelToContent() {
    $('#panel_controls').css('width', '100%');
    // $("#panel_controls").css({
    //   "with": 7000,
    //   "top": headerH,
    //   "bottom": footerH,
    //   "min-height": panelH
    // });
  }

    // ngOnInit is called directly after constructor and before ngOnChange
    // is triggered for the first time. Perfect place for initialisation.
    ngOnInit() {
      this.init();

      // $('#test').css('display', 'block');
      // $('[data-role=panel]').panel({
      //   theme: 'a',
      //   display: 'overlay',
      //   position: 'right',
      //   width: '15%',
      //   positionFixed: true,
      // }).enhanceWithin();

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
      // ERROR Error: Uncaught (in promise): TypeError: Cannot read property 'startsWith' of undefined
      this.routerEventSubscription = this.router.events.subscribe((event: any) => {
        // this.show_siteplan = false;
        // if (this.router.isActive('/siteplan', false)) {
        //   this.show_siteplan = true;
        // }

      this.appid = this.getParameterByName('appid', event.url);
      this.action = this.getParameterByName('action', event.url);
      this.driveid = this.getParameterByName('driveid', event.url);
      this.siteid = this.getParameterByName('siteid', event.url);
      this.imageid = this.getParameterByName('imageid', event.url);
      this.length = this.getParameterByName('length', event.url);
      this.width = this.getParameterByName('width', event.url);
      this.siteName = this.getParameterByName('siteName', event.url);
      this.roomName = this.getParameterByName('roomName', event.url);
      this.siteAddress = this.getParameterByName('siteAddress', event.url);

      if ((this.appid !== 'undefined') && (this.appid.length > 0)) {
        this._appid = this.appid;
      }
      if ((this.action !== 'undefined') && (this.action.length > 0)) {
        this._action = this.action;
      }
      if ((this.driveid !== 'undefined') && (this.driveid.length > 0)) {
        this._driveid = this.driveid;
      }
      if ((this.siteid !== 'undefined') && (this.siteid.length > 0)) {
        this._siteid = this.siteid;
      }
      if ((this.imageid !== 'undefined') && (this.imageid.length > 0)) {
        this._imageid = this.imageid;
      }
      if ((this.length !== 'undefined') && (this.length.length > 0)) {
        this._length = this.length;
      }
      if ((this.width !== 'undefined') && (this.width.length > 0)) {
        this._width = this.width;
      }
      if ((this.siteName !== 'undefined') && (this.siteName.length > 0)) {
        this._siteName = this.siteName;
      }
      if ((this.roomName !== 'undefined') && (this.roomName.length > 0)) {
        this._roomName = this.roomName;
      }
      if ((this.siteAddress !== 'undefined') && (this.siteAddress.length > 0)) {
        this._siteAddress = this.siteAddress;
      }

      // if((this._appid !== 'undefined') && (this._appid.length > 0)
      //    && (this._action !== 'undefined') && (this._action.length > 0)
      //    && (this._siteid !== 'undefined') && (this._siteid.length > 0)) {
      //     let z = this._appid + "|" + this._action + "|" + this._driveid + "|"
      // + this._siteid + "|" + this._imageid + "|" + this._length + "|" + this._width;
      //     this.messageService.sendMessage("sitedata_" + z);
      // }

      // this._appid = decodeURI(this._appid);
      // this._action = decodeURI(this._action);
      // this._driveid = decodeURI(this._driveid);
      // this._siteid = decodeURI(this._siteid);
      // this._imageid = decodeURI(this._imageid);
      // this._length = decodeURI(this._length);
      // this._width = decodeURI(this._width);
      // this._siteName = decodeURI(this._siteName);
      // this._roomName = decodeURI(this._roomName);
      // this._siteAddress = decodeURI(this._siteAddress);

      const z = this.appid + '|' + this.action + '|' + this.driveid + '|' + this.siteid +
       '|' + this.imageid + '|' + this.length + '|' + this.width + '|' + this.siteName + '|' + this.roomName + '|' + this.siteAddress;

      this.messageService.sendMessage('sitedata_' + z);

      // //MVC Get Site Variables
      // this.driveid = this.getParameterByName('driveid', event.url);
      // //this._driveid = this.driveid.replace("^\"|\"$", "");
      // if ((typeof this.driveid !== 'undefined') && (this.driveid.length > 0)) {
      //   this._driveid = this.driveid;
      // }

      // this.siteid = this.getParameterByName('siteid', event.url);
      // //this._siteid = this.siteid.replace("^\"|\"$", "");
      // if ((typeof this.siteid !== 'undefined') && (this.siteid.length > 0)) {
      //   this._siteid = this.siteid;
      // }

      // this.length = this.getParameterByName('length', event.url);
      // //this._length = this.length.replace("^\"|\"$", "");
      // if ((typeof this.length !== 'undefined') && (this.length.length > 0)) {
      //   this._length = this.length;
      // }

      // this.width = this.getParameterByName('width', event.url);
      // //this._width = this.length.replace("^\"|\"$", "");
      // if ((typeof this.width !== 'undefined') && (this.width.length > 0)) {
      //   this._width = this.width;
      // }

      // this.siteURL = this.getParameterByName('siteURL', event.url);
      // if ((typeof this.siteURL !== 'undefined') && (this.siteURL.length > 0)) {
      //   this._siteURL = this.siteURL;
      // }

      // this.appid = this.getParameterByName('appid', event.url);
      // //this._appid = this.appid.replace("^\"|\"$", "");
      // if ((typeof this.appid !== 'undefined') && (this.appid.length > 0)) {
      //   this._appid = this.appid;
      // }

      // this.imageid = this.getParameterByName('imageid', event.url);
      // if ((typeof this.imageid !== 'undefined') && (this.imageid.length > 0)) {
      //   this._imageid = this.imageid;
      // }

      // this.action = this.getParameterByName('action', event.url);
      // if ((typeof this.action !== 'undefined') && (this.action.length > 0)) {
      //   this._action = this.action;
      // }

      // //623394 ||0|0||SomeApp|1|edit
      // let z = this._driveid + "|" + this._siteid + "|" + this._length + "|" +
      // this._width + "|" + this._siteURL + "|" + this._appid + "|" + this._imageid + "|" + this._action;

      // alert(z);
      // this.messageService.sendMessage("sitedata_" + z);

    });

      // let value1 = getParameterByName2('value1');
      // let value2 = getParameterByName2('value2') || ''; // not mandatory
      // // do something with value1 & value 2

      $('#sliderScale').css('display', 'none');
      $('#sliderAngle').css('display', 'none');

      // tslint:disable-next-line:only-arrow-functions
      $('#panel_controls').on('panelopen', function() {
        // alert("hi all");
        $('#sliderScale').css('display', 'block');
        $('#sliderAngle').css('display', 'block');
       });

      // tslint:disable-next-line:only-arrow-functions
      $('#panel_controls').on('panelclose', function() {
        // alert("byebye");
        $('#sliderScale').css('display', 'none');
        $('#sliderAngle').css('display', 'none');
       });

      // document.getElementById("scroller").scrollIntoView(true);

      // $(".ui-panel-inner").addClass("yscroll");

      // $('#text2add').trigger('keyup');
      // document.getElementById("text2add").style.cursor = "default";

    //   $("#sliderScale").ionRangeSlider({
    //     hide_min_max: true,
    //     keyboard: true,
    //     min: 1,
    //     max: 10,
    //     to: 1,
    //     type: 'single',
    //     step: 1,
    // });
      // document.getElementById("zoomslider").addEventListener("click", this.changeZoom);

      // "image": "p_electrical_outlet.png",
      // "title": "(EO) Electrical Outlet",
      // "scale": "0.3"

      this.categories = this.generateArray( Config.ITEM_DATA );

      // $.each(Config.ITEM_DATA, function (i, item) {
      //     //alert("title: " + item.title + " - image: " + item.image);
      //     if (zimg == item.image) {
      //         zscale = parseFloat(item.scale);
      //     }
      // });

      this.localStorage.set('feeds_swipeclouds', {
        category: 'tvads',
        mcat: '',
        start: 0,
        max: 50,
        pc: '33157',
        rad: ''
      });

      // if (Config.DATA_SOURCE === 'remotejsonp') {
      //   this.feedsObservableService
      //   .getServiceFeedsJsonp('')
      //   .subscribe(
      //     (res) => {
      //       this.insertAds = res;  // insertAds: Object[];
      //       this.LocalStorage.set('insert_ads', res);
      //     },
      //     (err) => { console.log('error!', err); },
      //   );
      // }

      // if (Config.DATA_SOURCE === 'localjson') {
      //   this.feedsObservableService
      //   .getJsonLocal()
      //   .subscribe(
      //     (res) => {
      //       this.insertAds = res;  // feeds: Object[];
      //     },
      //     (err) => { console.log('error!', err); },
      //   );
      // }

      // calledFromOutside() {
      //   this._ngZone.run(() => {
      //     this.runThisFunctionFromOutside();
      //   });
      // }

      let _path = './assets/styles/themes/light.css';
      const s = this.localStorage.get('settings_swipeclouds');
      if (s) {
        _path = './assets/styles/themes/' + s.themeid + '.css';
      } else {
        s.themeid = 'light';
        this.localStorage.set('settings_swipeclouds', s);
      }
      $('#link_swipeclouds').attr('href', _path);

      // this.updateCanvasLayout();
    }

    getUrlParameter(sParam) {
      return decodeURIComponent(window.location.search.substring(1)).split('&')
        .map((v) => {
          return v.split('=');
        })
        .filter((v) => (v[0] === sParam) ? true : false)
        .reduce((acc: any, curr: any) => curr[1], undefined);
    }

    getParameterByName(name, url) {
      if (name !== '' && name !== null && name !== undefined) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        // tslint:disable-next-line:one-variable-per-declaration
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(url);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      } else {
          const arr = location.href.split('/');
          return arr[arr.length - 1];
      }
    }

    finishScale(event: { from: string; preventDefault: () => void; }) {
      // for (let x in event) {
      //   alert(x + " - " + event[x]);
      // }
      // let el = event.target.value;
      // let slider_value = $("#sliderScale").slider().val();
      this.messageService.sendMessage('scale_' + event.from);
      event.preventDefault();
    }
    finishAngle(event: { from: string; preventDefault: () => void; }) {
      this.messageService.sendMessage('angle_' + event.from);
      event.preventDefault();
    }

    saveCanvas(event) {
      this.messageService.sendMessage('save' + event.from);
      event.preventDefault();
    }

    loadCanvas(event) {
      this.messageService.sendMessage('loadCanvas_' + event.from);
      event.preventDefault();
    }

    clicked(event) {
      event.preventDefault();
    }

    onResize() {
      // this.updateCanvasLayout();
      // this.scalePanelToContent();
      $('#panel_controls').css('width', '25%');
    }

    updateCanvasLayout() {
      // if (window.innerHeight > window.innerWidth) {
      //     $('header').removeClass('ui-header-landscape').addClass('ui-header-portrait');
      //     $('footer').removeClass('hideit').addClass('showit');
      // }
      // if (window.innerHeight < window.innerWidth) {
      //     // We will REMOVE the header & Footer if the page is in laandscape position
      //     $('header').removeClass('ui-header-portrait').addClass('ui-header-landscape');
      //     $('footer').removeClass('showit').addClass('hideit');
      // }
      $('.ui-header').trigger('updatelayout');
      $('.ui-footer').trigger('updatelayout');
    }

    // (click)="changeTheme($event, 'ios7light')"
    changeTheme(event, themeRef: string) {
      event.preventDefault();
      // $(".ui-grid-a").css({ "cursor": "pointer" });
      // 'app_name': 'DTV01', // SC01 DTV01 WW01 BMTV01 MLS01 CF01 PTV01 NB01 RC01
      // 'themeid': 'ios7light',
      // 'bgimage': 0,
      // 'cloudid': 0,   // this._cloudid
      // 'shape': 'sphere',  // this._shape
      // 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
      // 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
      // 'drag': 'on'  // this._drag

      const s = this.localStorage.get('settings_swipeclouds');
      if (s) {
          s.themeid = themeRef;
          this.localStorage.set('settings_swipeclouds', s);
      }
      const _path = './assets/styles/themes/' + themeRef + '.css';
      $('#link_swipeclouds').attr('href', _path);

    }

    panelClick(event, categoryRef: string) {
      // alert("Eureka!");
      this.messageService.sendMessage(categoryRef);
      event.preventDefault();
    }

    panelSiteInfo(event) {
      // let s = "addtext_" + $("#addtext").val();
      const s = 'addsiteinfo_';
      this.messageService.sendMessage(s);
      event.preventDefault();
    }

    panelText(event) {
      // let s = "addtext_" + $("#addtext").val();
      const s = 'addtext_enter text';
      this.messageService.sendMessage(s);
      event.preventDefault();
    }

    getLayout(event) {
      // let s = "addtext_" + $("#addtext").val();
      const s = 'addtext_enter text';
      this.messageService.sendMessage('loadCanvas_');
      event.preventDefault();
    }

    saveLayout(event) {
      // $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('saveCanvas_');
      event.preventDefault();
    }

    closePanel(event) {
      event.preventDefault();
      $('[data-role=panel]').panel('close');
    }

    // Check the availability of the Google Maps app on the device
    // To display a map of Central Park in New York:
    // if ([[UIApplication sharedApplication] canOpenURL:
    //   [NSURL URLWithString:@"comgooglemaps://"]]) {
    //   [[UIApplication sharedApplication] openURL:
    //   [NSURL URLWithString:@"comgooglemaps://?center=40.765819,-73.975866&zoom=14&views=traffic"]];
    // } else {
    //   NSLog(@"Can't use comgooglemaps://");
    // }

    // [[UIApplication sharedApplication] openURL:
    // [NSURL URLWithString:@"https://www.google.com/maps/@42.585444,13.007813,6z"]];
    // comgooglemaps://?parameters
    // OR
    // comgooglemaps-x-callback://?parameters

    // <a href="comgooglemaps://?center=40.765819,-73.975866&zoom=14&views=traffic">Testing Maps</a>
    ZGoogleMapsApp() {
      event.preventDefault();
      $('[data-role=panel]').panel('close');

      // var ref = window.open(url, target, options);
      // ref: reference to the InAppBrowser window ([InAppBrowser](inappbrowser.html))
      // url: the URL to load (String). Call encodeURI() on this if you have Unicode characters in your URL.
      // target: the target to load the URL in (String) (Optional, Default: "_self")
      // window.open(mapUrl, '_system');
      // _self - opens in the Cordova WebView if url is in the white-list, else it opens in the InAppBrowser
      // _blank - always open in the InAppBrowser
      // _system - always open in the system web browser
    }

    changeZoom() {
      // event.preventDefault();
      // $("[data-role=panel]").panel("close");
      // _rangeZoom
    }

    // $("#zoomslider").on('slidestop', function (event) {
    //   var slider_value = $("#zoomslider").slider().val();
    //   activeFigure = canvas.getActiveObject();
    //   if (!_.isUndefined(activeFigure) && !_.isNull(activeFigure)) {
    //       activeFigure.scale(parseFloat(slider_value)).setCoords();
    //       canvas.renderAll();
    //     }
    // });

    // $("#speedSlider").on('slidestop', function (event) {
    //     var angle_value = $("#speedSlider").slider().val();
    //     activeFigure = canvas.getActiveObject();
    //     if (!_.isUndefined(activeFigure) && !_.isNull(activeFigure)) {
    //         activeFigure.set('angle', parseInt(angle_value, 10)).setCoords();
    //         //canvas.requestRenderAll();
    //         canvas.renderAll();
    //     }
    // });

    changeDrag(event, dragRef: string) {
      event.preventDefault();
      $('[data-role=panel]').panel('close');
      // 'app_name': 'DTV01', // SC01 DTV01 WW01 BMTV01 MLS01 CF01 PTV01 NB01 RC01
      // 'themeid': 'ios7light',
      // 'bgimage': 0,
      // 'cloudid': 0,   // this._cloudid
      // 'shape': 'sphere',  // this._shape
      // 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
      // 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
      // 'drag': 'on'  // this._drag
      const s = this.localStorage.get('settings_swipeclouds');
      if (s) {
          s.drag = dragRef;
          this.localStorage.set('settings_swipeclouds', s);
      }
      this.router.navigate(['/blank']);
      setTimeout( () => {
          this.router.navigate(['/swipeclouds', {action: 'drag', actionid: dragRef }]);
      }, 1);

    }

    runThisFunctionFromOutside() {
      // alert('Eureka!');
    }

    loadBrowser(event) {
      event.preventDefault();
      $('[data-role=panel]').panel('close');
      // this.approuter.navigate(['/blank']);
      // setTimeout( () => {
      this.router.navigate(['/browser', {name: 'legal', url: './assets/data/lic.html'}]);
      // }, 1);
    }

    changeShape(event, shapeRef: string) {
      event.preventDefault();

      $('[data-role=panel]').panel('close');
      // 'app_name': 'DTV01', // SC01 DTV01 WW01 BMTV01 MLS01 CF01 PTV01 NB01 RC01
      // 'themeid': 'ios7light',
      // 'bgimage': 0,
      // 'cloudid': 0,   // this._cloudid
      // 'shape': 'sphere',  // this._shape
      // 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
      // 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
      // 'drag': 'on'  // this._drag

      const s = this.localStorage.get('settings_swipeclouds');
      if (s) {
          s.shape = shapeRef;
          this.localStorage.set('settings_swipeclouds', s);
      }
      this.router.navigate(['/blank']);
      setTimeout( () => {
          this.router.navigate(['/swipeclouds', {action: 'shape', actionid: s.shape }]);
      }, 1);
    }

    zoomChange(event) {
      event.preventDefault();
      // $("[data-role=panel]").panel("close");

      // alert(valueRef);
    }


    printCanvas(event, categoryRef: string) {
      // this.GoogleMapsApp();
      event.preventDefault();
      this.messageService.sendMessage(categoryRef);
      $('[data-role=panel]').panel('close');
    }

    googleMapsApp(event, categoryRef: string) {
      event.preventDefault();
      this.messageService.sendMessage(categoryRef);
      $('[data-role=panel]').panel('close');
    }

    onSpeedChange(event) {
      event.preventDefault();
      // $("[data-role=panel]").panel("close");
      // alert(valueRef);
    }

    // callFromOutside(value) {
    //   // this.zone.run(() => {
    //     // alert('calledFromOutside ' + value);
    //     this.someValue = value;
    //     this.LocalStorage.set('appdata', JSON.parse(this.someValue));
    //     // const z = this.LocalStorage.get('appdata');
    //     // if (z) {
    //     //     // alert(z.appid);
    //     // }
    //     // alert(this.serialize(z));
    //     // if (Config.DATA_SOURCE === 'remotejsonp') {
    //       // this.feedsObservableService
    //       // .setInstallDataJsonp('');
    //   // }
    //   // });
    // }

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

    generateArray(obj) {
      return Object.keys(obj).map((key) => {
        return obj[key];
      });
    }

    delete(event) {
      event.preventDefault();
      $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('delete');
    }

    getLatLong(event) {
      event.preventDefault();
      $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('latlong_');
    }

    openFontsDialog(e: any) {
      this.messageService.sendMessage('dialogFonts_' + e.from);
      // if(this.Ca.getActiveObject().get('type')==="text")
      // {

      // }

      // $('#panel_controls').panel('close');
      // $('#fonts_select').click();
      event.preventDefault();
    }

    init() {

      $('#fonts_select').mobiscroll().select({
          theme: this.theme,     // Specify theme like: theme: 'ios' or omit setting to use default
          mode: this.mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
          display: this.display, // Specify display mode like: display: 'bottom' or omit setting to use default
          lang: this.lang,       // Specify language like: lang: 'pl' or omit setting to use default
          enhance: true,
          minWidth: 180
      });

      $('#fonts_select').mobiscroll().change( (option: any) => {
        // alert($('#fonts_select').mobiscroll('getValue'));
        const _font = $('#fonts_select').mobiscroll('getValue');
        this.messageService.sendMessage('setFont:' + _font);
        event.preventDefault();
      });
    }


    ngOnDestroy() {
      this.resizeSubscription$.unsubscribe();
    }
  }



