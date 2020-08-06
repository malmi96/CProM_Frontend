import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryViewPaymentsComponent } from './machinery-view-payments.component';

describe('MachineryViewPaymentsComponent', () => {
  let component: MachineryViewPaymentsComponent;
  let fixture: ComponentFixture<MachineryViewPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryViewPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryViewPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
