import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionByMaterialComponent } from './consumption-by-material.component';

describe('ConsumptionByMaterialComponent', () => {
  let component: ConsumptionByMaterialComponent;
  let fixture: ComponentFixture<ConsumptionByMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionByMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionByMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
