import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabourComponent } from './view-labour.component';

describe('ViewLabourComponent', () => {
  let component: ViewLabourComponent;
  let fixture: ComponentFixture<ViewLabourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLabourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLabourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
