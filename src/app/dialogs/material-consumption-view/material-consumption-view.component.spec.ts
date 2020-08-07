import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialConsumptionViewComponent } from './material-consumption-view.component';

describe('MaterialConsumptionViewComponent', () => {
  let component: MaterialConsumptionViewComponent;
  let fixture: ComponentFixture<MaterialConsumptionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialConsumptionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialConsumptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
