import { Component,OnInit, OnDestroy, OnChanges, SimpleChange, Input} from "@angular/core";
import {FormControl} from '@angular/forms';
import {Form} from '../post.model';
import {NgForm,FormArray,FormBuilder,FormGroup } from "@angular/forms";
import { Subscription } from 'rxjs';
import { FormsService } from '../post.service';
import { sltoutmodel } from '../slt-out.model';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { user } from '../user-data.model';
import { courses } from '../course.model';
import { align } from '../align.model';
import { sltData } from '../sltData.model';
import { MatDialog } from '@angular/material';
import { WeightErrorComponent } from '../errorweight/errorweight.componet';

@Component({
  selector:'app-slt-form',
  templateUrl:'./slt-form.component.html',
  styleUrls:['./slt-form.component.css']
})


export class SltFormComponent implements OnInit,OnDestroy{

  SltControl = new FormControl();
  course:courses[]=[];
  sltFormData:FormGroup;
  row1:FormArray;
  examstoreId='';
  examHourMeet=0;
  examHourReady=0;
  examcheckFinal;
  maxCredit;

  checkEdit=false;
  inputDisable=true;
  private postId:string;
  courseId;
  rowId;
  finalExamWeight=0;
  sltForms:sltoutmodel;
  align:align[]=[];
  assessData:align[]=[];
  finalExam:sltData[]=[];
  contAssessData:sltData[]=[];
  teachData:sltData[]=[];
  countRow=1;

  // private sltFormSubs :Subscription;
  constructor(public formsService: FormsService ,private dialog:MatDialog,public route:ActivatedRoute,private formBuilder:FormBuilder){}


  users:user[];
  creditHour;
  private courseSub :Subscription;
  private userSub : Subscription;

  ngOnInit(){

    this.sltFormData = this.formBuilder.group({
      teachLearn:this.formBuilder.array([this.createTeachLearn()]),
      contAssessment:this.formBuilder.array([this.createContAssessment()]),
      // sumActivityAssessment:'',
      sumHourMeetAssessment:0,
      sumHourReadyAssessment:0,
      checkFinal:'',
      examId:'',
      examWeight:0,
    });



    this.formsService.getUserInfo();
    this.userSub=this.formsService.getUserUpdateListener()
    .subscribe((user:user[])=>{
      this.users=user;
    });

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.courseId = paramMap.get('id');
      this.formsService.getCourseDetail(this.courseId);
      this.formsService.getCourse();


      this.courseSub=this.formsService.getCourseDetailListener().subscribe((course)=>{
        this.course=course;

      });


      this.creditHour=this.formsService.getCredit(this.courseId);
      this.contAssessData=this.formsService.getContAssessData(this.courseId);
      this.finalExam=this.formsService.getSumAssessData(this.courseId);
      this.teachData=this.formsService.getTeachLearnData(this.courseId);
      this.align=this.formsService.getEditalignment(this.courseId);
      this.assessData=this.formsService.getEditassess(this.courseId);
      // console.log(this.creditHour[0].credit);


      if(this.creditHour.length>0){
        console.log(this.creditHour)
        this.maxCredit=this.creditHour[0].credit;
        // console.log(this.maxCredit)
      }


      for(var i=0;i<this.assessData.length;i++){
        if(this.countRow!==this.assessData[i].CloInfo[0].rowId){

          this.finalExamWeight=this.finalExamWeight+this.assessData[i].CloInfo[0].finalExam;
          this.countRow++;
          // console.log(this.assessData[i].CloInfo[0].rowId);
        }
      }
      // for(var j=0;j<assess.length;j++){
      //   if(assess[j].CloInfo[0].rowId==countRow  && countRow<clo.length+1){
      //     this.finalTemp[countRow-1]=assess[j].CloInfo[0].finalExam;
      //     countRow++
      //     // console.log("this.finalTemp[this.countRow]")
      //   }


      if(this.assessData.length>0){
        if(this.finalExam.length>0){
          this.examstoreId=this.finalExam[0].examId;
          this.examHourMeet=this.finalExam[0].sumHourMeetAssessment;
          this.examHourReady=this.finalExam[0].sumHourReadyAssessment;
          this.examcheckFinal=this.finalExam[0].checkFinal;
        }
        this.sltFormData.patchValue({
          // teachLearn:this.formBuilder.array([this.createTeachLearn()]),
          // contAssessment:this.formBuilder.array([this.createContAssessment()]),
          sumHourMeetAssessment:this.examHourMeet,
          sumHourReadyAssessment:this.examHourReady,
          examId:this.examstoreId,
          checkFinal:this.examcheckFinal,
          examWeight:this.finalExamWeight,
        })
        this.sltFormData.setControl('teachLearn',this.setTeachLearn(this.align,this.teachData));
        this.sltFormData.setControl('contAssessment',this.setCont(this.assessData,this.contAssessData));
      }

    })


    this.meetCal(this.sltFormData);
    this.notMeetCal(this.sltFormData);
    this.readyCal(this.sltFormData);
    this.contCal(this.sltFormData);
    this.sumCal(this.sltFormData);

    this.calSummativeMeetTotal(this.sltFormData);
    this.calSummativeReadyTotal(this.sltFormData)

  }


checkAssess;
assess=[];
weight=[];
contAsses=[];
check;
same=false;
temp;
countAssess=0;


conthourMeetCont=0;
conthourNotMeetCont=0;
conthourReadyCont=0;
contweekReadyCont=0;
contstoreId='';
editCheckCont;



  setCont(cont,editCont):FormArray{
  const formArray = new FormArray([]);
    for(var i=0;i<cont.length;i++){
      this.weight[i]=cont[i].CloInfo[0].weightage;
      this.check=cont[i].CloInfo[0].assessment;
      for(var j=0;j<this.contAsses.length;j++){
        if(this.check==this.contAsses[j]){
          this.same=true;
        }
      }

      if(this.same){
        // console.log("same");
        for(var c=0;c<this.contAsses.length;c++){

          if(this.contAsses[c]===this.check){
            this.weight[c]=this.weight[c]+cont[i].CloInfo[0].weightage;
          }
        }
      }else if(!this.same){
        this.contAsses[this.countAssess]=this.check;
        this.weight[this.countAssess]=cont[i].CloInfo[0].weightage;
        // console.log(this.check);
        this.countAssess++
      }
      this.same=false;
    }
      console.log(editCont)
    for(var k=0;k<this.contAsses.length;k++){

      this.conthourMeetCont=0;
      this.conthourNotMeetCont=0;
      this.conthourReadyCont=0;
      this.contweekReadyCont=0;
      this.contstoreId='';
      this.editCheckCont='';
      if(editCont.length>0 && k<editCont.length){
        this.conthourMeetCont=editCont[k].contAssessment[0].hourMeetCont;
        this.conthourNotMeetCont=editCont[k].contAssessment[0].hourNotMeetCont;
        this.conthourReadyCont=editCont[k].contAssessment[0].hourReadyCont;
        this.contweekReadyCont=editCont[k].contAssessment[0].weekReadyCont;
        this.contstoreId=editCont[k].contAssessment[0].contId;
        this.editCheckCont=editCont[k].contAssessment[0].checkCont;
      }


      formArray.push(
          this.formBuilder.group({
            activitiesCont:this.contAsses[k],
            weightage:this.weight[k],
            hourMeetCont:this.conthourMeetCont,
            hourNotMeetCont:this.conthourNotMeetCont,
            hourReadyCont:this.conthourReadyCont,
            weekReadyCont:this.contweekReadyCont,
            contId:this.contstoreId,
            checkCont:this.editCheckCont,

          })
        )
    }
    return formArray;
  }

  teachAct=[];
  checkSame=false;
  holdAct;
  countTeach=0;
  teachhourMeet=0;
  teachweekMeet=0;
  teachhourNotMeet=0;
  teachweekNotMeet=0;
  teachhourReady=0;
  teachweekReady=0;
  teachstoreId='';
  editCheckTeach;



  setTeachLearn(learn,editTeach):FormArray{
    const formArray =new FormArray([]);
    for(var i=0;i<learn.length;i++){
      // console.log(learn[i].CloInfo[0].strategies);
      this.holdAct=learn[i].CloInfo[0].strategies;
      for(var j=0;j<this.teachAct.length;j++){
        if(this.holdAct===this.teachAct[j]){
          // console.log("hai")
          this.checkSame=true;
        }
      }
      if(!this.checkSame){
        this.teachAct[this.countTeach]=this.holdAct;
        console.log(this.holdAct);
        this.countTeach++;
      }

      this.checkSame=false;

    }
    for(var c=0;c<this.countTeach;c++){
      this.teachhourMeet=0;
      this.teachweekMeet=0;
      this.teachhourNotMeet=0;
      this.teachweekNotMeet=0;
      this.teachhourReady=0;
      this.teachweekReady=0;
      this.teachstoreId='';
      this.editCheckTeach='';
      if(editTeach.length>0 && c<editTeach.length && editTeach[c].teachLearn[0].checkExist=="1"){
        this.teachhourMeet=editTeach[c].teachLearn[0].hourMeet;
        this.teachweekMeet=editTeach[c].teachLearn[0].weekMeet;
        this.teachhourNotMeet=editTeach[c].teachLearn[0].hourNotMeet;
        this.teachweekNotMeet=editTeach[c].teachLearn[0].weekNotMeet;
        this.teachhourReady=editTeach[c].teachLearn[0].hourReady;
        this.teachweekReady=editTeach[c].teachLearn[0].weekReady;
        this.teachstoreId=editTeach[c].teachLearn[0].teachId;
        this.editCheckTeach=editTeach[c].teachLearn[0].checkExist;
      }

      formArray.push(
        this.formBuilder.group({
          activities:this.teachAct[c],
          hourMeet: this.teachhourMeet,
          weekMeet:this.teachweekMeet,
          hourNotMeet:this.teachhourNotMeet,
          weekNotMeet:this.teachweekNotMeet,
          hourReady:this.teachhourReady,
          weekReady:this.teachweekReady,
          teachId:this.teachstoreId,
          checkExist:this.editCheckTeach,

        })
      )
    }
    return formArray;
  }
  createTeachLearn(): FormGroup{
    return this.formBuilder.group({
      activities:'',
      hourMeet:0,
      weekMeet:0,
      hourNotMeet:0,
      weekNotMeet:0,
      hourReady:0,
      weekReady:0,
      teachId:'',
      checkExist:''
    });
  }

  createContAssessment():FormGroup{
    return this.formBuilder.group({

      activitiesCont:'',
      weightage:0,
      hourMeetCont:0,
      hourNotMeetCont:'0',
      hourReadyCont:0,
      weekReadyCont:0,
      contId:'',
      checkCont:'',

    });
  }




  addTeachLearnRowButton(){
    (<FormArray>this.sltFormData.get('teachLearn')).push(this.createTeachLearn());
  }

  addcontAssessment(){
    (<FormArray>this.sltFormData.get('contAssessment')).push(this. createContAssessment());
  }

  removeTeachLearnButton(i){

    (<FormArray>this.sltFormData.get('teachLearn')).removeAt(i);
  }
  removeContAssessmentButton(i){

    (<FormArray>this.sltFormData.get('contAssessment')).removeAt(i);
  }

  totalMeethour=[];
  totalNotMeethour=[];
  totalReady=[];
  totalmeet=0;
  totalnotmeet=0;
  totalready=0;
  public totalLearnTime=0;


  // getCreditHour(credit){
  //   console.log(credit);
  // }

  meetCal(v){

    this.totalmeet=0;
    for(var i =0;i<v.value.teachLearn.length;i++){
      this.totalMeethour[i]=v.value.teachLearn[i].hourMeet*v.value.teachLearn[i].weekMeet;
      // console.log(this.totalMeethour[i]);
      this.totalmeet=this.totalmeet+this.totalMeethour[i];
    }
    this.learnTime();
  }

  notMeetCal(v){
    this.totalnotmeet=0;
    for(var i =0;i<v.value.teachLearn.length;i++){
      this.totalNotMeethour[i]=v.value.teachLearn[i].hourNotMeet*v.value.teachLearn[i].weekNotMeet;
      this.totalnotmeet=this.totalnotmeet+this.totalNotMeethour[i];
    }
    this.learnTime();
  }

  readyCal(v){
    this.totalready=0;
    for(var i =0;i<v.value.teachLearn.length;i++){
      this.totalReady[i]=v.value.teachLearn[i].hourReady*v.value.teachLearn[i].weekReady;
      this.totalready=this.totalready+this.totalReady[i];
    }
    this.learnTime();
  }

  stulearnTime=[];
  cnvrtTotalLearnTime=0;
  cnvrtMeetHour=0;
  cnvrtNotMeetHour=0;
  cnvrtReadyMeetHour=0;

  learnTime(){
    this.totalLearnTime=0;
    for(var i =0;i<this.sltFormData.value.teachLearn.length;i++){

      if(this.totalMeethour[i]<=0|| this.totalNotMeethour[i] <=0 || this.totalReady[i] <=0)
      {
        this.cnvrtMeetHour=0;
        this.cnvrtNotMeetHour=0;
        this.cnvrtReadyMeetHour=0;

        // console.log("test"+this.cnvrtReadyMeetHour)
      }else if (this.totalMeethour[i]>0 && this.totalNotMeethour[i]>0 && this.totalReady[i]>0){
        this.cnvrtMeetHour=+this.totalMeethour[i];
        this.cnvrtNotMeetHour=+this.totalNotMeethour[i];
        this.cnvrtReadyMeetHour=+this.totalReady[i]
      }

      this.stulearnTime[i]=this.cnvrtMeetHour+this.cnvrtNotMeetHour+this.cnvrtReadyMeetHour;
      this.cnvrtTotalLearnTime=+this.stulearnTime[i];
      this.totalLearnTime=this.totalLearnTime+this.cnvrtTotalLearnTime;
    }
    // console.log("this is slt "+this.totalLearnTime);
    this.calTotalSLT();

  }

  contTimeReady=[];
  contMeetHour=[];
  contNotMeetHour=[];
  totalContTimeReady=0;
  contLearnTime=[];
  totalMeetForm=0;
  totalNotMeetForm=0;
  totalReadyForm=0;
  totalSLT=0;
  calTotalContMeet=0;
  totalContLearnTime=0;


  convrtHourReady=0;
  convrtWeekReady=0;
  contCal(v){

    this.totalContTimeReady=0;
    this.calTotalContMeet=0;
    this.totalNotMeetForm=0;
    this. totalContLearnTime=0;


    for(var i =0;i<v.value.contAssessment.length;i++){

      this.numConvrt=+v.value.contAssessment[i].hourMeetCont
      this.contMeetHour[i]=this.numConvrt;

      this.numConvrt=+v.value.contAssessment[i].hourNotMeetCont;
      this.contNotMeetHour[i]=this.numConvrt;

      this.convrtHourReady=+v.value.contAssessment[i].hourReadyCont;
      this.convrtWeekReady=+v.value.contAssessment[i].weekReadyCont;

      this.contTimeReady[i]=this.convrtHourReady*this.convrtWeekReady;
      this.numConvrt=+this.contTimeReady[i];
      this.totalContTimeReady=this.totalContTimeReady+this.numConvrt;

      this.contLearnTime[i]=this.contTimeReady[i]+this.contNotMeetHour[i]+this.contMeetHour[i];
      this.numConvrt=+this.contMeetHour[i];
      this.calTotalContMeet=this.calTotalContMeet+this.numConvrt;
      this.totalNotMeetForm=this.totalNotMeetForm+this.contNotMeetHour[i];
      this.numConvrt=+this.contLearnTime[i];
      this.totalContLearnTime=this.totalContLearnTime+this.numConvrt;

    }
    this.calTotalSLT();
    this.calSummativeMeetTotal(v);
    this.sumCal(v);
  }


  sumLearnTime=0;
  assessLearnTime=0;
  convertNum1;
  convertnum2;

  sumCal(v){
    this.totalReadyForm=0;
    this.totalMeetForm=0;
    this. convertNum1=+v.value.sumHourMeetAssessment;
    this.convertnum2=+v.value.sumHourReadyAssessment;
     this.sumLearnTime=this. convertNum1+this.convertnum2;

     this.totalMeetForm=this.totalMeetForm+v.value.sumHourMeetAssessment;
     this.assessLearnTime=+this.sumLearnTime+this.totalContLearnTime;

     this.calTotalSLT();
     this.calSummativeMeetTotal(v);
     this.calSummativeReadyTotal(v);
  }


  calTotalSLT(){
    // console.log("this is cont"+this.totalContLearnTime);
    // this.sumLearnTime=0;
    this.numConvrt=+this.totalContLearnTime;
      this.totalSLT=this.totalLearnTime+this.sumLearnTime+ this.numConvrt;
      this.calCredit();
  }

  totalCredit=0;
  calCredit(){
    this.totalCredit=Math.round(this.totalSLT/40);;

  }
  numConvrt=0;

 calSummativeMeetTotal(v){
  this.totalMeetForm=0;
  this.numConvrt=+v.value.sumHourMeetAssessment;
  this.totalMeetForm=this.totalMeetForm+this.numConvrt+this.calTotalContMeet;


  for(var i =0;i<v.value.contAssessment.length;i++){
    this.totalMeetForm=this.totalMeetForm+this.contMeetHour[i];
  }
 }

 calSummativeReadyTotal(v){
  this.totalReadyForm=this.totalContTimeReady +v.value.sumHourReadyAssessment;
 }


 ngOnDestroy(){
   this.courseSub.unsubscribe();
   this.userSub.unsubscribe();
 }


 saveSltData(data){
  // console.log(data.value);

  if(this.totalCredit<this.maxCredit){
    this.dialog.open(WeightErrorComponent, {data :{message:"Your credit hour is low"}});
    return;
  }else if(this.totalCredit>this.maxCredit){
    this.dialog.open(WeightErrorComponent, {data :{message:"Your credit is high"}});
    return;
  }

  this.formsService.saveContAssess(this.courseId,data.value.examId,data.value.sumHourMeetAssessment,data.value.sumHourReadyAssessment,data.value.checkFinal,data.value.examWeight,data.value.contAssessment
    ,data.value.teachLearn);
}





}
