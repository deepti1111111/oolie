import { Component, EventEmitter, Input, ViewChild, OnInit, OnDestroy, AfterViewInit, Output } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { param } from 'jquery';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  private readonly notifier: NotifierService;
  public error: string = "";
  public success: string = "";
  public is_admin: boolean = false;
  public BASE_URL: string = "";
  public admin_info: any = { email: "admin@yopmail.com", password: 'admin123' };
  public headers: any = {};
  public TOKEN: string = "";

  public school: any = {
    schoolId: false,
    schoolName: '',
    address: '',
    state: '',
    city: ''

  };
  public params: string = '';
  public new_user: boolean = true;
  constructor(private activeRoute: ActivatedRoute, private router: Router, public global: Globals, private http: HttpClient, notifierService: NotifierService) {
    console.log(this.global.APIURL);
    this.notifier = notifierService;
    this.BASE_URL = this.global.APIURL;
    let locals = localStorage.getItem('user');
    if (locals) {
      this.TOKEN = JSON.parse(locals).token;
    }
    else {
      this.TOKEN = "";
    }

    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': this.TOKEN
    });

    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.params = params.schoolInfo;
      if (this.params == 'add-school') {
        console.log(this.params + "sdds")
        this.new_user = true;
        this.school = {
          schoolId: false,
          schoolName: '',
          address: '',
          state: '',
          city: ''
        };
      }
      else {
        this.new_user = false;  
        console.log(this.params + "sdds")
        let temp:any = JSON.parse(this.params);
        console.log(temp);
        this.school = temp;
        console.log(this.school);
      }
    });
  }

  ngOnInit(): void {
  }
  formValidated(){
    let result = true ;
    if(this.school.schoolName == "" || this.school.address == "" || this.school.state == "" || this.school.city == ""){
     this.error = "please enter all required field(s)" ;
      result = false;
    }
    return result;
  }
  submit() {
    this.error = "";
    this.success = "";
    console.log(this.school);
    let valid : boolean = this.formValidated();

    if(valid){
      let url = `${this.global.APIURL}admin/updateSchool`;
      if (this.new_user) {
        delete this.school['id'];
        url = `${this.global.APIURL}admin/addSchool`;
      }
      this.http.post(
        url, this.school, {
        headers: this.headers
      })
        .subscribe(
          responseData => {
            let response: any = responseData;
            this.success = response.message;
            console.log(response);
            if (this.new_user) {
            this.school= {
              schoolId: false,
              schoolName: '',
              address: '',
              state: '',
              city: ''
            };
          }
          this.router.navigate(['/schools']);

          },
          error => {
            this.error = error.error.message;
            console.log(error);
          }
        );
    }
  
  }




}
