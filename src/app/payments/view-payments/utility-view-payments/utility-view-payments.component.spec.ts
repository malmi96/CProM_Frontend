import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityViewPaymentsComponent } from './utility-view-payments.component';

describe('UtilityViewPaymentsComponent', () => {
  let component: UtilityViewPaymentsComponent;
  let fixture: ComponentFixture<UtilityViewPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityViewPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityViewPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
