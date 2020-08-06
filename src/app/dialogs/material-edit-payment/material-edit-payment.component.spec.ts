import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEditPaymentComponent } from './material-edit-payment.component';

describe('MaterialEditPaymentComponent', () => {
  let component: MaterialEditPaymentComponent;
  let fixture: ComponentFixture<MaterialEditPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialEditPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialEditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
