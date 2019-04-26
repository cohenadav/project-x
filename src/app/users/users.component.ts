import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import CONFIG from 'src/config/config';
let data: any;

@Injectable()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userData: any = data;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (!this.userData) {
      this.getData();
    }
  
    }
    getData(){
      this.http
      .get(`${CONFIG.BACKEND_API}/users.json`)
      .toPromise()
      .then(res => {
        data = res;
        this.userData=data
      })
      .catch(e => {
        console.log(e);
      });

    }
  }


