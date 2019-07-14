import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';

// import { AuthenticationService } from '../_services';
@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    // private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.getRawValue());
    console.log(this.loginForm.controls);
    

    this.loading = true;
    this.http.
      post(`${CONFIG.BACKEND_API}/api/user/login`, this.loginForm.getRawValue(), {withCredentials: true} ).toPromise()
    .then(res => {

      localStorage.setItem('user', JSON.stringify(res));

      this.router.navigateByUrl('');
      setTimeout(() => {
        window.location.reload();
      }, 10);

      
    })
    .catch(e => {
      console.log(e);
      if(e.statusText === 'Unauthorized'){
        this.loading =false;
        this.error = 'Failed to login!'
        localStorage.clear();
      }
    });

    //JSON.parse(localStorage.getItem('user')) // { isAdmin: boolean; userid: 15 }
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.error = error;
    //             this.loading = false;
    //         });
  }
}
