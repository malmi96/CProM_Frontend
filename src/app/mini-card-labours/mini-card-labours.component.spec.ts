import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardLaboursComponent } from './mini-card-labours.component';

describe('MiniCardLaboursComponent', () => {
  let component: MiniCardLaboursComponent;
  let fixture: ComponentFixture<MiniCardLaboursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCardLaboursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCardLaboursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
