import { Component,OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {Form} from '../post.model';
import { FormsService } from '../post.service';
import { courses } from '../course.model';

@Component({
  selector: 'app-form-list',
  templateUrl:'./form-list.component.html',
  styleUrls: ['./form-list.component.css']
})

export class FormListComponent implements OnInit,OnDestroy{
  // posts = [
  //   {title: 'First Post',content:"this is a post"},
  //   {title: 'Second Post',content:"this is a post"},
  //   {title: 'Third Post',content:"this is a post"}
  // ]
  forms: Form[] = [];
  private formsSub :Subscription;
  course:courses[]=[]
  isLoading=false;



  constructor(public formsService: FormsService){}


  ngOnInit(){
    this.isLoading=true;

    this.formsService.getTeachRef();
    this.formsService.getWeekOther();
    this.formsService.getForms();
    this.formsService.getWeekInfo();
    this.formsService.getCourseReference();
    this.formsService.getTeachData();
    this.formsService.getContAssess();
    this.formsService.getExamData()
    this.formsService.getSltData();
    this.formsService.getCurrentCourse();
    this.formsService.getAlignmentData();
    this.formsService.getAssessData();
    this.formsService.getMaxCredit();
    this.formsSub = this.formsService.getCourseListener()
    .subscribe((coursees:courses[])=>{
      // console.log(coursees)
      this.isLoading=false;
      this.course = coursees;

    });

  }

  onDelete(postId:string){
  this.formsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.formsSub.unsubscribe();
  }

}
