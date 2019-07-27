import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
let data: any;

@Injectable()
@Component({
  selector: 'app-activity-in-mission',
  templateUrl: './activity-in-mission.component.html',
  styleUrls: ['./activity-in-mission.component.css']
})
export class ActivityInMissionComponent implements OnInit {
  public missionData: any = data;
  public missionID ;
  public missionActivities: any;
  public specificMission;
  public missionIndex;
  public specificMissionActivity: any;
  public MissionActivityID;
  public mAUsers: [] | {UserID: number; Role: string}[];

  constructor(private http: HttpClient, private route: ActivatedRoute, public datepipe: DatePipe) {
    this.missionActivities = [];
    this.specificMission = {};
    this.specificMissionActivity = {};
    this.mAUsers = [];
   }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        console.log(params.get('missionID'));
        let id = +params.get('missionID')
        let ma =+params.get('MA_ID')
        this.missionID = id;
        this.MissionActivityID = ma;
        // console.log(this.mission_id);
        this.getMissionActivityData(id);
        
        

      })
      this.getMissionData(this.missionID);
      this.getMAUserData(this.MissionActivityID)
  }
  
  getMissionActivityData(id) {
    this.http
      .get(`${CONFIG.BACKEND_API}/api/missions/activity/list?id=${id}`)
      .toPromise()
      .then(res => {
        // { 1:... , 2: ...}
        // this.missionActivities = res[id];
        this.missionActivities = res;
        console.log(this.missionActivities);

        // this.getAllActivities()
        this.http
        .get(`${CONFIG.BACKEND_API}/api/activities/list`)
        .toPromise()
        .then((allActivities: Array<any>) => {
          if(this.missionActivities.length)  {
            this.missionActivities.forEach((act: { MA_ID: number; MissionID: number; ActivityID: number; Name?: string; Start_Date: string; Physical_rate:number; End_Date: string; Status:string; Actual_Duration: number; Water_cons: number; Water_expected:number;}) => {
              console.log('Activity', act);
              if(act) {
                act.Start_Date =this.datepipe.transform(act.Start_Date, 'dd-MM-yyyy hh:mm');
                act.End_Date =this.datepipe.transform(act.End_Date,  'dd-MM-yyyy hh:mm');
                allActivities.forEach((item) => {

                   console.log('item', item);
                  
                  if (act.ActivityID === item.ActivityID) {
                    act.Name = item.Name;
                    act.Physical_rate = item.Physical_rate;
                  }
                })
              }
            })
          }
        })
                  this.missionActivities.forEach(MA => {
                    if(this.MissionActivityID===MA.MA_ID){
                      this.specificMissionActivity = MA ;
                    }
                    console.log(this.specificMissionActivity);
                    
                  });
      })
      .catch(e => {
        console.log(e);
      });

  }

  getMissionData(id) {
    this.http
      .get(`${CONFIG.BACKEND_API}/api/missions/list`)
      .toPromise()
      .then(res => {
        data = res;
        this.missionData = data;

        for (var i = 0; i < this.missionData.length; i++) {
          if (this.missionData[i].MissionID === id) {
            this.missionIndex = i;
          }
        }
        this.specificMission = this.missionData[this.missionIndex];
        console.log(this.specificMission);
      })
      .catch(e => {
        console.log(e);
      });

  }

  getMAUserData(id) {
    console.log('before http', this.mAUsers);

    this.http
      .get(`${CONFIG.BACKEND_API}/api/missions/activity/users?id=${id}`)
      .toPromise()
      .then((users: Array<{Role: string; UserID: number;}>) => {
        this.mAUsers = users;

        this.getAllUsers()
          .then((allUsers: Array<any>) => {
            if(this.mAUsers.length)  {
              this.mAUsers.forEach((user: {UserID: number; Name?: string; Role: string; }) => {
                console.log('user', user);
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

      console.log('after http', this.mAUsers);

  }

  getAllUsers() {
    return this.http
      .get(`${CONFIG.BACKEND_API}/api/users/list`)
      .toPromise()
  
  }


  getAllActivities() {
    return this.http
      .get(`${CONFIG.BACKEND_API}/api/activities/list`)
      .toPromise()
  }

}
