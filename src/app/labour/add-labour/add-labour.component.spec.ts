import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabourComponent } from './add-labour.component';

describe('AddLabourComponent', () => {
  let component: AddLabourComponent;
  let fixture: ComponentFixture<AddLabourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
