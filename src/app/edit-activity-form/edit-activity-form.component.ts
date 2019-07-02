import { Component, OnInit,Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
let data;

@Injectable()
@Component({
  selector: 'app-edit-activity-form',
  templateUrl: './edit-activity-form.component.html',
  styleUrls: ['./edit-activity-form.component.css']
})
export class EditActivityFormComponent implements OnInit {
  public errors = {};
  public specificActivity = data;
  public index;
  public activitiesData: any = data;
  public activityId;
  
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.specificActivity = {};
  }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params =>{
      console.log(params.get('ActivityID'));
      let id =+params.get('ActivityID')
      this.getData(id);
          })
  }

  getData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/activities/list`)
    .toPromise()
    .then(res => {
      data = res;
      console.log(data);
      this.activitiesData = data;
      
      this.index = this.getActivity(id);
      console.log(this.index);
      this.specificActivity = data[this.index];
      this.specificActivity.Duration = this.specificActivity.Duration.toString();
      this.specificActivity.Physical_rate = this.specificActivity.Physical_rate.toString();

      this.activityId = id;
    
    })
    .catch(e => {
      console.log(e);
    });
}

getActivity(id){
  for(var i = 0; i<this.activitiesData.length; i++){
    if(this.activitiesData[i].ActivityID === id){
      return i;
  }

}
}

submit(activity){

  function convertActivity(activity) {
    for (let key in activity) {
      if (key !== 'Name' && key !== 'Description' && key !=='Roles_needed' && key !=='ActivityID') {
          activity[key] = parseInt(activity[key]);
        }
      }
    
    return activity;
    // window.location.reload();
  }

  activity.ActivityID = this.activityId;

  this.http.post(`${CONFIG.BACKEND_API}/api/activities/edit`, convertActivity(activity)).toPromise().then(res=>{
    this.errors = {};
    (res as Array<any>).forEach(obj => {
      if (obj.msg === 'Changed') {
        // this.router.navigateByUrl('/users');
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