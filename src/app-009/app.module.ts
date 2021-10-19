import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { Globals } from './globals';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { UserComponent } from './user/user.component';
import { SchoolComponent } from './school/school.component';
import { CommentComponent } from './comment/comment.component';
import { SettingComponent } from './setting/setting.component';
import { UsersComponent } from './users/users.component';
import { SchoolsComponent } from './schools/schools.component';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { NotifierModule,NotifierOptions } from 'angular-notifier';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';



const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    DashbaordComponent,
    UserComponent,
    SchoolComponent,
    CommentComponent,
    SettingComponent,
    UsersComponent,
    SchoolsComponent,
    AdmindetailsComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    DataTablesModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
