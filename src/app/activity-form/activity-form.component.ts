import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
let data: any;

@Injectable()
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  public activityFormData: any = data;
  public errors = {};


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submit(activity){
    console.log(activity);
    this.http.post(`${CONFIG.BACKEND_API}/api/activities/add`,activity).toPromise().then(res=>{
      this.errors = {};
      (res as Array<any>).forEach(obj => {
        this.errors[obj.param] = this.errors[obj.param] ? this.errors[obj.param] + " " + obj.msg : obj.msg;
      })
    }).catch(error => {
      console.log(error);
    })


  }

}
