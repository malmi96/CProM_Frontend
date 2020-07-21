import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPaymentsComponent } from './tools-payments.component';

describe('ToolsPaymentsComponent', () => {
  let component: ToolsPaymentsComponent;
  let fixture: ComponentFixture<ToolsPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
