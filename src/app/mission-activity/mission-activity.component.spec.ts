import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionActivityComponent } from './mission-activity.component';

describe('MissionActivityComponent', () => {
  let component: MissionActivityComponent;
  let fixture: ComponentFixture<MissionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
