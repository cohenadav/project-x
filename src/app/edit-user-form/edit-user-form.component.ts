import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { Type } from '@angular/compiler';
import { Router } from '@angular/router';
let data: any;

@Injectable()
@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
  
  public errors = {};
  private usersData: any = data;
  private age;
  private type; 
  private gender;
  private name;
  private weight;
  private height;
  private physical;
  private isAdmin;
  private isRamonaut;
  private specificUser : any;
  public index;
  public userId;
  
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {
    this.specificUser = {};
   }
    
    
  ngOnInit() {
    this.route.paramMap
    .subscribe(params =>{
      console.log(params.get('UserID'));
      let id =+params.get('UserID')
      this.getData(id);
      console.log(id)
          })
          

  }


  private getData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list`)
    .toPromise()
    .then(res => {
      data = res;
      console.log(data);
      this.usersData=data;
      this.userId = id;
      this.index = this.getUser(id);
      console.log(this.index);
      this.specificUser = data[this.index];
      this.specificUser.Gender = this.specificUser.Gender.toString();
      this.specificUser.Type = this.specificUser.Type.toString();
      this.specificUser.Height = this.specificUser.Height.toString();
      
      if(this.specificUser.isAdmin == 1){
          this.specificUser.isAdmin = true;
      }else{
          this.specificUser.isAdmin = false;
        }
      //   if(this.specificUser.Active == 1){
      //     this.specificUser.Active = true;
      // }else{
      //     this.specificUser.Active = false;
      //   }
          
      this.specificUser.Phisical_rate = this.specificUser.Phisical_rate.toString();
      
      console.log(this.specificUser)

      
    })
    .catch(e => {
      console.log(e);
    });

  }
  roleCheck(value){
    if(value == 1){
    this.isRamonaut = false;
  }else this.isRamonaut = true;
}
  private getUser(id){
    for(var i = 0; i<this.usersData.length; i++){
      if(this.usersData[i].UserID === id){
        return i;
    }
  
  }
  }

  submit(user){

    function convertUser(user) {
      for (let key in user) {
        if (key !== 'Name' && key !== 'Password' && key !=='PasswordMatch' && key !=='UserID' ) {
          if( key === 'isAdmin' || key === 'Active') {
            user[key] = user[key] ? 1 : 0;
          } else {
            user[key] = parseInt(user[key]);
          }
        }
      }
      return user;
      // window.location.reload();
    }
    
    user.UserID = this.userId;
    console.log(this.usersData)
    this.http.post(`${CONFIG.BACKEND_API}/api/users/edit`, convertUser(user)).toPromise().then(res=>{
      this.errors = {};
      console.log(this.usersData);
      (res as Array<any>).forEach(obj => {
        if (obj.msg == 'UserID:'+this.userId +'- changed successfully.') {
          this.router.navigateByUrl('/users');
          setTimeout(() => {
            // window.location.reload();
          }, 50);
        }
        this.errors[obj.param] = this.errors[obj.param] ? this.errors[obj.param] + " " + obj.msg : obj.msg;
      })
    }).catch(error => {
      console.log(error);
    })


  }
}
