import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAllocationViewComponent } from './material-allocation-view.component';

describe('MaterialAllocationViewComponent', () => {
  let component: MaterialAllocationViewComponent;
  let fixture: ComponentFixture<MaterialAllocationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialAllocationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialAllocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
