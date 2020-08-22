import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProgressChartComponent } from './customer-progress-chart.component';

describe('CustomerProgressChartComponent', () => {
  let component: CustomerProgressChartComponent;
  let fixture: ComponentFixture<CustomerProgressChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProgressChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
