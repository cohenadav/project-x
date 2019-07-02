import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMissionFormComponent } from './edit-mission-form.component';

describe('EditMissionFormComponent', () => {
  let component: EditMissionFormComponent;
  let fixture: ComponentFixture<EditMissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
