import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPaymentsComponent } from './labour-payments.component';

describe('LabourPaymentsComponent', () => {
  let component: LabourPaymentsComponent;
  let fixture: ComponentFixture<LabourPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
