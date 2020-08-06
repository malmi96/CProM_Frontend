import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialViewPaymentsComponent } from './material-view-payments.component';

describe('MaterialViewPaymentsComponent', () => {
  let component: MaterialViewPaymentsComponent;
  let fixture: ComponentFixture<MaterialViewPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialViewPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialViewPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
