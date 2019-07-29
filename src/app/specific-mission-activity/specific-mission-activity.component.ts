import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
let data: any;

@Injectable()
@Component({
  selector: 'app-specific-mission-activity',
  templateUrl: './specific-mission-activity.component.html',
  styleUrls: ['./specific-mission-activity.component.css']
})
export class SpecificMissionActivityComponent implements OnInit {
  public allActivities;
  public missionId;
  public allMissionsUsers;
  public numberOfRoles = [0,1,2];
  public roles = ['Commander','Deputy Commander','Communication officer','Science officer'];
  public errors = {};
  activityForm: FormGroup
  submitted = false;
  public dateError: boolean;
  public usCk: boolean;

  public UMR1: userMissionRole;
  public UMR2: userMissionRole;
  public UMR3: userMissionRole;
  public UMR4: userMissionRole;
  public UMR5: userMissionRole;

  public usersActivityRoles = [];

  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router,public datepipe: DatePipe,private formBuilder: FormBuilder) {
    this.allActivities = [];
    this.allMissionsUsers =[];
    this.dateError = false;

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

    this.usersActivityRoles = [this.UMR1,this.UMR2,this.UMR3];
   }
   checkDates = () => {
    if (this && this.activityForm && new Date(this.activityForm.value.Start_date) > new Date(this.activityForm.value.End_date)) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.activityForm = this.formBuilder.group({
      ActivityID: ['',Validators.required],
      Start_date : ['', Validators.required] ,
      Start_time : ['', Validators.required] ,
      End_date: ['', Validators.required],
      End_time : ['', Validators.required] ,
      Status: ['', Validators.required],
      Users: [''],
      MissionID: ['']
    });

    this.route.paramMap
    .subscribe(params => {
      // console.log(params.get('missionID'));
      let id = +params.get('missionID')
      this.missionId = id;
      console.log(this.missionId)

  })
  this.getAllActivities();
  this.getMissionsUsers(this.missionId);
}


    getAllActivities(){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/activities/list`)
    .toPromise()
    .then(res => {
      data = res;
      this.allActivities=data;
    })
    .catch(e => {
      console.log(e);
    });

  }

  getMissionsUsers(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/missions/users-list?id=${id}`)
    .toPromise()
    .then((users: Array<{Role: string; UserID: number;}>) => {
      this.allMissionsUsers = users;

      this.getAllUsers()
        .then((allUsers: Array<any>) => {
          if(this.allMissionsUsers.length)  {
            this.allMissionsUsers.forEach((user: {UserID: number; Name?: string; Role: string; }) => {
              // console.log('user', user);
              if(user) {
                allUsers.forEach((item) => {
                  // console.log('item', item);
                  if (user.UserID === item.UserID) {
                    user.Name = item.Name;
                  }
                })
              }
            })
          }
        })
    })
    .catch(e => {
      console.log(e);
    });

   

}
getAllUsers() {
  return this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list`)
    .toPromise()
}
getActivityID(name){

}
submit(missionActivity){
  this.submitted = true;

  if(this.checkDates()) {
    this.dateError = true;
    return; 
  }
  this.dateError = false;

  
  console.log(this.activityForm.value);

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
  // "yyyy-MM-ddTHH:mm:ss"

  if(this.userCheck()){
  let u = convertUserID(this.usersActivityRoles);
  this.activityForm.controls['MissionID'].setValue(this.missionId);
  // console.log(missionActivity.Start_date)
  // console.log(missionActivity.End_date)
  let sd = this.activityForm.value.Start_date+ " "+ this.activityForm.value.Start_time;
  console.log(sd);
  let ed = this.activityForm.value.End_date+ " "+ this.activityForm.value.End_time;
  console.log(ed);

  (this.activityForm.controls['Start_date']).setValue(sd);
  (this.activityForm.controls['End_date']).setValue(ed);

  // missionActivity.Start_date = missionActivity.Start_date + " " +missionActivity.Start_time;
  // missionActivity.End_date = missionActivity.End_date + " " +missionActivity.End_time;;
  // console.log(missionActivity.Start_date)
  // console.log(missionActivity.End_date);
  
  (this.activityForm.controls['Users']).setValue(u);
  console.log('work work work', this.activityForm.value)


  
  this.http.post(`${CONFIG.BACKEND_API}/api/missions/activity/add`,this.activityForm.value).toPromise().then((res: {msg: string} )=>{
    this.errors = {};
    if (res.msg === 'added') {
      this.router.navigateByUrl(`/missions/${this.missionId}`);
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }).catch(error => {
    console.log(error);
  })

  }
}
userCheck(){
  for(let i=0; i<3 ;i++){
    if( this.usersActivityRoles[i].Role=="" || this.usersActivityRoles[i].UserID=="" ){
      console.log('false role!')
      this.usCk = false;
      return false;
      }
      for(let j=0; j<3; j++){
        if((i!=j) && parseInt(this.usersActivityRoles[i].UserID) == parseInt(this.usersActivityRoles[j].UserID)){
          console.log('false User! '+ this.usersActivityRoles[i].UserID +'='+this.usersActivityRoles[j].UserID)
          console.log(i, j)
          this.usCk = false;
          return false;
          
        }
      }
    }
  console.log(true);
  this.usCk = true;
  return true;

}

}

interface userMissionRole {
  UserID: string,
  Role: string
}
