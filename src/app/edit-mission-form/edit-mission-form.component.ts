import { Component, OnInit,Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
let data: any;

@Injectable()
@Component({
  selector: 'app-edit-mission-form',
  templateUrl: './edit-mission-form.component.html',
  styleUrls: ['./edit-mission-form.component.css']
})
export class EditMissionFormComponent implements OnInit {
  public missionData = data;
  private Mission : any;
  public index;
  public errors = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, public datepipe: DatePipe,private router: Router) {
    this.Mission = {};
   }
  
  

  ngOnInit() {
    this.route.paramMap
    .subscribe(params =>{
      console.log(params.get('missionID'));
      let id =+params.get('missionID')
      this.getMissionData(id);
          })
          
  }



  getMissionData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/missions/list`)
    .toPromise()
    .then(res => {
      data = res;
      this.missionData = data;

      for(var i = 0; i<this.missionData.length; i++){
        if(this.missionData[i].MissionID === id){
          this.index = i;
      }
    }
      this.Mission = this.missionData[this.index];
      console.log(this.Mission);
      this.Mission.Start_date =this.datepipe.transform(this.Mission.Start_date, 'yyyy-MM-dd');
      this.Mission.End_date =this.datepipe.transform(this.Mission.End_date, 'yyyy-MM-dd');

    })
    .catch(e => {
      console.log(e);
    });

  }

  submit(mission){
    console.log(mission);

    mission.MissionID = this.Mission.MissionID;
    console.log(mission);

    this.http.post(`${CONFIG.BACKEND_API}/api/missions/edit`,mission).toPromise().then((res: {msg: string} )=>{
      this.errors = {};
      if (res.msg === 'Changed') {
        this.router.navigateByUrl('/missions');
        setTimeout(() => {
          window.location.reload();
        }, 50);
      }
    }).catch(error => {
      console.log(error);
    })


  }


}
