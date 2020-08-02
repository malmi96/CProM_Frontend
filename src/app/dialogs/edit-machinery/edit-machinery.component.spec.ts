import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMachineryComponent } from './edit-machinery.component';

describe('EditMachineryComponent', () => {
  let component: EditMachineryComponent;
  let fixture: ComponentFixture<EditMachineryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMachineryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMachineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
