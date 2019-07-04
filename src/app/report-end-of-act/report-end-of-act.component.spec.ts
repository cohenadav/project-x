import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEndOfActComponent } from './report-end-of-act.component';

describe('ReportEndOfActComponent', () => {
  let component: ReportEndOfActComponent;
  let fixture: ComponentFixture<ReportEndOfActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEndOfActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEndOfActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
