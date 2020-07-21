import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPaymentsComponent } from './material-payments.component';

describe('MaterialPaymentsComponent', () => {
  let component: MaterialPaymentsComponent;
  let fixture: ComponentFixture<MaterialPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
