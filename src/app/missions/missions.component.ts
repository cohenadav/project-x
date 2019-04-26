import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
let data: any;

@Injectable()
@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  public missionData: any = data;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (!this.missionData) {
      this.getData();
    }
  }

  getData(){
    this.http
    .get(`${CONFIG.BACKEND_API}/missions.json`)
    .toPromise()
    .then(res => {
      data = res;
      this.missionData=data
    })
    .catch(e => {
      console.log(e);
    });

  }

}
