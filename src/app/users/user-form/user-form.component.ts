import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { HttpClient } from '@angular/common/http';
let data: any;

@Injectable()
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public userFormData: any = data;
  public isRamonaut = true;
  public errors = {};

  // erros = { Name: 'bla bla', Paswword: 'bla bla', Gender: 'bla bla' }
  // public userData this data comes from binded on userFormComponent 

  // homepageData undefined
  // homepoageData after response is defined
  constructor(private http: HttpClient) { }

  ngOnInit() {
    //demo

    this.errors['Name']

    //
  }
  
  
  // onSubmit(user){ 
  //   let post = {title: input.value};
  //   input.value = '';

  //   this.http.post(`${CONFIG.BACKEND_API}/users.json`, JSON.stringify(post))
  //   .subscribe(res =>{ 
  //     console.log(res.json());
  //   });
  // }


  submit(user){
    console.log(user);
    this.http.post(`${CONFIG.BACKEND_API}/api/users/add`,user).toPromise().then(res=>{
      this.errors = {};
      (res as Array<any>).forEach(obj => {
        this.errors[obj.param] = this.errors[obj.param] ? this.errors[obj.param] + " " + obj.msg : obj.msg;
      })
    }).catch(error => {
      console.log(error);
    })


  }
  roleCheck(value){
    if(value == 1){
    this.isRamonaut = false;
  }else this.isRamonaut = true;
}


  

}
