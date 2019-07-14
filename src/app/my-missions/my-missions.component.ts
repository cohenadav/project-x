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
  public loginUser;
  public user;
  

  constructor(private http: HttpClient,private route: ActivatedRoute, public datepipe: DatePipe) {
    this.userAllMissionsID = [];
    this.missions = [];
    this.allMissionDB = [];
    this.user = {};

   }

  ngOnInit() {
    // this.route.paramMap
    // .subscribe(params => {
    //   console.log(params.get('loginID'));
    //   let id = +params.get('loginID')
    // })
    this.loginUser = JSON.parse(localStorage.getItem('user'));
      this.loginId = this.loginUser.UserID;
 
  this.getMyMissions(this.loginId);
  this.getAllMissions();
  this.getUserName();
}

getMyMissions(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list-user-missions?id=${id}`) //${id}
    .toPromise()
    .then(res => { // [{"MissionID": 52},{"MissionID": 53}, {"MissionID": 54}]
      data = res;
      this.userAllMissionsID=data
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
                if(this.missions[i].Status == 0){
                  this.missions[i].status = 'Scheduled'
               }else if(this.missions[i].Status == 1){
                this.missions[i].status = 'Active'
              
               }else if(this.missions[i].Status == 2){
                this.missions[i].status = 'Finished'
              
               }else {this.missions[i].status = 'Canceled' }

              }

    
            
            });
    
          }
        })
      })
           
    .catch(e => {
      console.log(e);
    });

  }
  getUserName(){

    this.getAllUsers()
    .then((allUsers: Array<any>) => {
            allUsers.forEach((item) => {
              if (this.loginId === item.UserID) {
                  this.user = item;
              }
            })
          })
  }

  getAllUsers() {
    return this.http
      .get(`${CONFIG.BACKEND_API}/api/users/list`)
      .toPromise()
  }


}
