import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewPaymentsComponent } from './customer-view-payments.component';

describe('CustomerViewPaymentsComponent', () => {
  let component: CustomerViewPaymentsComponent;
  let fixture: ComponentFixture<CustomerViewPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
