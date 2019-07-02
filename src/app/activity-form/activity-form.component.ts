import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  submit(activity){

        function convertActivity(Act) {
      for (let key in Act) {
        if (key == 'Physical_rate' || key == 'Duration' ) {
          Act[key] = parseInt(Act[key]);
        }
      }
      return Act;
      // window.location.reload();
    }


    console.log(activity);
    this.http.post(`${CONFIG.BACKEND_API}/api/activities/add`, convertActivity(activity)).toPromise().then(res=>{
      this.errors = {};
      console.log(res.toString());
      (res as Array<any>).forEach(obj => {
        
        if (obj.error.text == "Added") {
          this.router.navigateByUrl('/activities');
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        }
        this.errors[obj.param] = this.errors[obj.param] ? this.errors[obj.param] + " " + obj.msg : obj.msg;
      })
    }).catch(error => {
      console.log(error);
    })


  }

}
