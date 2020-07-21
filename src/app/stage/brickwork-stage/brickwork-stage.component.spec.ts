import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickworkStageComponent } from './brickwork-stage.component';

describe('BrickworkStageComponent', () => {
  let component: BrickworkStageComponent;
  let fixture: ComponentFixture<BrickworkStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickworkStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickworkStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
