import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormcreateComponent} from './lecturer-form/form-create/form-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormListComponent} from "./lecturer-form/form-list/form-list.component";
import {HeaderComponent} from './header/header.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoginComponent} from './auth/login/login.component';
import{SignupComponent} from './auth/signup/signup.component';
import {HomeComponent} from './home/home.component';
import { SltFormComponent } from './lecturer-form/slt-form/slt-form.component';
import {
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatButtonModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatDialogModule

} from '@angular/material';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { FormsService } from './lecturer-form/post.service';
import { WeightErrorComponent } from './lecturer-form/errorweight/errorweight.componet';
import { EmptyInputComponent } from './lecturer-form/emptyinput/emptyinput.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorAuthComponent } from './error/error-auth.component';
import { CourseInformationComponent } from './lecturer-form/Course-Information/course-information.component';


@NgModule({
  declarations: [
    AppComponent,
    FormcreateComponent,
    FormListComponent,
    CourseInformationComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    SltFormComponent,
    EmptyInputComponent,
    WeightErrorComponent,
    ErrorAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatOptionModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    FormsService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}

  ],
  bootstrap: [AppComponent],
  entryComponents:[WeightErrorComponent,EmptyInputComponent,ErrorAuthComponent]
})
export class AppModule { }
