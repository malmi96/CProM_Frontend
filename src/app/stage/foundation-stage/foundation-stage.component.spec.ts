import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationStageComponent } from './foundation-stage.component';

describe('FoundationStageComponent', () => {
  let component: FoundationStageComponent;
  let fixture: ComponentFixture<FoundationStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundationStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
