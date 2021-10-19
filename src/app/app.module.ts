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
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotifierModule,NotifierOptions } from 'angular-notifier';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { CommentComponent } from './comment/comment.component';
import { SchoolComponent } from './school/school.component';
import { SchoolsComponent } from './schools/schools.component';
import { SettingComponent } from './setting/setting.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 15,
    },
    vertical: {
      position: 'top',
      distance: 15 ,
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
    DashboardComponent,
    AdmindetailsComponent,
    CommentComponent,
    SchoolComponent,
    SchoolsComponent,
    SettingComponent,
    UserComponent,
    UsersComponent
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
