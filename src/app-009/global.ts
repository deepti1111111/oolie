import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  private Token: string  = "";
  public APIURL:string = "http://35.160.227.253:8088/"

  getToken() {
    return this.Token;
  }
  setToken(tk: string) {
    this.Token = tk;
  }


  ValidateEmail(inputEmailTxt: any) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputEmailTxt.match(mailformat)) {

      return true;
    }
    else {
      //alert("You have entered an invalid email address!");

      return false;
    }
  }

  phonenumber(inputtxt: any) {
    var phoneno1 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    var phoneno2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneno3 = /^\d{10}$/;
    if (inputtxt.match(phoneno1) || inputtxt.match(phoneno2) || inputtxt.match(phoneno3)) {
      return true;
    }
    else {
      return false;
    }
  }


}
