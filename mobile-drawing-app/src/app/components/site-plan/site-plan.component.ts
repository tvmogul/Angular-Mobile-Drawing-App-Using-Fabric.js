import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ElementRef, Inject, ViewChild } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { ActivatedRoute } from '@angular/router';
import { DataObservableService } from '../../services/data-observable.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Config } from '../../services/config.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { DialogAnchorDirective } from '../../shared/dialog/dialog-anchor.directive';
import { MessageService } from '../../services/message.service';
import { interval } from 'rxjs/internal/observable/interval';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { fabric } from 'fabric';
import { splitAtColon } from '@angular/compiler/src/util';

// declare var TagCanvas: any;
declare var canvas: any;
declare var $: any;
declare var google: any;

@Component({
  selector: 'app-site-plan',
  templateUrl: './site-plan.component.html',
  styleUrls: ['./site-plan.component.scss', './site-plan.component.css'],
  providers: [WindowService],
  entryComponents: [DialogComponent],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(window:resize)': 'onResize($event)',
    '(window:keydown)': 'handleKeyDown($event)'
  }
})
export class SitePlanComponent implements OnInit, AfterViewInit, OnDestroy {

  targetElement = null;

  figureType = '';
  activeFigure: any;
  activeNodes: any;

  shapes = [];
  mode = 'scroller';
  currentPoly: any;
  lastPoints: any;
  lastPos: any;
  src = 'uploads/image1.png';
  imgMap = null;
  copiedObjects = new Array();
  canvasScale = 1.000000000000000;
  SCALE_FACTOR = 1.200000000000000;
  gLeft = 0;
  gTop = 0;

  theme = 'android-holo';
  // theme = 'android-holo-light';
  display = 'modal';
  lang = 'en';


  // Get a reference of application view
  // @ViewChild('application', {read: ViewContainerRef}) applicationRef: ViewContainerRef;
  @ViewChild('swipeCanvas', null) swipeCanvas: ElementRef;
  @ViewChild(DialogAnchorDirective, null) dialogAnchor: DialogAnchorDirective;

  public siteInfo: any = '';

  public id: any = 'planid';
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

  public districtid: any = '';
  public _districtid: any = '';

  _themeid = 'light';
  _bgimage = 0;

  contextmenuX = 0;
  contextmenuY = 0;
  contextmenu = true;
  originalEvalfalent: any;

  public _jData: any;
  public _logo = Config.APP_LOGO;



  elementRef: ElementRef;
  public _wcloud: number;
  public _hcloud: number;

  public _scale = .1;
  public doc: Array<any>;
  public categories: any;
  private sub: any; // -> Subscriber
  private sub2: any; // -> Subscriber
  public setClickedRow: any = 0;
  private message: any;
  public video1: any;
  public video1El: any;
  public webcam: any;
  public localMediaStream: any;

  public canvas: any;
  public props: any = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
  };

  public lineObj = {
    startX: -1,
    startY: -1,
    endX: -1,
    endY: -1,
    started: false
  };

  public line: any;
  public isDown: any;
  public drawLine: any;
  public currentShape: any;

  private textString: string;
  private size: any = {
    width: 100,
    height: 100
  };


  routerEventSubscription: any;
  private file: any;
  public alive: any;
  public bDrawLine = false;

  public pageGrid: any;
  public gridLine: any;
  currentColor: any;
  currentOpacity: any;

  constructor(@Inject(ElementRef) elementRef: ElementRef,
              windowService: WindowService,
              private localStorage: LocalStorageService,
              private spObservableService: DataObservableService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService) {

    this.elementRef = elementRef;

    this.size.width = Math.min(document.documentElement.clientWidth,  window.innerWidth  || 0);
    this.size.height = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
    // this._wcloud = $(window).innerWidth();
    // this._hcloud = $(window).innerHeight();

    // subscribe to the window resize event
    windowService.resizeObservable$.subscribe(() => {
      // alert('SWIPECLOUDS - windowService:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.changeSize();

      // this.drawBackgroudGraphPaper();

    });

    // Bind event to window.orientationchange that
    // provides orientation when device is turned.
    // $(window).on('orientationchange', function(event) {
    //   // alert('SWIPECLOUDS - orientationchange:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
    //   this.updateCanvasLayout();
    // });

    this.sub2 = this.messageService.getMessage().subscribe(message => {
      this.message = message;
      // starts with
      // if ($(this).attr("id").match(/^p_/)) {
      if (this.message.text.match(/^a_/)) {
        // addImage($(this).attr("data-img"));
        this.addImage(this.message.text, 'random');
      }

      if (this.message.text.match(/^scale_/)) {
        this.scaleChange(this.message.text.substring(6));
      }

      if (this.message.text.match(/^angle_/)) {
        this.angleChange(this.message.text.substring(6));
      }

      if (this.message.text.match(/^addsiteinfo_/)) {
        this.addSiteInfo();
      }

      if (this.message.text.match(/^addtext_/)) {
        this.textString = this.message.text.substring(8);
        this.addText();
      }

      if (this.message.text.match(/^delete/)) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
          this.canvas.remove(activeObject);
        }
      }

      if (this.message.text.match(/^text/)) {
      }

      // MVC Save Site Plan - Call rasterize
      if (this.message.text.match(/^save/)) {
        this.rasterize();
      }

      if (this.message.text.match(/^back2app/)) {
        // Go Back & Refresh MVC Web Page with updated image
        // jQuery("body").on("touchmove", false);
        // document.location.href = url;
        // window.open(url, '_self');
        const origin = window.location.origin;

        // alert("origin: " + origin);  //no forward slash at end - gives domain

        if (this._appid === 'SomeApp') {
          document.location.href = origin + '/SomeApp/X?driveId=' + this._driveid;
        } else if (this._appid === 'SomeOtherApp') {
          document.location.href = origin + '/SomeOtherApp/Home/X?driveId=' + this._driveid;
        } else {
          document.location.href = 'javascript:history.go(-1)';
        }
        return;
      }

      if (this.message.text.match(/^dialogFonts_/)) {
        // this.openDialogBox('fonts');
        if (this.canvas.getActiveObject()) {
          if (this.canvas.getActiveObject().get('type') === 'i-text') {
            $('#panel_controls').panel('close');
            $('#fonts_select').click();
          }
        } else {
          alert('You MUST select an object!');
        }
      }

      if (this.message.text.match(/^setFont:/)) {
        if (this.canvas.getActiveObject()) {
          if (this.canvas.getActiveObject().get('type') === 'i-text') {
            $('#panel_controls').panel('close');
            const arr = this.message.text.split(':');
            // this.props.fontFamily = !this.props.fontFamily;
            this.setActiveStyle('fontFamily', this.props.fontFamily ? arr[1] : '', null);
          }
        } else {
          alert('You MUST select an object!');
        }
      }

      if (this.message.text.match(/^saveCanvas_/)) {
        this.saveCanvas();
      }
      if (this.message.text.match(/^loadCanvas_/)) {
        this.loadCanvas();
      }

      if (this.message.text.match(/^latlong_/)) {
        // document.getElementById('latitude').value = result.geometry.location.lat();
        // document.getElementById('longitude').value = result.geometry.location.lng();
      }

      if (this.message.text.match(/^print/)) {
        this.alive = true;
        const timer = interval(3000).subscribe(() => {
          timer.unsubscribe();
          window.print();
        });
      }

      if (this.message.text.match(/^googleMapsApp/)) {
        const timer = interval(3000).subscribe(() => {
          timer.unsubscribe();
        });
      }
    });

    // fabric.util.addListener(document.getElementById('toggle-opacity'), 'click', function () {
    //     if (!this.canvas.backgroundImage) return;
    //     this.canvas.backgroundImageOpacity = this.canvas.backgroundImageOpacity < 1 ? 1 : fabric.util.toFixed(Math.random(), 2);
    //     this.canvas.renderAll();
    // });

    // fabric.util.addListener(document.getElementById('toggle-stretch'), 'click', function () {
    //     if (!this.canvas.backgroundImage) return;
    //     this.canvas.backgroundImageStretch = !this.canvas.backgroundImageStretch;
    //     this.canvas.renderAll();
    // });

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
    // this.routerEventSubscription = this.router.events.subscribe((event: any) => {
    //   if (this.router.isActive('/siteplan', false)) {
    //   }
    // });

    // window.addEventListener('back',
    //   // Add callback here
    //   () => alert('okay')
    // );

    fabric.Object.prototype.toObject = ( (toObject) => {
      return () => {
          return fabric.util.object.extend(toObject.call(this), {
              polygonNo: 0,
              circleNo: 0
          });
      };
    })(fabric.Object.prototype.toObject);

  } // end constructor

  private newMethod(): any {
    return 'aa';
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

  handleKeyDown(event: any) {
    switch (event.keyCode) {
      case 46: // delete
        if (this.canvas.getActiveObject()) {
          this.canvas.remove(this.canvas.getActiveObject());
        }
    }
  }
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   alert('Back button pressed');
  // }

  initOpenURLExternally() {
    $('a[target=\'_blank\'],a[target=\'_system\']').each(function() {
        const $this = $(this);
        const href = $this.attr('href');
        if (href !== '#') {
            $this
                .attr('onclick', 'openURLExternally("' + href + '"); return false;')
                .attr('href', '#');
        }
    });
  }

  // The URL you are trying to open isn't whitelisted by adding an access tag to your config.xml as follows:
  // <access origin="http://www.example.com" />
  // or you can do
  // <access origin="*" />

  openURLExternally(url) {
    // // if cordova is bundeled with the app (remote injection plugin)
    // // log.trace("openURLExternally: ", url);
    // if (typeof cordova === 'object') {
    //     // log.trace("cordova exists ... " + typeof cordova.InAppBrowser);
    //     if (typeof cordova.InAppBrowser === 'object') {
    //         // log.trace("InAppBrowser exists");
    //         cordova.InAppBrowser.open(url, '_system');
    //         return;
    //     }
    // }
    // // fallback if no cordova is around us:
    // // window.open(url, '_system', '');
    // window.open(url, '_blank', '');
  }

  ngOnInit() {

    this.isDown = false;
    this.drawLine = false;

    // get URL parameters
    this.sub = this.activatedRoute.parent.params.subscribe(params => {

      // tslint:disable-next-line:variable-name
      const _data = this.message.text.substring(9);
      const arData: any = _data.split('|');
      this._appid = arData[0];
      this._action = arData[1];  // add, edit, delete, save, getjson, refresh
      this._driveid = arData[2];
      this._siteid = arData[3];
      this._imageid = arData[4];
      this._length = arData[5];
      this._width = arData[6];
      this._siteName = arData[7];
      this._roomName = arData[8];
      this._siteAddress = arData[9];
      // this._latitude = tarData[10];
      // this._longitude = arData[11];

      if (this._action === 'edit') {
        // alert(this._action);
        this.getJsonCanvasFromMVC();
      }

      const _action: any = params.action;
      const _actionid: any = params.actionid;

      // alert('_action: ' + _action);
      if ((_action === 'undefined') || (_actionid === 'undefined')) {
      } else if (_action === 'shape') {
      }
    },
    (err) => {
      console.log('error!', err);
    });

    // william sergio - iOS doesn’t prevent users from scrolling past the modal
    // if there is content that exceeds the viewport height, despite you adding
    // that condition to the CSS. One solution is to write the window.innerHeight
    // into both HTML and body elements in the DOM and then toggle the overflow:
    // hidden style on and off on the body and html:
    // tslint:disable-next-line:prefer-const
    let vpH = window.innerHeight;
    document.documentElement.style.height = vpH.toString() + 'px';
    // body.style.height = vpH.toString() + "px";
    $('body').css('height', vpH.toString() + 'px');

    // Prevent anchors from adding history entry
    const anchors = document.getElementsByTagName('a');
    // tslint:disable-next-line:no-shadowed-variable
    let i = 0;
    for (i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      // tslint:disable-next-line:only-arrow-functions
      anchor.addEventListener('click', function() {
          history.replaceState(null, null, anchor.href);
      }, false);
    }

    // Get target element to block scrolling for (i.e., our canvas container)
    this.targetElement = document.querySelector('#canvasWrap');

    this.targetElement = () => {
      // Disable body scroll
      disableBodyScroll(this.targetElement);
    };

    window.addEventListener('deviceorientation', this.updateCanvasLayout);

    // let canvasWrapper = document.getElementById('canvas-wrapper');
    // canvasWrapper.tabIndex = 1000;
    // canvasWrapper.addEventListener("keydown", this.processKeys, false);
    // canvasWrapper.style.outline = "none";  // remove the blue halo around canvas

    // setup canvas
    this.canvas = new fabric.Canvas('swipeCanvas', {
      hoverCursor: 'hand',
      selection: true,
      backgroundColor: '#F0F8FF', // '#d3fadc', // '#F0F8FF',   // '#ADD8E6',
      selectionBorderColor: 'blue',
      defaultCursor: 'hand'
      // width: '100% !important',
      // height: '100% !important'
    });

    this.canvas.add(new fabric.IText('Hello Fabric!'));

    this.canvas.on({
      'mouse:down': (e: any) => {
        $('#panel_controls').panel('close');
        // var target = this.canvas.findTarget(e.e);
        console.log('mouse:down');
        const pointer = this.canvas.getPointer(e.e);
        if (this.figureType === 'polygon') {

        }

        switch (e.keyCode) {
          case 46: // delete
          // alert('DELETE');
          if (this.canvas.getActiveObject()) {
            this.canvas.remove(this.canvas.getActiveObject());
          }
        }
       // e.preventDefault();
      },
      'mouse:up': () => {
        if (this.drawLine) {
          this.isDown = false;
          this.drawLine = false;
          this.line.setCoords();
        }
      },
      'mouse:move': (e) => {
        $('#panel_controls').panel('close');
        if (this.drawLine) {
          if (!this.isDown) { return; }
          // tslint:disable-next-line:prefer-const
          let pointer = this.canvas.getPointer(e.e);
          this.line.set({ x2: pointer.x, y2: pointer.y });
          this.canvas.setActiveObject(this.line);
          this.canvas.renderAll();
          // this.canvas.stopObserving("mouse:up", draw_line_stop);
        }
        if (this.figureType === 'polygon') {
          const object = e.target;
          this.activeFigure = e.target;
          this.canvas.forEachObject((obj: any) => {
            const pointer = this.canvas.getPointer(e.e);
            // _.each(activeFigure.points, function (p, i) {
            const holdershape = new fabric.Circle({
                left: this.activeFigure.left + (pointer.x * this.activeFigure.scaleX),
                top: this.activeFigure.top + (pointer.y * this.activeFigure.scaleY),
                strokeWidth: 3,
                radius: 5,
                fill: '#fff',
                stroke: '#000'
            });
            // WS Bug Fix
            // if (holdershape.length > 0) {
            holdershape.hasControls = false;
            holdershape.hasBorders = false;
            // holdershape.pointIndex = i;
            this.activeNodes.push(holdershape);
            canvas.add(holdershape);
            // }
          });
          canvas.renderAll();
        }
      },
      'object:moving': (e) => {
        $('#panel_controls').panel('close');
        const obj = e.target;
        // if object is too big ignore
        if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
            return;
        }
        obj.setCoords();
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        // bot-right corner
        if (obj.getBoundingRect().top + obj.getBoundingRect().height  > obj.canvas.height ||
            obj.getBoundingRect().left + obj.getBoundingRect().width  > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
        }
      },
      'object:modified': (e) => {
        // I set object modified listener to check if object is out of bounds. If so, I restore it to its original state.
        // this.canvas.on('object:modified', function (options: any) {
            const obj = e.target;
            const boundingRect = obj.getBoundingRect(true);
            if (boundingRect.left < 0
                || boundingRect.top < 0
                || boundingRect.left + boundingRect.width > this.canvas.getWidth()
                || boundingRect.top + boundingRect.height > this.canvas.getHeight()) {
                obj.top = obj._stateProperties.top;
                obj.left = obj._stateProperties.left;
                obj.angle = obj._stateProperties.angle;
                obj.scaleX = obj._stateProperties.scaleX;
                obj.scaleY = obj._stateProperties.scaleY;
                obj.setCoords();
                obj.saveState();
            }
      },
      'object:selected': (e) => {
        const selectedObject = e.target;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        // selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';
        this.resetPanels();
        if (selectedObject.type !== 'group' && selectedObject) {
          this.getId();
          this.getOpacity();
          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.getFill();
              break;
            case 'i-text':
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              console.log('image');
              break;
          }
        }
      },
      'selection:cleared': () => {
        this.resetPanels();
      }
    });

    const fixed = document.getElementById('canvasWrap');
    // tslint:disable-next-line:only-arrow-functions
    fixed.addEventListener('touchstart', function(e) {
      e.preventDefault();
    }, true);

    this.updateCanvasLayout();

  } // end ngOnInit


  ngAfterViewInit() {
  // //Disable context menu
  // fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', (e) => {
  //   let objectClicked = false;
  //   let clickPoint = new fabric.Point(e.offsetX, e.offsetY);
  //   this.originalEvalfalent = e.originalEvalfalent;
  //   let pointer = this.canvas.getPointer(e.originalEvalfalent);
  //   let objects = this.canvas.getObjects();
  //   let i:number = 0;
  //   for (i = objects.length - 1; i >= 0; i--) {
  //       if (objects[i].containsPoint(pointer)) {
  //         this.canvas.setActiveObject(objects[i]);
  //         objectClicked = true;
  //         this.contextmenuX = clickPoint.x;
  //         this.contextmenuY = clickPoint.y;
  //         break;
  //       }
  //   }
  //   if (i < 0) {
  //     this.canvas.deactivateAll();
  //   }
  //   if(objectClicked){
  //     $('body').contextMenu(menu,{triggerOn:'contextmenu'});
  //     // if(this.canvas.getActiveObject().get('type')==="text")
  //     // {
  //     //   // //Display text panel
  //     //   // console.log('text panel Displayed');
  //     //   // $("#Image_left_panel").css("display", "none");
  //     //   // $("#shape_left_panel").css("display", "none");
  //     //   // //$("#left_panel").css("display", "block");
  //     // }
  //     // else if(this.canvas.getActiveObject().get('type')==="Image")
  //     // {
  //     //   // //Display Image Panel
  //     //   // console.log('Image Panel Displayed');
  //     //   // $("#Image_left_panel").css("display", "block");
  //     //   // $("#shape_left_panel").css("display", "none");
  //     //   // $("#left_panel").css("display", "none");
  //     // }
  //     // else
  //     // {
  //     // }
  //   }
  //   this.canvas.setActiveObject(objects[i]);
  //   this.canvas.renderAll();
  //   this.canvas.setActiveObject(objects[i]);
  //   e.preventDefault();
  //   return false;
  // });
  }

  // contextMenu() {
  //   var ctxTarget = null;

  //   var menu = [{
  //       name: 'Select Object',
  //       img: '',
  //       title: 'Select Object',
  //       fun: function (o, jqEvent) {
  //           this.canvas.setActiveObject(ctxTarget);
  //           console.log(ctxTarget);
  //       }
  //   }];

  //   $('.upper-canvas').on('contextmenu', function (e) {
  //       e.preventDefault();
  //       ctxTarget = this.canvas.findTarget(e.originalEvent);
  //   });

  //   $('.upper-canvas').contextMenu(menu, {
  //       triggerOn: 'contextmenu',
  //       closeOnClick: true,
  //   });
  // }

  handleDrop(e) {
    this.file = e.dataTransfer.files[0];
    const reader = new FileReader();

    // Prevent any non-image file type from being read.
    if (this.file.type.match(/^image.*/)) {
      reader.onload = (imgFile) => {
        console.log(imgFile);
        const data = imgFile.target.toString();
        fabric.Image.fromURL(data, (img) => {
          const oImg = img.set({
            left: 0,
            top: 0,
            angle: 0
          }).scale(1);
          img.scaleX = oImg.scaleX * this.canvasScale,
          img.scaleY = oImg.scaleY * this.canvasScale,
          this.canvas.add(oImg).renderAll();
        });
      };
      reader.readAsDataURL(this.file);
    }
    return false;
  }

  // addWebcam() {
  //   const webcamEl = document.getElementById('webcam');

  //   this.webcam = new fabric.Image(webcamEl, {
  //     left: 539,
  //     top: 328,
  //     angle: 94.5,
  //     originX: 'center',
  //     originY: 'center'
  //   });

  //   // making navigator.getUserMedia cross-browser compatible
  //   const userMediaFunc = navigator.getUserMedia || navigator.getUserMedia;
  //   if (userMediaFunc) { userMediaFunc.apply(navigator, arguments); }

  // }

  getUrlVar(key) {
    const result = new RegExp(key + '=([^&]*)', 'i').exec(window.location.search);
    return result && unescape(result[1]) || '';
  }
  // let _id = getUrlVar('id');
  //// if (_id.length > 0) {

  // Block "Size"
  changeSize() {
    this.size.width = Math.min(document.documentElement.clientWidth,  window.innerWidth  || 0);
    this.size.height = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);

    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
    // this.canvas.setWidth(this.size.width);
    // this.canvas.setHeight(this.size.height);
  }

  onResize() {
    this.updateCanvasLayout();
  }

  updateCanvasLayout() {
    // alert("window.innerWidth: " + window.innerWidth +"\r\nwindow.innerHeight: " + window.innerHeight);

    try {
      if (window.innerHeight > window.innerWidth) {
        // alert("portrait");
        // this.canvas.setWidth(() => this.canvas.setWidth(window.innerWidth));
        // this.canvas.setWidth(window.innerWidth);
        // this.canvas.setHeight(window.innerHeight-56);
      }
      if (window.innerHeight < window.innerWidth) {
        // alert("landscape");
        // alert("window.innerHeight < window.innerWidth)");
        // this.canvas.setWidth(window.innerWidth);
        // this.canvas.setHeight(window.innerHeight-56);
      }
      this.canvas.setWidth(window.innerWidth);
      this.canvas.setHeight(window.innerHeight - 56);
    } catch (e) {

    }

    // william sergio - iOS doesn’t prevent users from scrolling past the modal
    // if there is content that exceeds the viewport height, despite you adding
    // that condition to the CSS. One solution is to write the window.innerHeight
    // into both HTML and body elements in the DOM and then toggle the overflow:
    // hidden style on and off on the body and html:
    // tslint:disable-next-line:prefer-const
    let vpH = window.innerHeight;
    document.documentElement.style.height = vpH.toString() + 'px';
    // body.style.height = vpH.toString() + "px";
    $('body').css('height', vpH.toString() + 'px');

    $('.ui-header').trigger('updatelayout');
    // $('.ui-footer').trigger('updatelayout');
    // $('#event .iscroll-scroller').iscrollview('scrollTo', 0, 0, 0, false);
  }

  // wait for the view to init before using the element
  onAfterInit() {
    // this.stopBodyScrolling(true);
  }

  stopBodyScrolling(bool) {
      if (bool === true) {
        // tslint:disable-next-line:only-arrow-functions
        fabric.util.addListener(this.canvas, 'touchStart', function(e) {
          e.preventDefault();
        });
        // tslint:disable-next-line:only-arrow-functions
        fabric.util.addListener(this.canvas, 'touchMove', function(e) {
          e.preventDefault();
        });
        // document.body.addEventListener("touchStart", this.freezeVp, false);
      } else {
        // fabric.util.removeEventListener(this.canvas, 'touchStart', function (e) {
        // });
        // document.body.removeEventListener("touchStart", this.freezeVp, false);
      }
  }
  freezeVp = (e) => {
      e.preventDefault();
  }

  // <a href="javascript:history.go(-1)">&laquo; Back</a>
  // window.history.back(); // Simulates a back button click
  // window.history.go(-1); // Simulates a back button click
  // window.history.back(-1); // Simulates a back button click
  // let kurl = window.location.href;

  addImage(zimg: any, pos: any) {
    const zpath = '/assets/img_items/' + zimg;  // + ".png";

    let zscale = 1.0;
    let bImage = true;

    // $('#panel_controls').panel('close');

    $.each(Config.ITEM_DATA, function(i: any, item: any) {
        if (zimg === 'a_hline.png') {
          bImage = false;
          this.bDrawLine = false;
        } else if (zimg === 'a_vline.png') {
          bImage = false;
        } else if (zimg === 'a_orientation.png') {
          bImage = false;
        } else if (zimg === 'a_text.png') {
          bImage = false;
        } else if (zimg === 'a_circle.png') {
          bImage = false;
        } else if (zimg === 'a_ellipse.png') {
          bImage = false;
        } else if (zimg === 'a_square.png') {
          bImage = false;
        // } else if (zimg === 'a_polygon.png') {
        //   bImage = false;
        // } else if (zimg === 'a_polygonclose.png') {
        //   bImage = false;
        } else if (zimg === item.image) {
          zscale = parseFloat(item.scale);
        }
    });

    if (bImage) {
      fabric.Image.fromURL(zpath, (img) => {

        let zleft = (this.zrandom(this.canvas.width / 2, this.canvas.width)) - (img.width * this.canvasScale);
        let ztop = (this.zrandom(this.canvas.height / 2, this.canvas.height)) - (img.height * this.canvasScale);

        if (pos === 'top_left') {
          zleft = 0;
          ztop = 0;
        }
        if (pos === 'top_center') {
          zleft = (this.canvas.width / 2) - ((img.width * this.canvasScale) / 2);
          ztop = 0;
        }
        if (pos === 'top_right') {
          zleft = (this.canvas.width) - ((img.width * this.canvasScale));
          ztop = 0;
        }
        if (pos === 'middle_left') {
          zleft = 0;
          ztop = (this.canvas.height / 2) - ((img.height * this.canvasScale) / 2);
        }
        if (pos === 'middle_center') {
          zleft = (this.canvas.width / 2) - ((img.width * this.canvasScale) / 2);
          ztop = (this.canvas.height / 2) - ((img.height * this.canvasScale) / 2);
        }
        if (pos === 'middle_right') {
          zleft = (this.canvas.width) - ((img.width * this.canvasScale));
          ztop = (this.canvas.height / 2) - ((img.height * this.canvasScale) / 2);
        }
        if (pos === 'bottom_left') {
          zleft = 0;
          ztop = (this.canvas.height) - ((img.height * this.canvasScale));
        }
        if (pos === 'bottom_center') {
          zleft = (this.canvas.width / 2) - ((img.width * this.canvasScale) / 2);
          ztop = (this.canvas.height) - ((img.height * this.canvasScale));
        }
        if (pos === 'bottom_right') {
          zleft = (this.canvas.width) - ((img.width * this.canvasScale));
          ztop = (this.canvas.height) - ((img.height * this.canvasScale));
        }

        img.left = zleft,
        img.top = ztop,
        img.scaleX = zscale * this.canvasScale,
        img.scaleY = zscale * this.canvasScale,
        this.extend(img, this.randomId());
        this.canvas.add(img);

        // this.canvas.clipTo = function (ctx) {
        //   image.render(ctx);
        // };
        // this.canvas.renderAll();
        this.canvas.requestRenderAll();
        // this.canvas.calcOffset();
        // this.selectItemAfterAdded(img);
        // this.clearNodes();
      });
    } else {
      if (zimg === 'a_hline.png') {
        const hrect = new fabric.Rect({
          left: 100,
          top: 100,
          width: 250,
          height: 10,
          fill: '#000',
          originX: 'left',
          originY: 'top',
          centeredRotation: true
        });
        this.canvas.add(hrect).renderAll();
      } else if (zimg === 'a_vline.png') {
        const vrect = new fabric.Rect({
          left: 100,
          top: 100,
          width: 10,
          height: 250,
          fill: '#000',
          originX: 'left',
          originY: 'top',
          centeredRotation: true
        });
        this.canvas.add(vrect).renderAll();
      } else if (zimg === 'a_text.png') {
        const vrect = new fabric.IText('Add Text Here', {
          left: 100,
          top: 100,
          width: 10,
          height: 250,
          fill: '#000',
          originX: 'left',
          originY: 'top',
          centeredRotation: true
        });
        this.canvas.add(vrect).renderAll();
      } else if (zimg === 'a_circle.png') {
        this.addFigure('circle');
      } else if (zimg === 'a_ellipse.png') {
        this.addFigure('ellipse');
      } else if (zimg === 'a_square.png') {
        this.addFigure('square');
      }
      // else if (zimg === 'a_polygon.png') {
      //   // e.preventDefault;
      //   // this.blur();
      //   this.figureType = 'polygon';
      //   this.drawLine = false;
      //   // deselect();

      // } else if (zimg === 'a_polygonclose.png') {
      //   // e.preventDefault;
      //   // this.blur();
      //   this.figureType = 'polygonclose';
      //   this.currentPoly.selectable = true;
      //   this.currentPoly.fill = this.currentColor;
      //   this.currentPoly.opacity = this.currentOpacity;
      //   this.activeFigure = this.currentPoly;
      //   this.currentPoly = null;
      //   this.canvas.setActiveObject(this.activeFigure);
      //   // $('#closepolygon').hide();
      //   this.figureType = '';
      //   this.drawLine = false;
      // }
    }
  } // end addImage()

  // drawBackgroudGraphPaper() {
    // this.canvas.backgroundColor = null;
    // var imageUrl = null;
    // this.canvas.setBackgroundImage(imageUrl, this.canvas.renderAll.bind(this.canvas));
    // imageUrl = "./assets/img_bg/iPadGreenGrid.png";
    // this.canvas.setBackgroundImage(imageUrl, this.canvas.renderAll.bind(this.canvas), {
    //   backgroundImageOpacity: 0.5,
    //   backgroundImageStretch: true,
    //   width: this.canvas.width,
    //   height: this.canvas.height
    // });

    // this.pageGrid = null;

    // var gridWidth = this.canvas.getWidth();
    // var gridHeight = this.canvas.getHeight();

    // fabric.Object.prototype.set({
    //     objectCaching: false
    // });

    // var gridSizePX = 20;
    // this.pageGrid = new fabric.Group([], {left: 0, top: 0, width: gridWidth,
    // height: gridHeight, originX: 'center', originY: 'center', evented: false, selectable: false});
    // var lineOption = {stroke: 'rgb(0,0,255)', strokeWidth: .2, selectable: false, evented: false, strokeDashArray: null};
    // // first loop for vertical line
    // for (var i = Math.ceil(gridWidth / gridSizePX); i--;) {
    //   this.pageGrid.add(new fabric.Line([gridSizePX * i, 0, gridSizePX * i, gridHeight], lineOption));
    // }
    // for (var i = Math.ceil(gridHeight / gridSizePX); i--;) {
    //   this.pageGrid.add(new fabric.Line([0, gridSizePX * i, gridWidth, gridSizePX * i], lineOption));
    // }

    // this.canvas.add(this.pageGrid);
    // var lineOption2 = {stroke: 'rgb(0,0,255)', strokeWidth: .2, selectable: false, evented: false, strokeDashArray: null};
    // this.gridLine = new fabric.Line([720, 0, 720, gridHeight], lineOption2);
    // this.canvas.add(this.gridLine);
  // }

  // drawBox() {

  //   this.canvas.on('mouse:down', function(o){
  //     this.isDown = true;
  //     var pointer = this.canvas.getPointer(o.e);
  //     var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
  //     this.line = new fabric.Line(points, {
  //       strokeWidth: 5,
  //       fill: 'red',
  //       stroke: 'red',
  //       originX: 'center',
  //       originY: 'center'
  //     });
  //     this.canvas.add(this.line);
  //   });

  //   this.canvas.on('mouse:move', function(o){
  //     if (!this.sDown) return;
  //     var pointer = this.canvas.getPointer(o.e);
  //     this.line.set({ x2: pointer.x, y2: pointer.y });
  //     this.canvas.renderAll();
  //   });

  //   this.canvas.on('mouse:up', function(o){
  //     this.isDown = false;
  //   });

  // }

//   this.canvas.on('mouse:move', function (options) {
//     getMouse(options);
// });

// canvas.on('mouse:down', function (options) {
//     drawLine(options);
// });

// function getMouse(options) {
//     canvas.getObjects('text')[0].text =
//         "X: " + options.e.clientX + " Y: " + options.e.clientY;
//     canvas.renderAll();
// }

  drawLine2(options: any) {
    this.lineObj.started = !this.lineObj.started;
    if (this.lineObj.started) {
      this.lineObj.startX = options.e.clientX;
      this.lineObj.startY = options.e.clientY;
    } else {
      this.lineObj.endX = options.e.clientX;
      this.lineObj.endY = options.e.clientY;
      // console.log(lineObj);
      // tslint:disable-next-line:prefer-const
      let line = new fabric.Line(
        [
          this.lineObj.startX,
          this.lineObj.startY,
          this.lineObj.endX,
          this.lineObj.endY], {
            stroke: 'black',
            selectable: false,
            hasControls: false,
            originX: 'center',
            originY: 'center'
        });
        // console.log(line);
      this.canvas.add(line);
      this.canvas.renderAll();
    }
  }

  openDialogBox(msgRef: string) {
    const zdialogComponentRef = this.dialogAnchor.createDialog(DialogComponent);
    if (msgRef === 'license') {
      zdialogComponentRef.instance.loadData('This is a <strong>dialog</strong> message!');
    } else if (msgRef === 'fonts') {

      // tslint:disable-next-line:no-unused-expression
      const s = '<div style="margin:8px 8px 8px 8px;">' +
              '<span>' +
              '<span style="font-size:.8em">Font:&nbsp;&nbsp;<select id="fs" style="font-size:1.2em;width:110px;">' +
              '<option value="Arial,Arial,Helvetica,sans-serif">Arial,Arial,Helvetica,sans-serif</option>' +
              '<option value="Arial Black,Arial Black,Gadget,sans-serif">Arial Black,Arial Black,Gadget,sans-serif</option>' +
              '<option value="Comic Sans MS,Comic Sans MS,cursive">Comic Sans MS,Comic Sans MS,cursive</option>' +
              '<option value="Courier New,Courier New,Courier,monospace">Courier New,Courier New,Courier,monospace</option>' +
              '<option value="Georgia,Georgia,serif">Georgia,Georgia,serif</option>' +
              '<option value="Impact,Charcoal,sans-serif">Impact,Charcoal,sans-serif</option>' +
              '<option value="Lucida Console,Monaco,monospace">Lucida Console,Monaco,monospace</option>' +
              '<option value="Lucida Sans Unicode,Lucida Grande,sans-serif">Lucida Sans Unicode,Lucida Grande,sans-serif</option>' +
              '<option value="Palatino Linotype,Book Antiqua,Palatino,serif">Palatino Linotype,Book Antiqua,Palatino,serif</option>' +
              '<option value="Tahoma,Geneva,sans-serif">Tahoma,Geneva,sans-serif</option>' +
              '<option value="Times New Roman,Times,serif">Times New Roman,Times,serif</option>' +
              '<option value="Trebuchet MS,Helvetica,sans-serif">Trebuchet MS,Helvetica,sans-serif</option>' +
              '<option value="Verdana,Geneva,sans-serif">Verdana,Geneva,sans-serif</option>' +
              '</select></span><br />' +
              '<span style="font-size:1.2em">Size:&nbsp;&nbsp;<select id="size" style="width:60px;">' +
              '<option value="7">7</option>' +
              '<option value="8">8</option>' +
              '<option value="9">9</option>' +
              '<option value="10">10</option>' +
              '<option value="11">11</option>' +
              '<option value="12">12</option>' +
              '<option value="14">14</option>' +
              '<option value="16">16</option>' +
              '<option value="18">18</option>' +
              '<option value="20">20</option>' +
              '<option value="30">30</option>' +
              '</select></span></span><br />' +
              '<textarea id="text2add" class="changeMe" rows="2" cols="20" wrap="hard">Enter Text</textarea><br>' +
              '</div><br />' +
              '<div style="z-index:999999;padding-right:12px;text-align:right;">' +
              '<button id="btnAddText" class="btn btn-dangerz">Add Text</button></div>';
      zdialogComponentRef.instance.loadData(s);
    } else {
      zdialogComponentRef.instance.loadData('This is a <strong>dialog</strong> message!');
    }
    zdialogComponentRef.instance.close.subscribe(() => {
      zdialogComponentRef.destroy();
    });
  }

// tslint:disable-next-line:variable-name
scaleChange(scale_value: string) {
  const activeObject = this.canvas.getActiveObject();
  if (activeObject) {
    activeObject.scale(parseFloat(scale_value)).setCoords();
    this.canvas.requestRenderAll();
  }
  // this.loadCanvasFromJSON();
  return false;
}

// tslint:disable-next-line:variable-name
angleChange(angle_value: string) {
  const activeObject = this.canvas.getActiveObject();
  if (activeObject) {
    activeObject.set('angle', parseInt(angle_value, 10)).setCoords();
    this.canvas.requestRenderAll();
  }
  // this.saveCanvasToJSON();
  return false;
}

zrandom(numLow: number, numHigh: number) {
  // let adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
  const adjustedHigh = (numHigh) - (numLow) + 1;
  const numRand = Math.floor(Math.random() * adjustedHigh) + (numLow);
  // if ((IsNumeric(numLow)) && (IsNumeric(numHigh)) && (parseFloat(numLow) <= parseFloat(numHigh)) && (numLow != '') && (numHigh != '')) {
  //    return numRand;
  // } else {
  //    return 0;
  // }
  return numRand;
}

generateArray(obj) {
  return Object.keys(obj).map((key) => {
    return obj[key];
  });
}

getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



  /*------------------------Block elements------------------------*/

  addText() {
    const textString = this.textString;
    const text = new fabric.IText(textString, {
      left: (this.canvas.width / 2),
      top: (this.canvas.height / 2),
      fontFamily: 'helvetica',
      fontSize: 24,
      angle: 0,
      fill: '#000000',
      scaleX: 1.0,
      scaleY: 1.0,
      fontWeight: 'bold',
      hasRotatingPoint: true,
      hasControls: true,
      selectable: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.canvas.requestRenderAll();
    // this.canvas.calcOffset();
    // this.selectItemAfterAdded(text);
    this.textString = '';

  }

  // Block "Add text"

  addSiteInfo() {
    // NOTE: If we have image inside the canvas it will take time to load
    // and before loading we can NOT call addSiteInfo() or we get an error!
    // this.canvas.forEachObject(function(obj) {
    //   if (obj.id) {
    //     //alert(obj.id);
    //     if (obj.id.includes("planid") && obj.type === "text") {
    //       obj.remove();
    //     }
    //   }
    // });
    // alert("Eureka!");
    // this._siteName = "Test Site";
    // this._roomName = "Bonaventure";
    // this._siteAddress = "3001 Alstairs Blvd, Miami, FL 33156";
    this.siteInfo = '';
    if (this._siteName.length > 0) {
      this.siteInfo = this.siteInfo + 'Version: 1.9       ';
      this.siteInfo = this.siteInfo + 'Site Name: ' + this._siteName + '       ';
      this.siteInfo = this.siteInfo + 'Room Name: ' + this._roomName;
      this.siteInfo = this.siteInfo + '\r\nSite Address: ' + this._siteAddress;
      // this.siteInfo = "l x w: " + this._length.toString() + " x " + this._width.toString();

      const info = new fabric.IText(this.siteInfo, {
        name: 'planid',
        // id: 'planid',
        left: 10,
        top: 10,
        fontFamily: 'helvetica',
        fontSize: 9,
        angle: 0,
        fill: '#000000',
        scaleX: 1.0,
        scaleY: 1.0,
        fontWeight: 'bold',
        hasRotatingPoint: true,
        hasControls: true,
        selectable: true
      });
      this.extend(info, this.randomId());
      this.canvas.add(info);
      this.canvas.requestRenderAll();
      // this.canvas.calcOffset();
      // this.selectItemAfterAdded(text);
    }


  }

  addDragDropText() {
    const textString = 'drag n\' drop\r\nphotos here';
    const text = new fabric.IText(textString, {
      left: (this.canvas.width / 2),
      top: (this.canvas.height / 2),
      fontFamily: 'helvetica',
      fontSize: 12,
      angle: 0,
      fill: '#000000',
      scaleX: 1.0,
      scaleY: 1.0,
      fontWeight: 'bold',
      hasRotatingPoint: true,
      hasControls: true,
      selectable: true
    });
    this.extend(text, 'dragdrop_' + this.randomId());
    text.left = (this.canvas.width / 2) - ((text.width * this.canvasScale) / 2);
    text.top = (this.canvas.height / 2) - ((text.height * this.canvasScale) / 2);
    this.canvas.add(text);
    this.canvas.requestRenderAll();
    // this.canvas.calcOffset();
    // this.selectItemAfterAdded(text);
    this.textString = '';
  }

  // forEachObject: function(callback, context) {
  //   var objects = this.getObjects(),
  //       i = objects.length;
  //   while (i--) {
  //     callback.call(context, objects[i], i, objects);
  //   }
  //   return this;
  // }

  addDimensions() {
    const textString = 'l x w: ' + this._length.toString() + ' x ' + this._width.toString();
    const text = new fabric.IText(textString, {
      left: (this.canvas.width / 2),
      top: (this.canvas.height / 2),
      fontFamily: 'helvetica',
      fontSize: 24,
      angle: 0,
      fill: '#000000',
      scaleX: 1.0,
      scaleY: 1.0,
      fontWeight: 'bold',
      hasRotatingPoint: true,
      hasControls: true,
      selectable: true
    });
    this.extend(text, this.randomId());
    text.left = (this.canvas.width / 2) - ((text.width * this.canvasScale) / 2),
    text.top = (this.canvas.height) - ((text.height * this.canvasScale)),
    this.canvas.add(text);
    this.canvas.requestRenderAll();
    // this.canvas.calcOffset();
    // this.selectItemAfterAdded(text);
    this.textString = '';

  }

  // Block "Add images"
  getImgPolaroid(event: any) {
    const el = event.target;
    fabric.Image.fromURL(el.src, (image) => {
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        // cornersize: 10,
        hasRotatingPoint: true
        // points: 12
      });
      // image.setWidth(150);
      // image.setHeight(150);
      this.extend(image, this.randomId());
      this.canvas.add(image);
      this.selectItemAfterAdded(image);
    });
  }

  // Block "Upload Image"
  addImageOnCanvas(url: any) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          // cornersize: 10,
          hasRotatingPoint: true
        });
        // image.setWidth(200);
        // image.setHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = () => {
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite() {
  }

  // Block "Add figure"

  addFigure(figure: any) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
      case 'ellipse':
        add = new fabric.Ellipse({
          left: 10,
          top: 10,
          originX: 'left',
          originY: 'top',
          rx: 50,
          ry: 30,
          angle: 0,
          fill: '#ff5722',
          stroke: 'black',
          strokeWidth: 1,
          selectable: true
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add).renderAll();
    // this.selectItemAfterAdded(add);
  }


  makeLine(coords: any) {
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false,
      evented: false,
    });
  }



  /*Canvas*/

  cleanSelect() {
    this.canvas.deactivateAllWithDispatch().renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  extend(obj: any, id: any) {
    // tslint:disable-next-line:only-arrow-functions
    obj.toObject = (function(toObject) {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage() {
    const self = this;
    if (this.props.canvasImage) {
      // tslint:disable-next-line:only-arrow-functions
      this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function() {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName: any, object: any) {
    object = object || this.canvas.getActiveObject();
    if (!object) { return ''; }

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }


  setActiveStyle(styleName: string, value: string | number,
                 object: { setSelectionStyles: (arg0: {}) => void; isEditing: any;
    setCoords: { (): void; (): void; }; set: (arg0: any, arg1: any) => void; }) {
    object = object || this.canvas.getActiveObject();
    if (!object) { return; }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    const object = this.canvas.getActiveObject();
    if (!object) { return ''; }

    return object[name] || '';
  }

  setActiveProp(name, value) {
    const object = this.canvas.getActiveObject();
    if (!object) { return; }
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    const activeObject = this.canvas.getActiveObject();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    const val = this.props.id;
    const complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    // tslint:disable-next-line:radix
    this.setActiveStyle('opacity', parseInt(this.props.opacity) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    // tslint:disable-next-line:radix
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }

  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
      iclass += ` ${value}`;
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }


  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/
  removeSelected() {
    const activeObject = this.canvas.getActiveObject();
    // let activeGroup = this.canvas.getActiveGroup();
    if (activeObject) {
      if (confirm('Are you sure?')) {
        this.canvas.remove(activeObject);
      }
    }
    // else if (activeGroup) {
    //   if (confirm('Are you sure?')) {
    //       var objectsInGroup = activeGroup.getObjects();
    //       this.canvas.discardActiveGroup();
    //       objectsInGroup.forEach(function (object) {
    //           this.canvas.remove(object);
    //       });
    //   }
    // }
    this.canvas.renderAll();

  }

  removeSelectedGroup() {
    const activeGroup = this.canvas.getActiveGroup();
    if (activeGroup) {
      const objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      const self = this;
      // tslint:disable-next-line:only-arrow-functions
      objectsInGroup.forEach(function(object) {
        self.canvas.remove(object);
      });
    }
    this.canvas.renderAll();
  }

  bringToFront() {
    // tslint:disable-next-line:one-variable-per-declaration
    const activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.bringToFront();
      // activeObject.opacity = 1;
    } else if (activeGroup) {
      const objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  sendToBack() {
    // tslint:disable-next-line:one-variable-per-declaration
    const activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.sendToBack();
      // activeObject.opacity = 1;
    } else if (activeGroup) {
      const objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }


  // startPan(event) {
  //   if (event.button != 2) {
  //     return;
  //   }
  //   let x0 = event.screenX,
  //       y0 = event.screenY;
  //   function continuePan(event) {
  //     let x = event.screenX,
  //         y = event.screenY;
  //     this.canvas.relativePan({ x: x - x0, y: y - y0 });
  //     x0 = x;
  //     y0 = y;
  //   }
  //   function stopPan(event) {
  //     $(window).off('mousemove', continuePan);
  //     $(window).off('mouseup', stopPan);
  //   };
  //   $(window).mousemove(continuePan);
  //   $(window).mouseup(stopPan);
  //   $(window).contextmenu(this.cancelMenu);
  // };

  // cancelMenu() {
  //   $(window).off('contextmenu', this.cancelMenu);
  //   return false;
  // }
  // $(canvasWrapper).mousedown(startPan);

  b64ToUint8Array(b64Image) {
    const img = atob(b64Image.split(',')[1]);
    // tslint:disable-next-line:variable-name
    const img_buffer = [];
    let i = 0;
    while (i < img.length) {
       img_buffer.push(img.charCodeAt(i));
       i++;
    }
    return new Uint8Array(img_buffer);
 }

  // dataURLtoBlob(dataURL) {
  //   let binary = atob(dataURL.split(',')[1]);
  //   //Create 8-bit unsigned array
  //   let array = [];
  //   let i = 0
  //   while(i < binary.length){
  //     array.push(binary.charCodeAt(i));
  //     i++;
  //   }
  //   //return Blob object
  //   return new Blob([ array ], {type: "image/jpg"}) ;
  // }

  // saveCanvasToJSON() {
  //   let json = JSON.stringify(this.canvas.toJSON());
  //   localStorage.setItem('zcanvas', json);
  //   console.log('json');
  //   console.log(json);

  // }

  // loadCanvasFromJSON() {
  //   let CANVAS = localStorage.getItem('zcanvas');
  //   let CANVAS2 = JSON.parse(CANVAS);
  //   console.log('CANVAS');
  //   console.log(CANVAS);

  //   // and load everything from the same json
  //   this.canvas.loadFromJSON(CANVAS2, () => {
  //     // console.log('CANVAS');
  //     // console.log(CANVAS);

  //     // making sure to render canvas at the end
  //     this.canvas.renderAll();

  //     // and checking if object's "name" is preserved
  //     // console.log('this.canvas.item(0).name');
  //     // console.log(this.canvas);
  //   });

  // };

  rasterizeSVG() {
    console.log(this.canvas.toSVG());
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // console.log(this.canvas.toSVG())
    // let image = new Image();
    // image.src = this.canvas.toSVG()
    const w = window.open('');
    w.document.write(this.canvas.toSVG());
  }

  rasterizeJSON() {
  }

  resetPanels() {
  }

  // Saves Drawing Objects
  rasterize() {
      const img = new Image();
      img.height = 250;
      img.width = 250;
      // This will hold a base64 representation of the image
      // we want a jpeg image but there is a bug in the code
      // so we will convert to jpeg later
      img.src = this.canvas.toDataURL('image/jpg');
      // console.log(this.canvas.toDataURL('jpg'))
      // window.open(this.canvas.toDataURL('png'));
      // let w = window.open("");
      // w.document.write(json);

      const objSitePlanData = JSON.stringify([{
        driveid: this._driveid,
        siteid: this._siteid,
        imageid: this._imageid,
        length: this._length,
        width: this._width,
        imageData: img.src,
        jsonData: this.canvas
      }], null, 2);

      const _json = JSON.stringify(this.canvas, null, 2);
      this.localStorage.set('canvas_siteplan', {
        json: _json
      });

      alert('Layout Saved!');
      // var z = "driveid: " + this._driveid + "\r\n" +
      // "siteid: " + this._siteid + "\r\n" +
      // "imageid: " + this._imageid + "\r\n" +
      // "length: " + this._length + "\r\n" +
      // "width: " + this._width + "\r\n" +
      // "imageData: " + img.src + "\r\n" +
      // "jsonData: " + this.canvas
      // alert(z);

      // Save Drawing Objects!
      // this.spObservableService
      //   .putSitePlanImage(objSitePlanData, this._appid, this._action, this._imageid)
      //   .subscribe(
      //       data => {
      //         // this.loading = false;
      //         console.log('POST Request is successful ', data);
      //         this._action = 'edit';
      //         alert('Layout Saved!');
      //       },
      //       error => {
      //         // this.loading = false;
      //         console.log('Error', error);
      //       }
      // );
  }

  rasterize2() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
      const img = new Image();
      img.height = 250;
      img.width = 250;
      img.src = this.canvas.toDataURL('image/jpg');

      const objSitePlanData = JSON.stringify([{
        driveid: this._driveid,
        siteid: this._siteid,
        length: this._length,
        width: this._width,
        imageData: img.src,
        jsonData: this.canvas
      }], null, 2);

      $.ajax({
        url: '/DrawingLayout.ashx?action=save&rnd=' + this.getRandomInt(1, 500),
        type: 'POST',
        data: objSitePlanData,
        // processData: false,
        cache: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // or null
        beforeSend() {
            // Doing some loading gif stuff
        },
        error() {
            // alert(result.responseText);
            alert('Layout NOT Saved!');
        },
        success() {
          alert('Layout Saved!');
          // result ? alert("It worked!") : alert("It didn't work.");
          // var message = result.Message;
          // //$("#resultMessage").html(message);
          // alert(message);
          // element is div holding the ParticalView
          // $(element).html(result);
        },
        complete() {
            // $.validator.unobtrusive.parse('form');
            // And so on.
        }
      });
      return false;
    }
  }

  getJsonCanvasFromMVC() {

    // this.spObservableService
    //   .getSitePlanJson(this._driveid, this._siteid, this._appid, this._imageid)
    //   .subscribe(
    //     (res) => {
    //       // this.loading = false;
    //       if (res) {
    //         // alert('getJsonCanvasFromMVC Success!');
    //         this.canvas.loadFromJSON(res);
    //         // this.addTitle();
    //         // this.canvas.forEachObject(function(object) {
    //         //   if(object.text) {
    //         //     if (object.text.match(/^dragdrop_/)) {
    //         //       bAddDragDrop = false;
    //         //     }
    //         //   }
    //         // });
    //         // if(bAddDragDrop){
    //         //   this.addDragDropText();
    //         // }
    //         // this.drawBackgroudGraphPaper();
    //       } else {
    //         // this.getDefaultCanvas();
    //       }
    //     },
    //     () => {
    //       // this.loading = false;
    //       // this.getDefaultCanvas();
    //     },
    // );
    return;
  }

  // Use this to setup default objects
  getDefaultCanvas() {
    // this.addImage("p_electrical_panel.png", "top_left");
    // this.addImage("p_doorway.png", "top_center");
    // this.addImage("p_health_history.png", "top_right");

    // this.addImage("p_electrical_outlet.png", "middle_left");
    // //this.addImage("p_bed.png", "middle_center");
    // this.addImage("p_windows.png", "middle_right");

    // this.addImage("p_supervisor_table.png", "bottom_left");
    // //this.addImage("p_donor_bed.png", "bottom_center");
    // this.addImage("p_canteen.png", "bottom_right");

    // if ((this._length.length > 0) && (this._length > 0)) {
    //   // let _dimensions = this._length.toString() + " x " + this._width.toString();
    //   this.addDimensions();
    // }

    // this.addDragDropText();
  }

  saveCanvas() {
    // event.preventDefault();
    // $('#panel_controls').panel('close');
    const _json = JSON.stringify(this.canvas, null, 2);
    console.log(_json);
    this.localStorage.set('canvas_siteplan', {
      json: _json
    });
  }

  loadCanvas() {
    // event.preventDefault();
    // $('#panel_controls').panel('close');
    const g = this.localStorage.get('canvas_siteplan');
    if (g) {
      // alert(g.json.length);
      console.log(g.json);
      this.canvas.loadFromJSON(g.json);
    }
  }

  getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'United States'
    address = address || 'United States';
    // Initialize the Geocoder
    const geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            address
        }, function(results: any[], status: any) {
            if (status === google.maps.GeocoderStatus.OK) {
              //////////////////////////////////////////////////////////////
              // results[0]
              // document.getElementById('latitude').value = result.geometry.location.lat();
              // document.getElementById('longitude').value = result.geometry.location.lng();
              const _lat = results[0].geometry.location.lat();
              const _lng = results[0].geometry.location.lng();
              const textString = 'lat: ' + _lat + '\r\n_lng: ' + _lng;
              const text = new fabric.IText(textString, {
                left: (this.canvas.width / 2),
                top: (this.canvas.height / 2),
                fontFamily: 'helvetica',
                fontSize: 12,
                angle: 0,
                fill: '#000000',
                scaleX: 1.0,
                scaleY: 1.0,
                fontWeight: 'bold',
                hasRotatingPoint: true,
                hasControls: true,
                selectable: true
              });
              this.extend(text, this.randomId());
              text.left = (this.canvas.width / 2) - ((text.width * this.canvasScale) / 2);
              text.top = (this.canvas.height / 2) - ((text.height * this.canvasScale) / 2);
              this.canvas.add(text);
              this.canvas.requestRenderAll();
              // this.canvas.calcOffset();
              // this.selectItemAfterAdded(text);
              this.textString = '';
              ////////////////////////////////////////////////////////////
              callback(results[0]);
            }
        });
    }
  }



  // function Addpolygon() {
  //   startDrawingPolygon = true;
  // }


  ngOnDestroy(): void {
    if (this.sub != null) {
        this.sub.unsubscribe();
    }
    if (this.sub2 != null) {
      this.sub2.unsubscribe();
    }
    // Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
    // clicks a link which takes him/her to a different page within the app.
    clearAllBodyScrollLocks();
  }

}
