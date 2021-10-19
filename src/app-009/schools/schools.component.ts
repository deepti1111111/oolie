import { Component, EventEmitter, Input, ViewChild,OnInit, OnDestroy,AfterViewInit,Output} from '@angular/core';
import { UrlSegment, Router } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { param } from 'jquery';


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  // dtOptions: DataTables.Settings = {};
  
  
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


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getUserList(): void
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
          this.dtTrigger.next();
          console.log(this.school_list);
        },
        error => {
          this.error = error.error.message;
        }
      );

  }
  addEditSchool(school:any)
  {
    console.log(school);
    let params = (school)?JSON.stringify(school):'add-school';
    this.router.navigate(['school', params]);

  }
  block(status:boolean,schoolId:string)
  {
    let formdata = {schoolId:schoolId};
    this.http.post(
      `${this.global.APIURL}admin/blockSchool`, formdata, {
      headers: this.headers
    })
      .subscribe(
        responseData => {
          let response:any = responseData;
          this.getSchoolList();
          console.log(response);
        },
        error => {
          this.error = error.error.message;
        }
      );
  }

  unblock(status:boolean, schoolId:string){
    let formdata = {schoolId:schoolId};
    this.http.post(
      `${this.global.APIURL}admin/unblockSchool`, formdata ,{
      headers: this.headers
    })
      .subscribe(
        responseData => {
          let response:any = responseData;
          this.getSchoolList();
          console.log(response);
        },
        error => {
          this.error = error.error.message;
        }
      );


  }

}
