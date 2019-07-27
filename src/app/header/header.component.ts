import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
let data: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
 
export class HeaderComponent implements OnInit {
  public loggedIn = false;
  public loginUser;
  public userId;
  public isAdmin: boolean = false;
  public userDetails;
  public isControl: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router,) {
    this.userDetails = {};
    // this.loggedIn = false;
   }

  ngOnInit() {

     this.loginUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.loginUser);
    if(this.loginUser){
    this.userId = this.loginUser.UserID
    let a = this.loginUser.isAdmin
    if(a === 1){
      this.isAdmin = true;
    }
    let b = this.loginUser.Type;
    if(b === 0){
      this.isControl = true;
    }
    if(localStorage.length){
      this.loggedIn = true;
    }
    

  }
    console.log(this.isAdmin)
    console.log(this.userId)
    // JSON.parse(this.loginUser);
    // let check = JSON.parse(localStorage.getItem('user'));
    // console.log(check);

    this.getAllUsers(this.userId);


  }
  logout(){
        this.http.
      get(`${CONFIG.BACKEND_API}/api/user/logout`).toPromise()
    .then((res: {msg: string}) =>{
      if(res.msg=== "Logged off" ){
        localStorage.clear();
        this.loggedIn = false;
        console.log(this.isAdmin)
        console.log(this.userId)
        console.log(this.loginUser)
      this.router.navigateByUrl('/login');

      
    }
    })
    .catch(e => {
      console.log(e);
      if(e.statusText === 'Unauthorized'){
        // this.loading =false;
        // this.error = 'Failed to login!'
        
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
  getAllUsers(id){
    this.http
    .get(`${CONFIG.BACKEND_API}/api/users/list`)
    .toPromise()
    .then(res => {
     data=res;
     data.forEach(element => {
       if(element.UserID=== id){
         this.userDetails = element;
       }
       
     });


    })
    .catch(e => {
      console.log(e);
    });
  }

  

}
