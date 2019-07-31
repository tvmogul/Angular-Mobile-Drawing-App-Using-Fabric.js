import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePlanHeaderComponent } from './site-plan-header.component';

describe('SitePlanHeaderComponent', () => {
  let component: SitePlanHeaderComponent;
  let fixture: ComponentFixture<SitePlanHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitePlanHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePlanHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
