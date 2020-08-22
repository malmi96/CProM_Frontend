import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMaterialconsumptionChartComponent } from './total-materialconsumption-chart.component';

describe('TotalMaterialconsumptionChartComponent', () => {
  let component: TotalMaterialconsumptionChartComponent;
  let fixture: ComponentFixture<TotalMaterialconsumptionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalMaterialconsumptionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalMaterialconsumptionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
