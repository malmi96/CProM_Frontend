import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAddDialogComponent } from './data-add-dialog.component';

describe('DataAddDialogComponent', () => {
  let component: DataAddDialogComponent;
  let fixture: ComponentFixture<DataAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
