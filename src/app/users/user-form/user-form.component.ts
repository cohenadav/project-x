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
  // public userData this data comes from binded on userFormComponent 

  // homepageData undefined
  // homepoageData after response is defined
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  onSubmit(x){
    console.log(x)
  }
  submit(f){
    console.log(f);
  }
  // onSubmit(input: HTMLInputElement){ 
  //   let post = {title: input.value};
  //   input.value = '';

  //   this.http.post(`${CONFIG.BACKEND_API}/users.json`, JSON.stringify(post))
  //   .subscribe(res =>{ 
  //     console.log(res.json());
  //   });
  // } 

}
