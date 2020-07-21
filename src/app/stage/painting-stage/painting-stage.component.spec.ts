import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingStageComponent } from './painting-stage.component';

describe('PaintingStageComponent', () => {
  let component: PaintingStageComponent;
  let fixture: ComponentFixture<PaintingStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
