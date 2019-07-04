import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
let data: any;

@Injectable()
@Component({
  selector: 'mission-activity',
  templateUrl: './mission-activity.component.html',
  styleUrls: ['./mission-activity.component.css']
})
export class MissionActivityComponent implements OnInit {
  public missionData: any = data;
  public mission_id;
  public missionActivities: any;
  public missionUsers: [] | {UserID: number; Role: string}[];
  public missionIndex;
  public specificMission;
  public missionUsersNames;

  constructor(private http: HttpClient, private route: ActivatedRoute, public datepipe: DatePipe) {
    this.specificMission = {};
    this.missionUsers = [];
    this.missionActivities = [];
  }


  ngOnInit() {


    this.route.paramMap
      .subscribe(params => {
        console.log(params.get('missionID'));
        let id = +params.get('missionID')
        this.mission_id = id;
        // console.log(this.mission_id);
        this.getMissionActivityData(id);

      })
    this.getMissionData(this.mission_id);
    this.getMissionUserData(this.mission_id)

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

        this.getAllActivities()
        .then((allActivities: Array<any>) => {
          if(this.missionActivities.length)  {
            this.missionActivities.forEach((act: { MA_ID: number; MissionID: number; ActivityID: number; Name?: string; Start_Date: string; Physical_rate:number; End_Date: string; Status:string; Actual_Duration: number; Water_cons: number; Water_expected:number;}) => {
              console.log('Activity', act);
              if(act) {
                allActivities.forEach((item) => {
                  // console.log('item', item);
                  act.Start_Date =this.datepipe.transform(act.Start_Date, 'yyyy-MM-dd');
                  act.End_Date =this.datepipe.transform(act.End_Date, 'yyyy-MM-dd');
                  if (act.ActivityID === item.ActivityID) {
                    act.Name = item.Name;
                    act.Physical_rate = item.Physical_rate;
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

  getMissionUserData(id) {
    console.log('before http', this.missionUsers);

    this.http
      .get(`${CONFIG.BACKEND_API}/api/missions/users-list?id=${id}`)
      .toPromise()
      .then((users: Array<{Role: string; UserID: number;}>) => {
        this.missionUsers = users;

        this.getAllUsers()
          .then((allUsers: Array<any>) => {
            if(this.missionUsers.length)  {
              this.missionUsers.forEach((user: {UserID: number; Name?: string; Role: string; }) => {
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

      console.log('after http', this.missionUsers);

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