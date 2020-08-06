import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourEditPaymentComponent } from './labour-edit-payment.component';

describe('LabourEditPaymentComponent', () => {
  let component: LabourEditPaymentComponent;
  let fixture: ComponentFixture<LabourEditPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourEditPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourEditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
