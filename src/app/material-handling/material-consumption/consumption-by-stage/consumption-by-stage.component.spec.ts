import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionByStageComponent } from './consumption-by-stage.component';

describe('ConsumptionByStageComponent', () => {
  let component: ConsumptionByStageComponent;
  let fixture: ComponentFixture<ConsumptionByStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionByStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionByStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
