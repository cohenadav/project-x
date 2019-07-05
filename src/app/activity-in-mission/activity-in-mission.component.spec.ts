import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInMissionComponent } from './activity-in-mission.component';

describe('ActivityInMissionComponent', () => {
  let component: ActivityInMissionComponent;
  let fixture: ComponentFixture<ActivityInMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityInMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityInMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
