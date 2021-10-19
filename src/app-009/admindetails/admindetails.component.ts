import { Component, EventEmitter, Input, ViewChild,OnInit, OnDestroy,AfterViewInit,Output} from '@angular/core';
import { UrlSegment, Router } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-admindetails',
  templateUrl: './admindetails.component.html',
  styleUrls: ['./admindetails.component.css']
})
export class AdmindetailsComponent implements OnInit {

  private readonly notifier: NotifierService;
  public error: string = "";
  public success: string = "";
  
  public is_admin: boolean = false;
  public BASE_URL: string = "";
  
  public headers: any = {};
  public TOKEN:string = "";

  public passwordObj:any = {
    oldPassword: "",
    newPassword: "",
    confirmPassword:''
  }
  public admin_details:any = {};

  public api:string = "/admin/resetPassword";
  constructor(private router: Router, public global: Globals, private http: HttpClient, notifierService: NotifierService) {
    console.log(this.global.APIURL);
    this.notifier = notifierService;
    this.BASE_URL = this.global.APIURL;
    let locals = localStorage.getItem('user');

    if(locals)
    {
      this.admin_details =JSON.parse(locals); 
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
    
  }

  updatePassword()
  {
    if(this.passwordObj.oldPassword == "")
    {
      this.error = "Please enter old password";
    } else if(this.passwordObj.newPassword == "")
    {
      this.error = "Please enter new password";
    }
    else if(this.passwordObj.newPassword != this.passwordObj.confirmPassword)
    {
      this.error = "Password does not matched";
      
    }
    else{
      this.http.post(
        `${this.global.APIURL}${this.api}`, this.passwordObj, {
        headers: this.headers
      })
        .subscribe(
          responseData => {
            let response:any = responseData;
            this.success = response.message;
            this.notifier.notify('success', response.message);
          },
          error => {
            this.error = error.error.message;
            
          }
        );
    }
   

  }

}
