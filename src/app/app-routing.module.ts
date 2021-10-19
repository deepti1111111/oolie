import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { CommentComponent } from './comment/comment.component';
import { SchoolComponent } from './school/school.component';
import { SchoolsComponent } from './schools/schools.component';
import { SettingComponent } from './setting/setting.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'school/:schoolInfo', component: SchoolComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'users', component: UsersComponent },
  { path: 'schools', component: SchoolsComponent },
  { path: 'admin-details', component: AdmindetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

