import { Component, EventEmitter, Input, ViewChild,OnInit, OnDestroy,AfterViewInit,Output} from '@angular/core';
import { UrlSegment, Router } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders,HttpResponse  } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit ,OnDestroy  {

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
          this.dtTrigger.next();
          
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

  addEditUser(user:any)
  {
    console.log(user);
  }

  deleteUser(userId:any)
  {
    if(confirm("Are you sure to delete ")){
      this.http.get(
        `${this.global.APIURL}admin/deleteUser/${userId}`,  {
        headers: this.headers
      })
        .subscribe(
          responseData => {
            //this.notifier.notify('sucess','deleted');
            this.getUserList();
           
          },
          error => {
            this.error = error.error.message;
          }
        );
    }
  

  }
  block(status: boolean, userId: string){
    let formdata = {userId:userId};
    if(confirm("Are you sure to block ")){
      this.http.post(
        `${this.global.APIURL}admin/blockUser`, formdata, {
        headers: this.headers
      })
        .subscribe(
          responseData => {
            let response:any = responseData;
            this.notifier.notify('success',response.message);
            this.getUserList();
  
            console.log(response);
          },
          error => {
            this.error = error.error.message;
          }
        );
    }
  

  }
  unblock(status: boolean, userId: string){

    let formdata = {userId:userId};
    if(confirm("Are you sure to unblock ")){
      this.http.post(
        `${this.global.APIURL}admin/unblockUser`, formdata, {
        headers: this.headers
      })
        .subscribe(
          responseData => {
            let response:any = responseData;
            console.log(response);
            this.notifier.notify('success',response.message);
            this.getUserList();
  
            console.log(response);
          },
          error => {
            this.error = error.error.message;
          }
        );
    }
  
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
