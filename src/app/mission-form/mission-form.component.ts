import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
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
  public matDatepicker: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  submit(mission){
    console.log(mission);
    this.http.post(`${CONFIG.BACKEND_API}/api/missions/add`,activity).toPromise().then(res=>{
      this.errors = {};
      (res as Array<any>).forEach(obj => {
        this.errors[obj.param] = this.errors[obj.param] ? this.errors[obj.param] + " " + obj.msg : obj.msg;
      })
    }).catch(error => {
      console.log(error);
    })


  }
}
