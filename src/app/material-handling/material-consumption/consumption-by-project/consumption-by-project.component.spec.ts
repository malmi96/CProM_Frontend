import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionByProjectComponent } from './consumption-by-project.component';

describe('ConsumptionByProjectComponent', () => {
  let component: ConsumptionByProjectComponent;
  let fixture: ComponentFixture<ConsumptionByProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionByProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
