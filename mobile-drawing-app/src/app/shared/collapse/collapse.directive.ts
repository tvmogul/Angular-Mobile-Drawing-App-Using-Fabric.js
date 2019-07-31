import { Directive, Input, HostBinding, ElementRef } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Directive({
  selector: '[appCollapse]'
})
export class CollapseDirective {

  // @HostBinding('class.collapsing')
  // private isCollapsing: boolean;

  // // style
  // @HostBinding('style.height')
  // private height: string;

  // @Input()
  // private set appCollapse(value: boolean) {
  //   if (value !== undefined) {
  //     if (value) {
  //       this.hide();
  //     }else {
  //       this.show();
  //     }
  //   }
  // }
  // constructor(public el: ElementRef) {
  //   this.measureHeight();
  // }

  // measureHeight() {
  //   const elem = this.el.nativeElement;
  //   // lets be sure the element has display:block style
  //   elem.className = elem.className.replace('collapsing', '');
  //   this.h = elem.scrollHeight;
  // }
  // hide() {
  //   this.height = this.h + 'px';
  //   setTimeout(() => {
  //       this.height = 0 + 'px';
  //       this.isCollapsing = true; // apply 'collapsing' class
  //   }, 1);
  // }
  // show() {
  //   this.height = 0 + 'px';
  //   setTimeout(() => {
  //       this.height = this.h + 'px';
  //       this.isCollapsing = true; // apply 'collapsing' class
  //   }, 1);
  // }

    // style
    @HostBinding('style.height')
    private height: string;
    // shown
    @HostBinding('class.in')
    @HostBinding('attr.aria-expanded')
    private isExpanded = true;
    // hidden
    @HostBinding('attr.aria-hidden')
    private isCollapsed = false;
    // stale state
    @HostBinding('class.collapse')
    private isCollapse = true;
    // animation state
    @HostBinding('class.collapsing')
    private isCollapsing = false;

    @Input()
    public appCollapse: any;

    @Input()
    private set collapse(value: boolean) {
        this.isExpanded = value;
        this.toggle();
    }

    private get collapse(): boolean {
        return this.isExpanded;
    }

    constructor() {
    }

    toggle() {
        if (this.isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    hide() {
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        setTimeout(() => {
            this.height = 0 + 'px';
            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }

    show() {
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        setTimeout(() => {
            this.height = 'auto';
            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }
}
