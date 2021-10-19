import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { UserComponent } from './user/user.component';
import { SchoolComponent } from './school/school.component';
import { CommentComponent } from './comment/comment.component';
import { SettingComponent } from './setting/setting.component';
import { UsersComponent } from './users/users.component';
import { SchoolsComponent } from './schools/schools.component';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'user', component: UserComponent },
  { path: 'school/:schoolInfo', component: SchoolComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'users', component: UsersComponent },
  { path: 'schools', component: SchoolsComponent },
  { path: 'admin-details', component: AdmindetailsComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
