import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

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
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      {
        path: "users/user-form",
        component: UserFormComponent
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "activities",
        component: ActivitiesComponent
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
