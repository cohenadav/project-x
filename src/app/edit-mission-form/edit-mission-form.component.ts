import { Component, OnInit,Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
let data;

@Injectable()
@Component({
  selector: 'app-edit-mission-form',
  templateUrl: './edit-mission-form.component.html',
  styleUrls: ['./edit-mission-form.component.css']
})
export class EditMissionFormComponent implements OnInit {
  public specificMission = data;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params =>{
      console.log(params.get('missionID'));
      let id =+params.get('missionID')
      this.getData(id);
          })
  }

  getData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/missions.json`)
    .toPromise()
    .then(res => {
      data = res;
      this.specificMission=data[id-1];
      console.log(this.specificMission)
    })
    .catch(e => {
      console.log(e);
    });
}

}
