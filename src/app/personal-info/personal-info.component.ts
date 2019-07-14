import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
let data: any;

@Injectable()
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  public loginUser;
  public loginId;
  public user;
  public userShow;

  constructor(private http: HttpClient,private route: ActivatedRoute) {
    this.user = {};
    this.userShow = {};
   }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('user'));
    this.loginId = this.loginUser.UserID;

    this.getUserName();
  }

  getUserName(){

    this.getAllUsers()
    .then((allUsers: Array<any>) => {
            allUsers.forEach((item) => {
              if (this.loginId === item.UserID) {
                  this.user = item;
                  this.userShow = item;
                  if(this.userShow.Gender == 0){
                    this.userShow.Gender = 'M';
                  }else{
                    this.userShow.Gender = 'F';
                  }
                  if(this.userShow.Type == 0){
                    this.userShow.Type = 'Control';
                  }else{
                    this.userShow.Type = 'Ramonaut';
                  }
                  // this.userShow.MM = "fuck"

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
