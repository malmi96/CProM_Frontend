import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryEditPaymentComponent } from './machinery-edit-payment.component';

describe('MachineryEditPaymentComponent', () => {
  let component: MachineryEditPaymentComponent;
  let fixture: ComponentFixture<MachineryEditPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryEditPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryEditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
