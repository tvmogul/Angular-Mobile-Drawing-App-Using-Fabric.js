import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [`
      .dialog {
        min-height: 200px !important;
        width: 280px !important;
        position: absolute;
        border: 1px solid black;
        border-radius: 5px;
        overflow: hidden;
        position: fixed;
        // left: calc(50% - 125px);
        left: 0px !important;
        top: 100px;
        color: #222;
        background: rgba(255, 255, 255, 0.6);
      }
      .dialog p {
        text-align: center;
        font-size: 1.2em;
        padding: 5px;
        display: flex;
      }
      .dialog header {
        border-bottom: 1px solid black;
        font-size: 1.4em;
        padding: 5px;
        display: flex;
        color: #222;
        text-shadow: 0px 2px 3px #555;
      }
      .dialog header .title {
        flex-grow: 1;
        cursor: default;
      }
      .dialog header .exit-button {
        cursor: pointer;
        padding: 0 5px;
      }
      .dialog #scontent {
        overflow-y: auto !important;
        overflow-x: hidden !important;
        padding: 4px !important;
      }
  `]
})

export class DialogComponent implements OnInit {
  @ViewChild('dataContainer', null) dataContainer: ElementRef;

  close = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }


  onClickedExit() {
      this.close.emit('event');
  }

  public loadData(data) {
    // [innerHtml] removes styling hard-coded in the Html.
    // This approah leaves styling intact!
    this.dataContainer.nativeElement.innerHTML = data;
  }

}

