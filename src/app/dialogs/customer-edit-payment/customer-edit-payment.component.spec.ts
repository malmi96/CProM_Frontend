import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditPaymentComponent } from './customer-edit-payment.component';

describe('CustomerEditPaymentComponent', () => {
  let component: CustomerEditPaymentComponent;
  let fixture: ComponentFixture<CustomerEditPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEditPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
