import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardCustomersComponent } from './mini-card-customers.component';

describe('MiniCardCustomersComponent', () => {
  let component: MiniCardCustomersComponent;
  let fixture: ComponentFixture<MiniCardCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCardCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCardCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
