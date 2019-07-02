import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityFormComponent } from './edit-activity-form.component';

describe('EditActivityFormComponent', () => {
  let component: EditActivityFormComponent;
  let fixture: ComponentFixture<EditActivityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
