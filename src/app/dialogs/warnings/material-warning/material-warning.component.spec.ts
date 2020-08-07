import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialWarningComponent } from './material-warning.component';

describe('MaterialWarningComponent', () => {
  let component: MaterialWarningComponent;
  let fixture: ComponentFixture<MaterialWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
