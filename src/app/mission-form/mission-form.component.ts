import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from '../body/body.component';
let data: any;

@Injectable()
@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {
  public missionFormData: any = data;
  public errors = {};
  public matDatepicker;
  public numberOfRoles = [0,1,2,3,4];
  public roles = ['commander', 'agent', 'sucker', 'fucker'];
  public allUsers;
  

  public UMR1: userMissionRole;
  public UMR2: userMissionRole;
  public UMR3: userMissionRole;
  public UMR4: userMissionRole;
  public UMR5: userMissionRole;
  
  public usersRoles = [];

  constructor(private http: HttpClient) {

    this.UMR1 = {
      UserID: "",
      Role: ""
    }
    this.UMR2 = {
      UserID: "",
      Role:""
    }
    this.UMR3 = {
      UserID: "",
      Role:""
    }
    this.UMR4 = {
      UserID: "",
      Role:""
    }
    this.UMR5 = {
      UserID: "",
      Role:""
    }
    this.usersRoles = [this.UMR1,this.UMR2,this.UMR3,this.UMR4,this.UMR5];
  }

  ngOnInit() {

    this.getAllUsers();
    console.log(this.usersRoles);

  }

  getAllUsers() {
    this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list`)
    .toPromise()
    .then(users => {
      this.allUsers = users;
    })
    .catch(e => {
      console.log(e);
    });
  }


  
  submit(mission){
    console.log(mission);

    function convertUserID(users) {
      users.forEach(users => {  
       for (let key in users) {
        if (key == 'UserID' ) {
            users[key] = parseInt(users[key]);
          }
        
      }
        
      });
  
      return users;
      // window.location.reload();
    }

    mission.Users = convertUserID(this.usersRoles);

    // mission.Users = this.usersRoles;  
    this.http.post(`${CONFIG.BACKEND_API}/api/missions/add`,mission).toPromise().then(res=>{
      this.errors = {};
      (res as Array<any>).forEach(obj => {
        this.errors[obj.param] = this.errors[obj.param] ? this.errors[obj.param] + " " + obj.msg : obj.msg;
      })
    }).catch(error => {
      console.log(error);
    })


  }
}
interface userMissionRole {
  UserID: string,
  Role: string
}