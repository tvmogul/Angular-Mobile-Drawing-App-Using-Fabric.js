import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePlanComponent } from './site-plan.component';

describe('SitePlanComponent', () => {
  let component: SitePlanComponent;
  let fixture: ComponentFixture<SitePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
