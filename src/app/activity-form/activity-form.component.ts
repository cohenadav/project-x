import { Component, OnInit, Injectable } from '@angular/core';
import CONFIG from 'src/config/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
let data: any;

@Injectable()
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  public activityFormData: any = data;
  public errors = {};
  activityForm: FormGroup;
  error = '';
  submitted = false;


  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { 
    // this.activityForm = this.formBuilder.group({
    //   Name: ['',Validators.required],
    //   Duration : ['', Validators.required],
    //   Description: ['', Validators.required],
    //   Physical_rate: ['', Validators.required]
    // });
  }

  ngOnInit() {
    this.activityForm = this.formBuilder.group({
      Name: ['',[Validators.required, Validators.minLength(4)]],
      Duration : ['', [Validators.required, Validators.pattern('[0-9]*')] ],
      Description: ['', Validators.required],
      Physical_rate: ['', Validators.required],
      Role1: '',
      Role2: '',
      Role3: '',
      Role4: '',
    });
  }

  submit(activity){
    // this.activityForm.markAsTouched();
    this.submitted = true;
    console.log(this.activityForm);

    if (this.activityForm.invalid) {
      return;
    }

        function convertActivity(Act) {
      for (let key in Act) {
        if (key == 'Physical_rate' || key == 'Duration' ) {
          Act[key] = parseInt(Act[key]);
        }
      }
      Act.Roles_needed = Act.Role1 + ' ' + Act.Role2 + ' '+ Act.Role3 + ' ' +  Act.Role4;
      console.log(Act.Roles_needed);
      return Act;
      // window.location.reload();
    }


    // console.log(activity);
    // console.log(this.activityForm.getRawValue());
    this.http.post(`${CONFIG.BACKEND_API}/api/activities/add`, convertActivity(this.activityForm.getRawValue())).toPromise().then((res: {msg: string}) => {
     
    
      this.errors = {};
            
        if (res.msg === 'Added') {
          this.router.navigateByUrl('/activities');
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }

    }).catch(error => {
      console.log(error);
    })


  }

}
