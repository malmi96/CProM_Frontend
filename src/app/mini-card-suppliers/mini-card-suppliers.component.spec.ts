import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardSuppliersComponent } from './mini-card-suppliers.component';

describe('MiniCardSuppliersComponent', () => {
  let component: MiniCardSuppliersComponent;
  let fixture: ComponentFixture<MiniCardSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCardSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCardSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
