import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPaymentsChartComponent } from './total-payments-chart.component';

describe('TotalPaymentsChartComponent', () => {
  let component: TotalPaymentsChartComponent;
  let fixture: ComponentFixture<TotalPaymentsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPaymentsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPaymentsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
