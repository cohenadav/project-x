import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ResourcesComponent } from "./resources/resources.component";
import { BodyComponent } from "./body/body.component";
import { RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { MissionsComponent } from "./missions/missions.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { TableComponent } from "./table/table.component";
import { ButtonsComponent } from "./buttons/buttons.component";
import { UserFormComponent } from "./users/user-form/user-form.component";
import { HttpClientModule } from "@angular/common/http";
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MissionActivityComponent } from './mission-activity/mission-activity.component';
import { EditActivityFormComponent } from './edit-activity-form/edit-activity-form.component';
import { EditMissionFormComponent } from './edit-mission-form/edit-mission-form.component';
import { SpecificMissionActivityComponent } from './specific-mission-activity/specific-mission-activity.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResourcesComponent,
    BodyComponent,
    UsersComponent,
    ActivitiesComponent,
    MissionsComponent,
    HomeComponent,
    NotFoundComponent,
    TableComponent,
    ButtonsComponent,
    UserFormComponent,
    EditUserFormComponent,
    ActivityFormComponent,
    MissionFormComponent,
    MissionActivityComponent,
    EditActivityFormComponent,
    EditMissionFormComponent,
    SpecificMissionActivityComponent
  ],
  imports: [
    // NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      {
        path: "users/user-form",
        component: UserFormComponent
      },

      {path: "users/:UserID",
      component: EditUserFormComponent
      },

      {
        path: "users",
        component: UsersComponent
      },

      {
        path: "activities/activity-form",
        component: ActivityFormComponent
      },

      {path: "activities/:ActivityID",
      component: EditActivityFormComponent
      },
      {
        path: "activities",
        component: ActivitiesComponent
      },
      {
        path: "missions/mission-form",
        component: MissionFormComponent
      },
      {
        path: "missions/:missionID/mission-form",
        component: EditMissionFormComponent
      },
      // {
      //   path: "missions/:missionID/:missionActivityID/missionActivity-form",
      //   component: SpecificMissionActivityComponent
      // },
      // {
      //   path: "missions/:missionID/missionActivity-form",
      //   component: 
      // },

      {
        path: "missions/:missionID/:missionActivityID",
        component: SpecificMissionActivityComponent
      },

      {
        path: "missions/:missionID",
        component: MissionActivityComponent
      },


      {
        path: "missions",
        component: MissionsComponent
      },

      {
        path: "**",
        component: NotFoundComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
