import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMachineryComponent } from './view-machinery.component';

describe('ViewMachineryComponent', () => {
  let component: ViewMachineryComponent;
  let fixture: ComponentFixture<ViewMachineryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMachineryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMachineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
