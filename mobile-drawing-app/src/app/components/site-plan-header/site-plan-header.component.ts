  import { Component, OnInit } from '@angular/core';
  import { Injectable, ElementRef, ViewChild } from '@angular/core';
  import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
  import { LocalStorageService } from '../../services/local-storage.service';
  import { Config } from '../../services/config.service';
  import { MessageService } from '../../services/message.service';

  // declare var TagCanvas: any;
  declare var jQuery: any;
  declare var $: any;

  @Component({
    selector: 'app-site-plan-header',
    templateUrl: './site-plan-header.component.html',
    styleUrls: ['./site-plan-header.component.scss', './site-plan-header.component.css']
  })
  export class SitePlanHeaderComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    public _logo = Config.APP_LOGO;
    private sub2: any;
    private message: any;
    // elementRef: ElementRef;
    // @ViewChild('swipeCanvas') swipeCanvas: ElementRef;

    constructor(
      private localStorage: LocalStorageService,
      private router: Router,
      private messageService: MessageService) {
      this._logo = Config.APP_LOGO;
    }

    ngOnInit() {

    }

    cloudRoutes(event, categoryRef: string) {
      event.preventDefault();
    }

    nextCloud(event) {
      event.preventDefault();
      $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('delete');
    }

    saveImage(event) {
      // $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('save');
      event.preventDefault();
    }

    goBack2App(event) {
      // $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('back2app');
      event.preventDefault();
    }

    deleteImage(event) {
      // alert("Eureka!");
      // $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('delete');
      event.preventDefault();
    }

    nextBackground(event) {
      event.preventDefault();
      $('[data-role=panel]').panel('close');
      this.messageService.sendMessage('save');
      // $('#panel_controls').panel('close');
      // const g = this.localStorage.get('settings_swipeclouds');
      // if (g) {
      //     if (g.bgimage + 1 < Config.DATA_BACKGROUNDS.length) { g.bgimage = g.bgimage + 1; } else { g.bgimage = 0; }
      //     this.localStorage.set('settings_swipeclouds', g);
      //     document.getElementById('swipeCanvas').style.backgroundColor = '#000000';
      //     document.getElementById('swipeCanvas').style.backgroundImage = 'url(./assets/img_bg/'
      //     + Config.DATA_BACKGROUNDS[g.bgimage] + ')';
      //     document.getElementById('swipeCanvas').style.backgroundSize = 'cover';
      // }
      // this.cloudsheaderrouter.navigate(['/blank']);
      // setTimeout( () => {
      //     this.cloudsheaderrouter.navigate(['/swipeclouds', {action: 'nextbackground', actionid: g.bgimage }]);
      // }, 1);
    }

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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

  }




