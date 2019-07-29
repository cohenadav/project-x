import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from '../body/body.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';
let data: any;

@Injectable()
@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {
  public missionFormData: any = data;
  public errors = {};
  error = '';
  submitted = false;
  missionForm: FormGroup;
  public matDatepicker;
  public numberOfRoles = [0,1,2,3,4];
  public roles = ['Commander','Deputy Commander','Communication officer','Science officer'];
  public allUsers;
  public ramonauts;
  public usCk: boolean;
  public dateInUse = "";
  

  public UMR1: userMissionRole;
  public UMR2: userMissionRole;
  public UMR3: userMissionRole;
  public UMR4: userMissionRole;
  public UMR5: userMissionRole;
  
  
  public usersRoles = [];

  public dateError: boolean;

  constructor(public datepipe: DatePipe, private http: HttpClient,private router: Router,private formBuilder: FormBuilder) {
    this.ramonauts = [];
    this.dateError = false;

    this.UMR1 = {
      UserID: "",
      Role: ""
    }
    this.UMR2 = {
      UserID: "",
      Role:""
    }
    this.UMR3 = {
      UserID: "",
      Role:""
    }
    this.UMR4 = {
      UserID: "",
      Role:""
    }
    this.UMR5 = {
      UserID: "",
      Role:""
    }
    this.usersRoles = [this.UMR1,this.UMR2,this.UMR3,this.UMR4,this.UMR5];
  }

  checkDates = () => {
    if (this && this.missionForm && new Date(this.missionForm.value.Start_date) > new Date(this.missionForm.value.End_date)) {
      return true;
    }
    return false;
    // return new Promise((res, rej) => {
    //   if (this && this.missionForm && new Date(this.missionForm.value.Start_date) > new Date(this.missionForm.value.End_date)) {
    //     return res({ notMatching: true });
    //   }
    //   return res(null);
    // })
  }

  ngOnInit() {
    this.missionForm = this.formBuilder.group({
      Name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(14)]],
      Start_date : ['', Validators.required] ,
      End_date: ['', Validators.required],
      Status: ['', Validators.required],
      Users: ['']
    });

    this.getAllUsers();
    console.log(this.usersRoles);

  }

  getAllUsers() {
    this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list`)
    .toPromise()
    .then(users => {
      this.allUsers = users;
    })
    .catch(e => {
      console.log(e);
    });
    this.getRamonauts()
    .then((ramonauts: Array<any>) => {
      ramonauts.forEach(( r,i) => {
        this.allUsers.forEach(u => {
          if(r.UserID==u.UserID){
            this.ramonauts[i]= u;
          } 
          
        });

        
      });

    })

  }
  getRamonauts(){
    return this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list-active-ramounouts`)
    .toPromise()
  }


  
  submit(mission){
    this.submitted = true;

    if(this.checkDates()) {
      this.dateError = true;
      return; 
    }
    this.dateError = false;
    
    console.log(this.missionForm.value);
    // if (this.missionForm.invalid) {
    //   return;
    // }

    function convertUserID(users) {
      users.forEach(users => {  
       for (let key in users) {
        if (key == 'UserID' ) {
            users[key] = parseInt(users[key]);
          }
        
      }
        
      });
  
      return users;
      // window.location.reload();
    }
    if(this.userCheck()){
      let u = convertUserID(this.usersRoles);
      let s = parseInt(this.missionForm.value.Status);
      this.missionForm.controls['Status'].setValue(s);
      this.missionForm.controls['Start_date'].setValue(this.datepipe.transform(this.missionForm.value.Start_date, "yyyy-MM-dd"));
      this.missionForm.controls['End_date'].setValue(this.datepipe.transform(this.missionForm.value.End_date, "yyyy-MM-dd"));
      // this.missionForm.value.Start_date = this.datepipe.transform(this.missionForm.value.Start_date, 'd/M/yy hh:mm:ss');
      // this.missionForm.value.End_date = this.datepipe.transform(this.missionForm.value.End_date, 'd/M/yy hh:mm:ss');

    (this.missionForm.controls['Users']).setValue(u);
    console.log('form value', this.missionForm.value)
    
    // mission.Users = convertUserID(this.usersRoles);

        // mission.Users = this.usersRoles;  
        this.http.post(`${CONFIG.BACKEND_API}/api/missions/add`,this.missionForm.value).toPromise().then((res: {msg: string} )=>{
          this.errors = {};
          if (res.msg === 'Added') {
            this.dateInUse = "";
            this.router.navigateByUrl('/missions');
            setTimeout(() => {
              window.location.reload();
            }, 50);
          }else{
            this.dateInUse = res.msg;
          }
        }).catch(error => {
          console.log(error);
        })

    } else{
      return false;
    }




  }
  userCheck(){
    for(let i=0; i<5 ;i++){
      if( this.usersRoles[i].Role=="" || this.usersRoles[i].UserID=="" ){
        console.log('false role!')
        this.usCk = false;
        return false;
        }
        for(let j=0; j<5; j++){
          if((i!=j) && parseInt(this.usersRoles[i].UserID) == parseInt(this.usersRoles[j].UserID)){
            console.log('false User! '+ this.usersRoles[i].UserID +'='+this.usersRoles[j].UserID)
            console.log(i, j)
            this.usCk = false;
            return false;
            
          }
        }
      }
    console.log(true);
    this.usCk = true;
    return true;

  }
}
interface userMissionRole {
  UserID: string,
  Role: string
}