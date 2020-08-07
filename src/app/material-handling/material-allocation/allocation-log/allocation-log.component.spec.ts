import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationLogComponent } from './allocation-log.component';

describe('AllocationLogComponent', () => {
  let component: AllocationLogComponent;
  let fixture: ComponentFixture<AllocationLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
