import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-report-end-of-act',
  templateUrl: './report-end-of-act.component.html',
  styleUrls: ['./report-end-of-act.component.css']
})
export class ReportEndOfActComponent implements OnInit {
  public MA_ID;
  public mission_id;
  public missionActivities: any;
  public errors = {};
  public specificMA;

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router,public datepipe: DatePipe) {
    this.missionActivities = [];
    this.specificMA ={};

   }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params =>{
      console.log(params.get('MA_ID'));
      let MA_id =+params.get('MA_ID')
      this.MA_ID = MA_id; 
      let missionID =+params.get('missionID')
      this.mission_id = missionID;

      

      
          })
          this.getMissionActs(this.mission_id)
        }


        getMissionActs(id) {
          this.http
            .get(`${CONFIG.BACKEND_API}/api/missions/activity/list?id=${id}`)
            .toPromise()
            .then(res => {
              // { 1:... , 2: ...}
              // this.missionActivities = res[id];
              this.missionActivities = res;
              console.log(this.missionActivities);
      
              this.getAllActivities()
              .then((allActivities: Array<any>) => {
                if(this.missionActivities.length)  {
                  this.missionActivities.forEach((act: { MA_ID: number; MissionID: number; ActivityID: number; Name?: string; Start_Date: string; Physical_rate:number; End_Date: string; Status:string; Actual_Duration: number; Water_cons: number; Water_expected:number;}) => {
                    console.log('Activity', act);
                    if(act) {
                      allActivities.forEach((item) => {
                        // console.log('item', item);
                        act.Start_Date =this.datepipe.transform(act.Start_Date, 'yyyy-MM-dd');
                        act.End_Date =this.datepipe.transform(act.End_Date, 'yyyy-MM-dd');
                        if (act.ActivityID === item.ActivityID) {
                          act.Name = item.Name;
                          act.Physical_rate = item.Physical_rate;
                        }
                      })
                    }
                  })
                }
              })
              this.missionActivities.forEach((element: {MA_ID: number; MissionID: number; ActivityID: number; Name?: string; Start_Date: string; Physical_rate:number; End_Date: string; Status:string; Actual_Duration: number; Water_cons: number; Water_expected:number;}) => {
                if(element.MA_ID === this.MA_ID){
                  this.specificMA = element;
                }
                console.log(element)
                
              });
            })
            .catch(e => {
              console.log(e);
            });
      
        }

        submit(rep){
          console.log(rep);
      
          rep.MA_ID = this.MA_ID;
          console.log(rep);
          rep.Water_cons = parseInt(rep.Water_cons);
          rep.Actual_Duration = parseInt(rep.Actual_Duration);
          rep.Status = parseInt(rep.Status);

          console.log(rep);
      
          this.http.post(`${CONFIG.BACKEND_API}/api/missions/activity/report`,rep).toPromise().then((res: {msg: string} )=>{
            this.errors = {};
            if (res.msg === 'Reported') {
              this.router.navigateByUrl(`/missions/${this.mission_id}`);
              setTimeout(() => {
                window.location.reload();
              }, 50);
            }
          }).catch(error => {
            console.log(error);
          })
      
      
        }
        getAllActivities() {
          return this.http
            .get(`${CONFIG.BACKEND_API}/api/activities/list`)
            .toPromise()
        }

}
