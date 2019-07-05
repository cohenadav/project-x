import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/config/config';
import { Router } from '@angular/router';
let data: any;

@Injectable()
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
