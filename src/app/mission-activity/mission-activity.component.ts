import { Component, OnInit,Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { ActivatedRoute } from '@angular/router';
let data: any;

@Injectable()
@Component({
  selector: 'mission-activity',
  templateUrl: './mission-activity.component.html',
  styleUrls: ['./mission-activity.component.css']
})
export class MissionActivityComponent implements OnInit {
  public missionData: any = data;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  public mission_id;
  public missionActivities: any;
  public missionUsers: any;

  ngOnInit() {
    

    this.route.paramMap
    .subscribe(params =>{
      console.log(params.get('missionID'));
      let id =+params.get('missionID')
      this.mission_id = id;
      // console.log(this.mission_id);
      this.getMissionActivityData(id);
      
          })
          this.getMissionData(this.mission_id);
          this.getUserData(this.mission_id)

  }
  getMissionActivityData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/missions/activity/list`,id)
    .toPromise()
    .then(res => {
      // { 1:... , 2: ...}
      // this.missionActivities = res[id];
      this.missionActivities = res;
      console.log(this.missionActivities);      
    })
    .catch(e => {
      console.log(e);
    });

  }

  

  getMissionData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/missions/activity/list`,id)
    .toPromise()
    .then(res => {
      data = res;
      console.log(this.missionData)
    })
    .catch(e => {
      console.log(e);
    });

  }

  getUserData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/missions/users-list`,id)
    .toPromise()
    .then(res => {
      this.missionUsers = res;
      console.log(this.missionUsers);      
    })
    .catch(e => {
      console.log(e);
    });

  }

}
