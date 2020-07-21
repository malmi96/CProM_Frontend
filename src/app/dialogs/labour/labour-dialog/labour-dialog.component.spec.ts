import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourDialogComponent } from './labour-dialog.component';

describe('LabourDialogComponent', () => {
  let component: LabourDialogComponent;
  let fixture: ComponentFixture<LabourDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
