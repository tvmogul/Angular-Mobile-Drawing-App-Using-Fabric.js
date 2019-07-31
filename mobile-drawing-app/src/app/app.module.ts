import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import {
  HttpClientModule,
  HttpClientJsonpModule
} from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { AppComponent } from './app.component';

import { LocalStorageService } from './services/local-storage.service';
import { MessageService } from './services/message.service';
import { WindowService } from './services/window.service';
import { DataObservableService } from './services/data-observable.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogAnchorDirective } from './shared/dialog/dialog-anchor.directive';
import { FilterByPipe } from './shared/pipes/array/filter-by.pipe';
import { UniquePipe } from './shared/pipes/array/unique.pipe';
import { OrderByPipe } from './shared/pipes/array/order-by.pipe';
import { Html2TextPipe } from './shared/pipes/string/html2-text.pipe';
import { SafeHtmlPipe } from './shared/pipes/string/safe-html.pipe';
import { TruncatePipe } from './shared/pipes/string/truncate.pipe';
import { DragScrollDirective } from './shared/drag-scroll/drag-scroll.directive';
import { CollapseDirective } from './shared/collapse/collapse.directive';
import { SitePlanComponent } from './components/site-plan/site-plan.component';
import { SitePlanHeaderComponent } from './components/site-plan-header/site-plan-header.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DialogComponent,
    DialogAnchorDirective,
    FilterByPipe,
    UniquePipe,
    OrderByPipe,
    Html2TextPipe,
    SafeHtmlPipe,
    TruncatePipe,
    DragScrollDirective,
    CollapseDirective,
    SitePlanComponent,
    SitePlanHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    IonRangeSliderModule
  ],
  providers: [LocalStorageService,
              MessageService,
              WindowService,
              DataObservableService],
  bootstrap: [AppComponent]
})
export class AppModule { }


