import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

let data: any;

@Injectable()
@Component({
  selector: 'app-my-missions',
  templateUrl: './my-missions.component.html',
  styleUrls: ['./my-missions.component.css']
})
export class MyMissionsComponent implements OnInit {
  public missionData: any = data;
  public loginId;
  public userAllMissionsID;
  public missions;
  public allMissionDB;

  constructor(private http: HttpClient,private route: ActivatedRoute, public datepipe: DatePipe) {
    this.userAllMissionsID = [];
    this.missions = [];
    this.allMissionDB = [];

   }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      console.log(params.get('loginID'));
      let id = +params.get('loginID')
      this.loginId = id;
  })
  this.getMyMissions(this.loginId);
  this.getAllMissions();
}

getMyMissions(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list-user-missions?id=15`) //${id}
    .toPromise()
    .then(res => { // [{"MissionID": 52},{"MissionID": 53}, {"MissionID": 54}]
      data = res;
      this.userAllMissionsID=data
      if(this.userAllMissionsID.length){
        this.userAllMissionsID.forEach(item => {

        
        });

      }

    })
    .catch(e => {
      console.log(e);
    });

  }

  getAllMissions(){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/missions/list`)
    .toPromise()
    .then(res => {
      this.allMissionDB=res
      this.allMissionDB.forEach(item => {
        item.Start_date =this.datepipe.transform(item.Start_date, 'dd-MM-yyyy');
        item.End_date =this.datepipe.transform(item.End_date, 'dd-MM-yyyy');
        if(item){
            this.userAllMissionsID.forEach((id: {MissionID: number;}, i) => {
              if(id.MissionID === item.MissionID){
                this.missions[i] = item;

              }
    
            
            });
    
          }
        })
      })
           
    .catch(e => {
      console.log(e);
    });

  }

}
