import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';


@Injectable()
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  public waterCall;
  public enerCall;

  constructor( private http: HttpClient) { 
    this.waterCall = 75;
    this.enerCall = 67;

  }

  ngOnInit() {
  //   this.http
  //   .get(`${CONFIG.BACKEND_API}/api/resources/current_water`)
  //   .toPromise()
  //   .then(res => {
  //     this.dataCall = res;
  //   })
  }

}
