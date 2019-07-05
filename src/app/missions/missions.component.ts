import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
let data: any;

@Injectable()
@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  public missionData: any = data;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit() {
    if (!this.missionData) {
      this.getData();
    }
  }
  routhToMissionActivity(activityId){
    
  }

  getData(){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/missions/list`)
    .toPromise()
    .then(res => {
      data = res;
      this.missionData=data
      this.missionData.forEach(item => {
        item.Start_date =this.datepipe.transform(item.Start_date, 'dd-MM-yyyy');
        item.End_date =this.datepipe.transform(item.End_date, 'dd-MM-yyyy');
        
      });
    })
    .catch(e => {
      console.log(e);
    });

  }

}
