import { Output, EventEmitter } from '@angular/core';

export class Config {
  // ///////////////////////////////////////////////////////
  // Set here whether you are using local or remote service!
  // ///////////////////////////////////////////////////////
  // static DATA_SOURCE = 'localjson'; // remotejsonp
  static DATA_SOURCE = 'remotejsonp'; // remotejsonp
  /////////////////////////////////////////////////////////////////////////////////
  // If you use 'remotejsonp' then you MUST set JSONP_DOMAIN1 to a JSONP Server !!!
  static JSONP_DOMAIN1 = 'http://{YOUR_WEBSITE}/{YOUR_HANDLER.ashx}?';
  /////////////////////////////////////////////////////////////////////////////////

  static MAIN_COPYRIGHT = '';
  // 'h_dronestv.png';  // 'h_beauty_mall.png';  // h_beauty_mall.png';  // 24sevensales.png';
  static APP_LOGO = 'h_redcrapet.png';
  // static APP_LOGO: Array<string> = [
  //     'swipeclouds.png',
  //     'wildworkout.png',
  //     'dronestv.png',
  // ];

  static MOVIE_CATEGORIES: Array<string> = [
  // <select name="singleSelect" id="singleSelect" ng-model="feed.moviecategory" class="ng-pristine ng-valid ng-touched">
  'All',
  'Action',
  'Animation',
  'Classics',
  'Comedy',
  'Cult',
  'Drama',
  'Documentary',
  'General',
  'Horror',
  'International',
  'KidsFamily',
  'Mystery',
  'Musical',
  'Romance',
  'SciFi',
  'SpecialInterest',
  'TimeTravel',
  'Western'
  ];

  static METHODS: any = {
    fn_route:     'fn_route',
    fn_cloud:     'fn_cloud',
    fn_cordova:   'fn_cordova',
    fn_videos:    'fn_videos',
    fn_solutions: 'fn_solutions',
    fn_myvideos:  'fn_myvideos',
    fn_rss:       'fn_rss',
    fn_rssfeed:   'fn_rssfeed',
    fn_window:    'fn_window',
    fn_browser:   'fn_browser',
    fn_userdata:  'fn_userdata',
    fn_dialog:    'fn_dialog',
    fn_pumpkins:  'fn_pumpkins'
  };

  static gradients = [{
    0:   'red',            // red
    0.5: 'orange',         // orange
    1:   'rgba(0,0,0,0.1)' // black, but 90% transparent
   }, {
    0:   '#000',           // black
    1:   '#fff'            // white
   }];
  //  TagCanvas.weightGradient = gradients;


  static MYCOLORS: Array<string> = [
    '#f00',
    '#f0f',
    '#ff0',
    '#0f0',
    '#0ff',
    '#00f',
    '#f80',
    '#f08',
    '#f88',
    '#8f0',
    '#08f'
  ];

  static ITEM_DATA: any = [
    {
        image: 'a_text.png',
        title: 'Text',
        abbr: 'Aa',
        scale: '0.4'
    },
    {
      image: 'a_circle.png',
      title: 'Circle',
      abbr: 'CIR',
      scale: '0.6'
    },
    {
      image: 'a_ellipse.png',
      title: 'Ellipse',
      abbr: 'ELP',
      scale: '0.6'
    },
    {
      image: 'a_square.png',
      title: 'Square',
      abbr: 'SQR ',
      scale: '0.6'
    },
    // {
    //   image: 'a_polygon.png',
    //   title: 'Polygon',
    //   abbr: 'POL ',
    //   scale: '0.6'
    // },
    // {
    //   image: 'a_polygonclose.png',
    //   title: 'PolygonClose',
    //   abbr: 'POC ',
    //   scale: '0.6'
    // },
    {
      image: 'a_hline.png',
      title: 'Horizontal Line',
      abbr: 'HLINE',
      scale: '0.9'
    },
    {
      image: 'a_vline.png',
      title: 'Vertical Line',
      abbr: 'VLINE',
      scale: '0.9'
    },
    {
      image: 'a_electrical_outlet.png',
      title: 'Electrical Outlet',
      abbr: 'EO',
      scale: '0.4'
    },
    {
      image: 'a_doorway.png',
      title: 'Doorway',
      abbr: 'DW',
      scale: '0.6'
    },
    {
      image: 'a_windows.png',
      title: 'Windows',
      abbr: 'WW',
      scale: '.5'
    },
    {
      image: 'a_fire_exstinguisher.png',
      title: 'Fire Extinguisher',
      abbr: 'FE',
      scale: '0.4'
    },
    {
      image: 'a_fire_alarm.png',
      title: 'Fire Alarm',
      abbr: 'FA',
      scale: '0.4'
    },
    {
      image: 'a_electrical_panel.png',
      title: 'Electrical Panel',
      abbr: 'EP',
      scale: '0.4'
    },
    {
      image: 'a_desk.png',
      title: 'Desk',
      abbr: 'RD',
      scale: '.6'
    }
];

  @Output()
  uploaded: EventEmitter<string> = new EventEmitter();

  uploadComplete() {
      this.uploaded.emit('complete');
  }

}































