import { Component, OnInit, Injectable, Input } from '@angular/core';
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
    genderCheck(v){
      if (v == 0){
        return "M";
      }else return "F";
    }
    isAdminCheck(v){
      if (v == true){
        return "V";
        
      }else return " ";
    }

    deleteUser(id){
      alert("Are you sure you want to delete "+id+ "?")
    
    }

  }
  


