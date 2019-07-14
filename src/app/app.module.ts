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
import { DatePipe } from '@angular/common';
import { ReportEndOfActComponent } from './report-end-of-act/report-end-of-act.component';
import { ActivityInMissionComponent } from './activity-in-mission/activity-in-mission.component'
import { LoginComponent } from './login/login.component';
import { MyMissionsComponent } from './my-missions/my-missions.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import {AuthGuardService} from './auth.service';
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
    SpecificMissionActivityComponent,
    ReportEndOfActComponent,
    ActivityInMissionComponent,
    LoginComponent,
    MyMissionsComponent,
    PersonalInfoComponent
    ,AppComponent
  ],
  imports: [
    // NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, canActivate:[AuthGuardService] },
      {
        path: "personalInfo",
        component: PersonalInfoComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: "my-missions",
        component: MyMissionsComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "users/user-form",
        component: UserFormComponent,
        canActivate:[AuthGuardService]
      },

      {path: "users/:UserID",
      component: EditUserFormComponent,
      canActivate:[AuthGuardService]
      },

      {
        path: "users",
        component: UsersComponent,
        canActivate:[AuthGuardService]
      },

      {
        path: "activities/activity-form",
        component: ActivityFormComponent,
        canActivate:[AuthGuardService]
      },

      {path: "activities/:ActivityID",
      component: EditActivityFormComponent,
      canActivate:[AuthGuardService]
      },
      {
        path: "activities",
        component: ActivitiesComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: "missions/:missionID/mission-form/edit",
        component: EditMissionFormComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: "missions/:missionID/add-Activity",
        component: SpecificMissionActivityComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: "missions/:missionID/:MA_ID",
        component: ActivityInMissionComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: "missions/:missionID/Report/:MA_ID",
        component: ReportEndOfActComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: "missions/mission-form",
        component: MissionFormComponent,
        canActivate:[AuthGuardService]
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
        path: "missions/:missionID",
        component: MissionActivityComponent,
        canActivate:[AuthGuardService]
      },


      {
        path: "missions",
        component: MissionsComponent,
        canActivate:[AuthGuardService]
      },

      {
        path: "**",
        component: NotFoundComponent,
        canActivate:[AuthGuardService]
      }
    ])
  ],
  providers: [DatePipe, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
