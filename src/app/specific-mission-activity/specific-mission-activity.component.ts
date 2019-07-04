import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  public numberOfRoles = [0,1,2,3,4];
  public roles = ['Commander','Deputy Commander','Communication officer','Science officer'];
  public errors = {};

  public UMR1: userMissionRole;
  public UMR2: userMissionRole;
  public UMR3: userMissionRole;
  public UMR4: userMissionRole;
  public UMR5: userMissionRole;

  public usersActivityRoles = [];

  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router) {
    this.allActivities = [];
    this.allMissionsUsers =[];

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
    this.usersActivityRoles = [this.UMR1,this.UMR2,this.UMR3,this.UMR4,this.UMR5];
   }

  ngOnInit() {
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
  console.log(missionActivity);

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

  missionActivity.Users = convertUserID(this.usersActivityRoles);
  missionActivity.MissionID = this.missionId;

  // mission.Users = this.usersRoles;  
  console.log(missionActivity);
  this.http.post(`${CONFIG.BACKEND_API}/api/missions/activity/add`,missionActivity).toPromise().then((res: {msg: string} )=>{
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

interface userMissionRole {
  UserID: string,
  Role: string
}
