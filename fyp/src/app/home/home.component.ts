import {Component, OnInit} from '@angular/core';
import { FormsService } from '../lecturer-form/post.service';
import { Subscription } from 'rxjs';
import { user } from '../lecturer-form/user-data.model';


@Component({
  selector : 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']

})

export class HomeComponent implements OnInit{
  isLoading=false;
  imagePath="./assets/images/Scottsview.jpg"

  private userSub : Subscription;
  users:user[];
  constructor(public formsService:FormsService){}

  ngOnInit(){
    this.formsService.getUserInfo();
    this.userSub=this.formsService.getUserUpdateListener()
    .subscribe((user:user[])=>{
      this.users=user;
    });
  }
}
