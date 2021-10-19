import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router } from '@angular/router';

import {DomSanitizer} from '@angular/platform-browser';
import { Globals } from '../globals';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public is_admin: boolean = false;
  public admin_info: any = {};
  public BASE_URL:string = "";
  public headers:any = {};
  public TOKEN:string = "";
  constructor(private router: Router,public global: Globals, private http: HttpClient,private sanitizer:DomSanitizer) {

    this.BASE_URL = this.global.APIURL;


    
  }

  ngOnInit(): void {

    this.sessionStatus();


  }

  sanitize(url:string){
    
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sessionStatus(): void {
    let userdata = localStorage.getItem('user');
    console.log(userdata);
    if (userdata) {
      this.is_admin = true;
      this.admin_info = JSON.parse(userdata);
      this.TOKEN = this.admin_info.token
      console.log("user is logged IN");
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        'token': this.TOKEN
      });
      //this.router.navigate(['dashboard']);
    } else {
      console.log("User is not logged IN ");
      this.is_admin = false;
      this.router.navigate(['/']);
    }
  }


  public toggle:boolean = true;
  toggleNav(slidenav:boolean){
    this.toggle = !slidenav;
    console.log(this.toggle)

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
