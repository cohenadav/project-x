import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
let data: any;

@Injectable()
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  public activityData: any = data;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (!this.activityData) {
      this.getData();
    }
  }
  getData(){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/activities/list`)
    .toPromise()
    .then(res => {
      data = res;
      this.activityData=data
    })
    .catch(e => {
      console.log(e);
    });

  }

}
