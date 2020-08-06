import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourViewPaymentsComponent } from './labour-view-payments.component';

describe('LabourViewPaymentsComponent', () => {
  let component: LabourViewPaymentsComponent;
  let fixture: ComponentFixture<LabourViewPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourViewPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourViewPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
