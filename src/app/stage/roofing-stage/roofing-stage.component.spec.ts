import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoofingStageComponent } from './roofing-stage.component';

describe('RoofingStageComponent', () => {
  let component: RoofingStageComponent;
  let fixture: ComponentFixture<RoofingStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoofingStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoofingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
