import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { Type } from '@angular/compiler';
let data: any;

@Injectable()
@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
  
  
  public specificUser: any = data;
  private age;
  private type; 
  private gender;
  private name;
  private weight;
  private height;
  private physical;
  private isAdmin;
  private isRamonaut;
  
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
    
    
  ngOnInit() {
    this.route.paramMap
    .subscribe(params =>{
      console.log(params.get('UserID'));
      let id =+params.get('UserID')
      this.getData(id);
          })
          

  }

  getData(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/users.json`)
    .toPromise()
    .then(res => {
      data = res;
      this.specificUser=data[id-1];
      this.name = this.specificUser.Name;
      this.age = this.specificUser.Age;
      this.type = this.specificUser.Type;
      if (this.type==0){
        this.isRamonaut= true;
      }else {this.isRamonaut=false;}
      this.isAdmin = this.specificUser.isAdmin;
      this.gender = this.specificUser.Gender;
      this.weight = this.specificUser.Weight;
      this.height = this.specificUser.Height;
      this.physical = this.specificUser.Physical_Rate

      
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

}
