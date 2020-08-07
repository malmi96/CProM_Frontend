import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionLogComponent } from './consumption-log.component';

describe('ConsumptionLogComponent', () => {
  let component: ConsumptionLogComponent;
  let fixture: ComponentFixture<ConsumptionLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
