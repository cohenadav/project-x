import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import CONFIG from 'src/config/config';
import { Router } from '@angular/router';
let data: any;

@Injectable()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
   public userData: any = data;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    if (!this.userData) {
      this.getData();
    }
  
    }
    getData(){
      this.http
      .get(`${CONFIG.BACKEND_API}/api/users/list`)
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
    roleCheck(type){
      if (type == 0){
        return "Control";
      }else return "Ramonaut";
    }
    

    deleteUser(id,name){
      if(confirm("Are you sure you want to delete "+name+ "?")){
        this.http
        .get(`${CONFIG.BACKEND_API}/api/users/delete/?id=${id}`)
        .toPromise()
        .then(res => {
        })
     
          window.location.reload();
          // this.router.navigateByUrl('/users'); 
      }
          
    }

  }
  


