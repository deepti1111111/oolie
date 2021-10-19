import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UrlSegment, Router } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private readonly notifier: NotifierService;
  public error: string = "";
  public is_admin: boolean = false;
  public BASE_URL: string = "";
  public admin_info: any = { email: "admin@yopmail.com", password: 'admin123' };
  public headers: any = {};
  public TOKEN:string = "";

  public user_list:any = [];
  public school_list:any = [];


  constructor(private router: Router, public global: Globals, private http: HttpClient, notifierService: NotifierService) {
    console.log(this.global.APIURL);
    this.notifier = notifierService;
    this.BASE_URL = this.global.APIURL;
    let locals = localStorage.getItem('user');
    if(locals)
    {
      this.TOKEN = JSON.parse(locals).token;
    }
    else{
      this.TOKEN = "";
    }

    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': this.TOKEN
    });


  }


  ngOnInit(): void {
    this.getUserList();
    this.getSchoolList();
  }

  getUserList()
  {
    this.http.get(
      `${this.global.APIURL}admin/getAllUsers`,  {
      headers: this.headers
    })
      .subscribe(
        responseData => {
          let response:any = responseData;

          this.user_list = response.list;
          console.log(this.user_list);
        },
        error => {
          this.error = error.error.message;
          if(error.status == 401){
            this.logout();
          }
        }
      );

  }

  getSchoolList()
  {
    this.http.get(
      `${this.global.APIURL}admin/getSchoolList`,  {
      headers: this.headers
    })
      .subscribe(
        responseData => {
          let response:any = responseData;
          this.school_list = response.list;
          console.log(this.school_list);
        },
        error => {
          this.error = error.error.message;
          if(error.status == 401){
            this.logout();
          }
        }
      );

  }



  logout()
  {
    this.http.get(this.global.APIURL+"admin/logout",this.headers)
    .subscribe(
      responseData=>{
        this.is_admin = false;
        localStorage.removeItem('user');
        window.location.reload();

      },
      error=>{
        localStorage.removeItem('user');
        window.location.reload();
    
      }
    );
    localStorage.removeItem('user');
    window.location.reload();
  }




}
