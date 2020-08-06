import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityEditPaymentComponent } from './utility-edit-payment.component';

describe('UtilityEditPaymentComponent', () => {
  let component: UtilityEditPaymentComponent;
  let fixture: ComponentFixture<UtilityEditPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityEditPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityEditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
