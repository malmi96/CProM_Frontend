import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryPaymentsComponent } from './machinery-payments.component';

describe('MachineryPaymentsComponent', () => {
  let component: MachineryPaymentsComponent;
  let fixture: ComponentFixture<MachineryPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
