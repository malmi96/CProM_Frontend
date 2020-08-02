import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryTypeComponent } from './machinery-type.component';

describe('MachineryTypeComponent', () => {
  let component: MachineryTypeComponent;
  let fixture: ComponentFixture<MachineryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
