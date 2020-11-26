import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector : 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.css']

})

export class SignupComponent implements OnInit,OnDestroy{
  isLoading=false;

  constructor(public authService: AuthService){}
  private authStatusSub:Subscription;
  ngOnInit(){
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe();
    authStatus=>{
      this.isLoading=false;
    }
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
  onSignup(form:NgForm){


      if(form.invalid){
        return;
      }
      console.log("LecturerName "+form.value.LecturerName);
      this.authService.createUser(form.value.LecturerName,form.value.username,form.value.password);
      this.isLoading=true;
  }
}
