import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListComponent } from './lecturer-form/form-list/form-list.component';
import { FormcreateComponent } from './lecturer-form/form-create/form-create.component';
import { LoginComponent } from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component'
import { HomeComponent } from './home/home.component';
import { SltFormComponent } from './lecturer-form/slt-form/slt-form.component';
import { Authguard } from './auth/auth-guard';
import { CourseInformationComponent } from './lecturer-form/Course-Information/course-information.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent,canActivate:[Authguard]},
  {path:'create',component: FormcreateComponent, canActivate:[Authguard] },
  {path:'',component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path: 'list', component: FormListComponent,canActivate:[Authguard]},
  {path: 'slt/:id', component: SltFormComponent,canActivate:[Authguard]},
  {path:'edit/:id',component: FormcreateComponent,canActivate:[Authguard]},
  {path:'courseInfomation/:id',component: CourseInformationComponent,canActivate:[Authguard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[Authguard]
})
export class AppRoutingModule { }
