import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectDuplicateComponent } from './view-project-duplicate.component';

describe('ViewProjectDuplicateComponent', () => {
  let component: ViewProjectDuplicateComponent;
  let fixture: ComponentFixture<ViewProjectDuplicateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectDuplicateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
