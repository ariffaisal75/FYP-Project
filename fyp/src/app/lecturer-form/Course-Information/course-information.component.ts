import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,FormArray,FormControl } from '@angular/forms';
import { FormsService } from '../post.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';
import { courses } from '../course.model';
import { sltData } from '../sltData.model';
import { user } from '../user-data.model';
import { currentCourse } from '../currentCourse.model';
// import { ConsoleReporter } from 'jasmine';



@Component({
  selector:'app-course-information',
  templateUrl:'./course-information.component.html',
  styleUrls:['./course-information.component.css']
})
export class CourseInformationComponent implements OnInit,OnDestroy{

  courseInformation:FormGroup;
  // teachTable:FormGroup;
  postId;
  course:courses[]=[];
  users:user[];
  private courseSub:Subscription;
  private userSub:Subscription;
  teachData:sltData[]=[];
  contAssessData:sltData[]=[];
  finalExamData:sltData[]=[];
  curCourseInfo:currentCourse[]=[];
  curCourseRef:currentCourse[]=[];
  weekOther:currentCourse[]=[];
  teachReference:currentCourse[]=[];
  teachDesc:currentCourse[]=[];


  teachMeetHour=0;
  teachNotMeetHour=0;
  teachreadyHour=0;
  contAssessMeetHour=0;
  contAssessNotMeetHour=0;
  contAssessReady=0;
  assessType=[];
  assessWeight=[];

  strategies=[];
  examWeight=0;
  totalMeetHour=0;
  totalNotMeetHour=0;
  totalStudentPrepare=0;
  totalContWeigtage=0;

  constructor(public formsService:FormsService,public route:ActivatedRoute,private dialog:MatDialog,private formBuilder:FormBuilder,private router:Router){}

  ngOnInit(){


    this.courseInformation=this.formBuilder.group({
        courseInfoId:'',
        // teachTable:this.formBuilder.array([this.createTeachTimeTable()]),
        checkEdit:'',
        medium:'',
        references:this.formBuilder.array([this.createReferences()]),
        teachTable:this.formBuilder.array([this.createTeachTimeTable()]),
        // table:this.formBuilder.array([this.createTeachTimeTable()]),
        skill:'',
        room:'',
        telephoneNo:'',
        lectureSession:'',
        lectureDay:'',
        lectureVenue:'',
        practicalSession:'',
        practicalDay:'',
        practicalVenue:'',



    });




    this.route.paramMap.subscribe((paramMap:ParamMap)=>{

      if(paramMap.has('id')){
        this.postId = paramMap.get('id');
        this.formsService.getCourseDetail(this.postId);
        this.formsService.getCourse();




        this.formsService.getUserInfo();
        this.userSub=this.formsService.getUserUpdateListener().subscribe((user:user[])=>{
          this.users=user;
        })


        this.courseSub=this.formsService.getCourseDetailListener().subscribe((course)=>{
          this.course=course;
          // console.log(course)
        })

        this.teachDesc=this.formsService.getWeekInfoData(this.postId);
        this.teachReference=this.formsService.getTeachRefData(this.postId);
        this.weekOther=this.formsService.getWeekOtherInfo(this.postId);
        this.curCourseRef=this.formsService.getCourseRef(this.postId);
        this.curCourseInfo=this.formsService.getCurCourse(this.postId);
        this.teachData=this.formsService.getTeachLearnData(this.postId);
        this.finalExamData=this.formsService.getSumAssessData(this.postId);
        this.contAssessData=this.formsService.getContAssessData(this.postId);
        console.log(this.teachReference);


        var hold=0;
        var tempNotMeet=0;
        var tempReady=0;
        var holdweight=0;

        if(this.curCourseInfo.length>0){

          console.log(this.curCourseInfo[0]);
          this.courseInformation.patchValue({
            courseInfoId:this.curCourseInfo[0].courseInfoId,
            checkEdit:this.curCourseInfo[0].checkEdit,
            medium:this.curCourseInfo[0].medium,
            lectureDay:this.curCourseInfo[0].lectureDay,
            lectureSession:this.curCourseInfo[0].lectureSession,
            lectureVenue:this.curCourseInfo[0].lectureVenue,
            practicalDay:this.curCourseInfo[0].practicalDay,
            practicalSession:this.curCourseInfo[0].practicalSession,
            practicalVenue:this.curCourseInfo[0].practicalVenue,
            telephoneNo:this.curCourseInfo[0].telephoneNo,
            room:this.curCourseInfo[0].room,
            skill:this.curCourseInfo[0].skill,
          })

          this.courseInformation.setControl('references',this.setCourseReference(this.curCourseRef));
          this.courseInformation.setControl('teachTable',this.setWeekOtherInfo(this.weekOther));
          // (<FormArray>this.courseInformation.get('teachTable')).push(this.setWeekOtherInfo(this.weekOther))
          // this.courseInformation.get('teachTable').push();
          // this.courseInformation.setControl('teachTable',this.setWeekOtherInfo(this.weekOther));
          // this.courseInformation.setControl('teachTable',this.setWeekOtherInfo(this.weekOther));
              // console.log('teachTable')
          // var getteach=this.courseInformation.controls['teachTable'].value;
          // this.courseInformation.setControl('teachTable',);
          // this.courseInformation.setControl('teachTable'['controls'],this.setWeekOtherInfo(this.weekOther))
          // console.log( this.courseInformation.setControl('references',this.setCourseReference(this.curCourseRef)))
          // console.log(this.courseInformation.get('references'))
          // console.log(this.courseInformation.get('teachTable'))
          // (<FormArray>this.courseInformation.get('teachTable')).setControl('teachTable',this.setWeekOtherInfo(this.weekOther)

          // (<Control>this.courseInformation.controls['teachTable'])
        }
        // for(var i=1;i<this.weekOther.length;i++){
        //   this.addNewRow(this.weekOther[i].teachTable[0].weekOtherDesc,this.weekOther[i].teachTable[0].teachTableId,this.weekOther[i].teachTable[0].checkTeachTable,this.weekOther[i].teachTable[0].rowId,i);
        // }



        for(var i=0;i<this.teachData.length;i++){

          hold=+this.teachData[i].teachLearn[0].hourMeet;
          tempNotMeet=+this.teachData[i].teachLearn[0].hourNotMeet;
          tempReady=+this.teachData[i].teachLearn[0].hourReady;
          this.teachMeetHour=this.teachMeetHour+hold;
          this.teachNotMeetHour=this.teachNotMeetHour+tempNotMeet;
          this.teachreadyHour=this.teachreadyHour+tempReady;
          this.strategies[i]=this.teachData[i].teachLearn[0].activities;

        }

        if(this.contAssessData.length>0){
          for(var j=0;j<this.contAssessData.length;j++){
            hold=+this.contAssessData[j].contAssessment[0].hourMeetCont;
            tempNotMeet=+this.contAssessData[j].contAssessment[0].hourNotMeetCont;
            tempReady=+this.contAssessData[j].contAssessment[0].hourReadyCont;
            holdweight=+this.contAssessData[j].contAssessment[0].weightage;
            this.assessType[j]=this.contAssessData[j].contAssessment[0].activitiesCont;
            this.assessWeight[j]=this.contAssessData[j].contAssessment[0].weightage
            this.contAssessMeetHour=this.contAssessMeetHour+hold;
            this.contAssessNotMeetHour=this.contAssessNotMeetHour+tempNotMeet;
            this.contAssessReady=this.contAssessReady+tempReady;
            this.totalContWeigtage=this.totalContWeigtage+holdweight;
          }
          // console.log(this.contAssessMeetHour);
        }
        if(this.finalExamData.length>0){
          for(var f=0;f<this.finalExamData.length;f++){
            hold=+this.finalExamData[f].sumHourMeetAssessment;
            this.totalMeetHour=this.totalMeetHour+hold;
            this.totalStudentPrepare=this.totalStudentPrepare+this.finalExamData[f].sumHourReadyAssessment;
            this.examWeight=this.totalStudentPrepare+this.finalExamData[f].examWeight;
          }
        }

        this.totalMeetHour=this.totalMeetHour+this.teachMeetHour+this.contAssessMeetHour;
        this.totalNotMeetHour=this.teachNotMeetHour+this.contAssessNotMeetHour;
        this.totalStudentPrepare=this.totalStudentPrepare+this.teachNotMeetHour+this.contAssessMeetHour;


      }
    })


  }


  createReferences():FormGroup{
    return this.formBuilder.group({
      referenceId:'',
      reference:'',
      checkReference:''

    });
  }


   other='';
   checkTeach='';
   rowId='';
   teachTableId='';

  createTeachTimeTable():FormGroup{

    return this.formBuilder.group({
      weekInfo:this.formBuilder.array([this.createWeekInfo()]),
      teachRef:this.formBuilder.array([this.createteachRef()]),
      teachTableId:'',
      weekOtherDesc:'',
      checkTeachTable:'',
      rowId:'',

    })
  }

  ref:FormGroup;
  createteachRef():FormGroup{
      return this.ref= this.formBuilder.group({
      teachRefId:'',
      timeTableRef:'',
      checkTeachRef:'',
    });
  }

  week:FormGroup;
  createWeekInfo():FormGroup{
      return this.formBuilder.group({
        activityId:'',
        activityType:'',
        activityDesc:'',
        checkweekInfo:'',
      })
  }


  setteachRef(j):FormArray{
    const formArray = new FormArray([]);

    // console.log(this.teachReference[j].teachTable[0].teachRef[0].timeTableRef)


    for(var k=0;k<this.teachReference.length;k++){
      if(this.teachReference[k].teachTable[0].teachRef[0].rowId==j){
        // console.log(j)
        // console.log(this.teachReference[k].teachTable[0].teachRef[0].rowId)
        formArray.push(
          this.formBuilder.group({
           teachRefId:this.teachReference[k].teachTable[0].teachRef[0].teachRefId,
           timeTableRef:this.teachReference[k].teachTable[0].teachRef[0].timeTableRef,
           checkTeachRef:this.teachReference[k].teachTable[0].teachRef[0].checkRef,
          })
        )
      }
    }



    return formArray;
  }

 setWeekInfo(j):FormArray{
    const formArray = new FormArray([]);

    for(var w=0;w<this.teachDesc.length;w++){
      // console.log(this.teachDesc[w].teachTable[0].weekInfo[0].activityType)
      if(this.teachDesc[w].teachTable[0].weekInfo[0].rowId==j){

        formArray.push(
          this.formBuilder.group({
            activityId:this.teachDesc[w].teachTable[0].weekInfo[0].activityId,
            activityType:this.teachDesc[w].teachTable[0].weekInfo[0].activityType,
            activityDesc:this.teachDesc[w].teachTable[0].weekInfo[0].activityDesc,
            checkweekInfo:this.teachDesc[w].teachTable[0].weekInfo[0].checkWeekInfo,
          })
        )
      }
    }


    return formArray
 }

  setCourseReference(ref):FormArray{
    const formArray = new FormArray([]);
    if(ref.length>0){
      for(var i=0;i<ref.length;i++){
        formArray.push(
          this.formBuilder.group({
            referenceId:ref[i].referenceId,
            reference:ref[i].referData,
            checkReference:ref[i].referCheck,
          })
        )
      }

    }
    return formArray;
  }

  setWeekOtherInfo(other):FormArray{
    const formArray = new FormArray([]);

    if(other.length>0){
      for(var j=0;j<other.length;j++){
        // console.log(other[j])
        formArray.push(
          this.formBuilder.group({
            teachTableId:other[j].teachTable[0].teachTableId,
            checkTeachTable:other[j].teachTable[0].checkTeachTable,
            weekOtherDesc:other[j].teachTable[0].weekOtherDesc,
            rowId:other[j].teachTable[0].rowId,
            weekInfo:this.setWeekInfo(j),
            teachRef:this.setteachRef(j),

          })
        )

      }
    }
      // formArray.push(
      //   this.formBuilder.group({
      //       teachTableId:other[0].teachTable[0].teachTableId,
      //       checkTeachTable:other[0].teachTable[0].checkTeachTable,
      //       weekOtherDesc:other[0].teachTable[0].weekOtherDesc,
      //       rowId:other[0].teachTable[0].rowId
      //   })
      // )
    console.log(formArray)
    return formArray;
  }
  addReferenceButton(){
    (<FormArray>this.courseInformation.get('references')).push(this.createReferences());
  }
  removeReferenceButton(i,v){
    // console.log(v);
    this.deleteMainreference(v);
    (<FormArray>this.courseInformation.get('references')).removeAt(i);
    this.getReferences(this.courseInformation)
  }


  deleteMainreference(referId){
    if(referId>0){
      this.formsService.deleteMainReference(referId);
    }

  }


  addRemoveInfo(t){
    (<FormArray>t.get('weekInfo')).push(this.createWeekInfo());
  }
  removeWeekInfo(i,row,v){
    this.deleteWeekInfo(v);
    console.log(v);
    (<FormArray>row.get('weekInfo')).removeAt(i);
  }
  deleteWeekInfo(weekId){
    if(weekId>0){
      this.formsService.deleteWeekInfo(weekId);
    }
  }

  removeTeachRef(i,row,v){
    console.log(v);
    this.deleteTeachRef(v);
    (<FormArray>row.get('teachRef')).removeAt(i);
  }
  deleteTeachRef(referId){
    if(referId>0){
      this.formsService.deleteTeachRefer(referId);
    }
  }
  addTeachRef(tr){
    (<FormArray>tr.get('teachRef')).push(this.createteachRef());
  }
  addNewRow(){
    // (<FormArray>this.courseInformation.get('teachTable')).push(this.createTeachTimeTable());
  }

  ngOnDestroy(){
    this.courseSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  refer=[];
  countRef=0;
  getReferences(data){
    this.refer=[];
    for(var i=0;i<data.value.references.length;i++){
      this.refer[i]=data.value.references[i].reference
      console.log(data.value.references[i].reference)
    }
    // this.refer[row]=data.value.references[row].reference
    console.log(this.refer);
  }

  saveCourseInformation(data){
    console.log(data)
    this.formsService.saveCurrentCourse(this.postId,data.value.courseInfoId,data.value.lectureDay,data.value.lectureSession,data.value.lectureVenue,data.value.medium,data.value.practicalDay,data.value.practicalSession,data.value.practicalVenue,data.value.checkEdit,data.value.telephoneNo,data.value.references,data.value.room,data.value.skill,data.value.teachTable);
  }
}
