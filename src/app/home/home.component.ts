//import { Component, OnInit } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UrlSegment, Router } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly notifier: NotifierService;
  public error: string = "";
  public BASE_URL: string = "";
  public admin_info: any = { email: "", password: '' };
  public headers: any = {};
  constructor(private router: Router, public global: Globals, private http: HttpClient, notifierService: NotifierService) {
    console.log(this.global.APIURL);
    this.notifier = notifierService;
    this.BASE_URL = this.global.APIURL;

    this.headers = new HttpHeaders({
      "Content-Type": "application/json",

      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    });


  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.admin_info);
    this.http.post(
      this.global.APIURL + 'admin/login', this.admin_info, {
      headers: this.headers
    })
      .subscribe(
        responseData => {
          console.log(responseData);
          let response: any = responseData;
          console.log(response);
          this.notifier.notify('success', 'You are awesome! I mean it!');
          let userdata: any = {
            name: response.name,
            profile: response.profilePhoto,
            token: response.token,
          };
          console.log(userdata);
          localStorage.setItem('user', JSON.stringify(userdata));
          window.location.href = "dashboard";
        },
        error => {
          this.error = error.error.message;
        }
      );
    return false;
  }


  public isforget: boolean = false;
  forget() {
    this.isforget = !this.isforget;
  }
  forgotPassword() {

    console.log(this.admin_info);
    this.http.post(

      this.global.APIURL + 'admin/forgotPassword', this.admin_info, {
      headers: this.headers
    })
      .subscribe(
        responseData => {
          console.log(responseData);
          let response: any = responseData;
          if(response.status == "FAILED")
          {
            this.notifier.notify('error', response.message);
          }
          else
          {
            this.notifier.notify('success', response.message);
          }
          
        },
        error => {
          this.error = error.error.message;
        }
      );


  }

}
