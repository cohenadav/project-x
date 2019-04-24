import { Component, OnInit, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import CONFIG from "src/config/config";

let data: any;

@Injectable()
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public homepageData: any = data;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (!this.homepageData) {
      this.getData();
    }
  }

  getData() {
    this.http
      .get(`${CONFIG.BACKEND_API}/homepage.json`)
      .toPromise()
      .then(res => {
        data = res;
        this.homepageData = data;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

// if(value is falsy) {
// it will NOT enter the if statement.
// }

// falsy: "", unrefined, null, 0,
