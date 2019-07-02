import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificMissionActivityComponent } from './specific-mission-activity.component';

describe('SpecificMissionActivityComponent', () => {
  let component: SpecificMissionActivityComponent;
  let fixture: ComponentFixture<SpecificMissionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificMissionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificMissionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
