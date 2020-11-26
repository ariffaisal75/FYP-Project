import{ Form } from './post.model';
import { Injectable, ɵConsole } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import{ map }from 'rxjs/operators'
import { Router } from '@angular/router';
import { courses } from './course.model';
import { sltoutmodel } from './slt-out.model';
import { sltinmodel } from './slt-in.model';
import { user } from './user-data.model';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';
import { align } from './align.model';
import { stringify } from 'querystring';
import { cloInfo } from './cloInfo.model';
import { sltData } from './sltData.model';
import { currentCourse } from './currentCourse.model';


@Injectable({providedIn: 'root'})
export class FormsService{

  private forms: Form[] = [];
  private course:courses[]=[];
  private courseDetail:courses[]=[];
  private sltout:sltoutmodel[]=[];
  private sltin:sltinmodel[]=[];
  private alignData:align[]=[];
  private userdata:user[]=[];
  private assess:align[]=[];
  private sltData:sltData[]=[];
  private teachData:sltData[]=[];
  private contAssess:sltData[]=[];
  private finalExamData:sltData[]=[];
  private credit:align[]=[];
  private curCredit:currentCourse[]=[];
  private currentCourseData:currentCourse[]=[];
  private courseRef:currentCourse[]=[];
  private weekOther:currentCourse[]=[];
  private teachRef:currentCourse[]=[];
  private weekInfo:currentCourse[]=[];

  private holdTeach:sltData[]=[];
  private holdContAssess:sltData[]=[];
  private holdFInalExam:sltData[]=[];
  private holdCredit:align[]=[];
  private holdCurrentCourse:currentCourse[]=[];
  private holdCourseRef:currentCourse[]=[];
  private holdweekOther:currentCourse[]=[];
  private holdTeachRef:currentCourse[]=[];
  private holdWeekInfo:currentCourse[]=[];

  private holdData:align[]=[];
  private holdAssess:align[]=[];
  private updateAlignData=new Subject<align[]>();
  private updateuserdata=new Subject<user[]>();
  private postsUpdated = new Subject<Form[]>();
  private updatedCourse=new Subject<courses[]>();
  private updatedCourseDetail=new Subject<courses[]>();
  private updatedsltout=new Subject<sltoutmodel[]>();
  private updatedsltin = new Subject<sltinmodel[]>();
  private assessUpdate = new Subject<align[]>();
  private teachUpdate = new Subject<sltData[]>();
  private contAssessUpdate = new Subject<sltData[]>();
  private finalExamUpdate = new Subject<sltData[]>();
  private creditUpdate = new Subject<align[]>();
  private curCourseupdate = new Subject<currentCourse[]>();
  private courseRefupdate = new Subject<currentCourse[]>();
  private weekOtherUpdate = new Subject<currentCourse[]>();
  private teachRefUpdate = new Subject<currentCourse[]>();
  private weekInfoUpdate = new Subject<currentCourse[]>();

  private countAlign=0;
  private countAssess=0;
  private countCredit=0;
  private countcurCourse=0;
  private CountcourRef=0;
  private countweekOther=0;
  private countWeekInfoData=0;
  private countteachRef=0
  private countTeach=0;
  private countFinalexam=0;
  private countAssessdata=0;
  constructor(private http: HttpClient,private router: Router){}

  ////////////////////////////////////////////////////////////////////////// Get penyelarasan for edit \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  getForms(){
    this.http.get<{message : string,course : any}>(
      'http://localhost:3000/api/posts'
      )
    .pipe(map((postData) =>{
        return postData.course.map(post =>{
          return{
              id:post.courseId,
              courseName:post.courseName,
              session:post.session,
              semester:post.semester

          };
        });
    }))
    .subscribe((transformedData)=>{
      // console.log(transformedData);
      this.course = transformedData;
      // console.log("this is a edit")
      this.updatedCourse.next([...this.course]);
      // console.log(this.updatedCourse)

    });

  }


  getWeekInfoListener(){
    return this.weekInfoUpdate.asObservable();
  }
  getTeachRefListener(){
    return this.teachRefUpdate.asObservable();
  }
  getCourseRefListener(){
    return this.courseRefupdate.asObservable();
  }
  getWeekOtherListener(){
    return this.weekOtherUpdate.asObservable();
  }
  getCurrentCourseListener(){
    return this.curCourseupdate.asObservable();
  }
  getCreditUpdateListener(){
    return this.creditUpdate.asObservable();
  }
  getFinalExamUpdateListener(){
    return this.finalExamUpdate.asObservable();
  }
  getContAssessUpdateListener(){
    return this.contAssessUpdate.asObservable();
  }
getTeachUpdateListener(){
    return this.teachUpdate.asObservable();
  }
  getFormUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  getCourseDetailListener(){
    return this.updatedCourseDetail.asObservable();
  }
  getAssesslListener(){
    return this.assessUpdate.asObservable();
  }

  getAlignUpdateListener(){
    return this.updateAlignData.asObservable();
  }

  getSltFormUpdateListener(){
    return this.updatedsltout.asObservable();
  }
  getSltInFormUpdateListener(){
    return this.updatedsltin.asObservable();
  }

  getCourseListener(){
    return this.updatedCourse.asObservable();
  }
  getCourseInfo(id:string){
    // console.log(this.courseDetail)
    return {...this.courseDetail.find(p =>p.id==id)};
  }
  getPost(id:string){
    // console.log(this.forms)
    return {...this.course.find(p => p.id ==id)};
    //  this.http.get<{id:string,name:string,course:string,session:string,semester:string}>("http://localhost:3000/api/posts/"+id);

  }
  // getCourseDetail(id:string){
  //   return {...this.course.find(p => p.id ==id)};
  // }

  getTeachLearnData(courseId:string){
    this.holdTeach=[];
    this.countTeach=0
    for(var i=0;i<this.teachData.length;i++){
      if(this.teachData[i].id==courseId){
        this.holdTeach[this.countTeach]=this.teachData[i];
        this.countTeach++
      }
    }
    return this.holdTeach;
  }

  getSumAssessData(courseId:string){
    this.holdFInalExam=[];
    this.countFinalexam=0
      for(var i=0;i<this.finalExamData.length;i++){
        if(this.finalExamData[i].id==courseId){
          this.holdFInalExam[this.countFinalexam]=this.finalExamData[i];
          this.countFinalexam++;
        }
      }
      // console.log(this.finalExamData)


    return this.holdFInalExam;
  }
  getContAssessData(courseId:string){
    this.holdContAssess=[];
    this.countAssessdata=0;
    for(var i=0;i<this.contAssess.length;i++){
      if(this.contAssess[i].id==courseId){
        this.holdContAssess[this.countAssessdata]=this.contAssess[i];
        this.countAssessdata++;
      }
    }
    return this.holdContAssess;
  }


  getEditalignment(listid:string){
    this.holdData=[];
    this.countAlign=0;
    for(var i=0;i<this.alignData.length;i++){

      if(this.alignData[i].id==listid){
        this.holdData[this.countAlign]=this.alignData[i];
        this.countAlign++;
      }
    }
    console.log(this.alignData)
    return this.holdData;
    // this.alignData.find(p => p.id ==id);
  }

  getEditassess(assessid:string){
    this.holdAssess=[];
    this.countAssess=0;
    for(var i=0;i<this.assess.length;i++){

      if(this.assess[i].id==assessid){
        this.holdAssess[this.countAssess]=this.assess[i];
        this.countAssess++;
      }
    }
    console.log(this.holdAssess)
    return this.holdAssess;
    // this.alignData.find(p => p.id ==id);
  }

  getCurCourse(creditId:string){
    this.holdCurrentCourse=[];
    this.countcurCourse=0
    for(var c=0;c<this.currentCourseData.length;c++){

      if(this.currentCourseData[c].id==creditId){
        this.holdCurrentCourse[this.countcurCourse]=this.currentCourseData[c];
        this.countcurCourse++;
      }
    }
    console.log(this.holdCurrentCourse)
    return this.holdCurrentCourse;
    // this.alignData.find(p => p.id ==id);
  }

  getCredit(creditId:string){
    this.holdCredit=[];
    this.countCredit=0
    for(var c=0;c<this.credit.length;c++){

      if(this.credit[c].id==creditId){
        this.holdCredit[this.countCredit]=this.credit[c];
        this.countCredit++;
      }
    }
    // console.log(creditId)
    return this.holdCredit;
    // this.alignData.find(p => p.id ==id);
  }

  getCourseRef(creditId:string){
    this.holdCourseRef=[];
    this.CountcourRef=0;
    for(var c=0;c<this.courseRef.length;c++){

      if(this.courseRef[c].id==creditId){
        this.holdCourseRef[this.CountcourRef]=this.courseRef[c];
        this.CountcourRef++
      }
    }
    // console.log(creditId)
    return this.holdCourseRef;
    // this.alignData.find(p => p.id ==id);
  }


  getWeekOtherInfo(creditId:string){
    this.holdweekOther=[];
    this.countweekOther=0
    for(var c=0;c<this.weekOther.length;c++){

      if(this.weekOther[c].id==creditId){
        this.holdweekOther[this.countweekOther]=this.weekOther[c];
        this.countweekOther++
      }
    }
    // console.log(creditId)
    return this.holdweekOther;
    // this.alignData.find(p => p.id ==id);
  }

  getTeachRefData(creditId:string){
    this.holdTeachRef=[];
    this.countteachRef=0;
    for(var c=0;c<this.teachRef.length;c++){

      if(this.teachRef[c].id==creditId){
        this.holdTeachRef[this.countteachRef]=this.teachRef[c];
        this.countteachRef++;
      }
    }
    // console.log(creditId)
    return this.holdTeachRef;
    // this.alignData.find(p => p.id ==id);
  }


  getWeekInfoData(creditId:string){
    this.holdWeekInfo=[];
    this.countWeekInfoData=0;
    for(var c=0;c<this.weekInfo.length;c++){

      if(this.weekInfo[c].id==creditId){
        this.holdWeekInfo[this.countWeekInfoData]=this.weekInfo[c];
        this.countWeekInfoData++;
      }
    }
    // console.log(creditId)
    return this.holdWeekInfo;
    // this.alignData.find(p => p.id ==id);
  }

  getsltForm(id:string){
    // console.log("this is a Slt")
    // console.log(this.sltout)
    // console.log(this.sltout);
    return {...this.sltout.find(p=>p.id ==id)};
  }

  //////////////////////////////////////////////////////////////////////////// add penyelarasan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  addPost(name:string,course: string, session: string, semester:string,

    CLO:string,taksonomi1:string,
    clo1plo1:string,plo1check1:string,
    clo1plo2:string,plo1check2:string,
    clo1plo3:string,plo1check3:string,
    strategi1Check1:string,
    strategi1Check2:string,
    strategi1Check3:string,
    lab1:number,
    presentation1asign1:number,
    presentation2asign1:number,
    ujianAkhir1:number,
    pencapaianHasil1:string,

    CLO2:string,taksonomi2:string,
    clo2plo1:string,plo2check1:string,
    clo2plo2:string,plo2check2:string,
    clo2plo3:string,plo2check3:string,
    strategi2Check1:string,
    strategi2Check2:string,
    strategi2Check3:string,
    lab2:number,
    presentation1asign2:number,
    presentation2asign2:number,
    ujianAkhir2:number,
    pencapaianHasil2:string,

    CLO3:string,taksonomi3:string,
    clo3plo1:string,plo3check1:string,
    clo3plo2:string,plo3check2:string,
    clo3plo3:string,plo3check3:string,
    strategi3Check1:string,
    strategi3Check2:string,
    strategi3Check3:string,
    lab3:number,
    presentation1asign3:number,
    presentation2asign3:number,
    ujianAkhir3:number,
    pencapaianHasil3:string){

    const form: Form = {id:null,name: name,course: course, session: session, semester:semester,

      CLO:CLO,taksonomi1:taksonomi1,
      clo1plo1:clo1plo1,plo1check1:plo1check1,
      clo1plo2:clo1plo2,plo1check2:plo1check2,
      clo1plo3:clo1plo3,plo1check3:plo1check3,
      strategi1Check1:strategi1Check1,
      strategi1Check2:strategi1Check2,
      strategi1Check3:strategi1Check3,
      lab1:lab1,
      presentation1asign1:presentation1asign1,
      presentation2asign1:presentation2asign1,
      ujianAkhir1:ujianAkhir1,
      pencapaianHasil1:pencapaianHasil1,

      CLO2:CLO2,taksonomi2:taksonomi2,
      clo2plo1:clo2plo1,plo2check1:plo2check1,
      clo2plo2:clo2plo2,plo2check2:plo2check2,
      clo2plo3:clo2plo3,plo2check3:plo2check3,
      strategi2Check1:strategi2Check1,
      strategi2Check2:strategi2Check2,
      strategi2Check3:strategi2Check3,
      lab2:lab2,
      presentation1asign2:presentation1asign2,
      presentation2asign2:presentation2asign2,
      ujianAkhir2:ujianAkhir2,
      pencapaianHasil2:pencapaianHasil2,

      CLO3:CLO3,taksonomi3:taksonomi3,
      clo3plo1:clo3plo1,plo3check1:plo3check1,
      clo3plo2:clo3plo2,plo3check2:plo3check2,
      clo3plo3:clo3plo3,plo3check3:plo3check3,
      strategi3Check1:strategi3Check1,
      strategi3Check2:strategi3Check2,
      strategi3Check3:strategi3Check3,
      lab3:lab3,
      presentation1asign3:presentation1asign3,
      presentation2asign3:presentation2asign3,
      ujianAkhir3:ujianAkhir3,
      pencapaianHasil3:pencapaianHasil3};

    // console.log("test connection")
    this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',form).subscribe((responseData)=>{
      // console.log("hai create")
      // console.log(responseData);
      const id = responseData.postId;
      form.id=id;
      this.forms.push(form);
      this.postsUpdated.next([...this.forms]);
      console.log("this is a id "+responseData.postId)
      this.router.navigate(["/list"]);

    });



  }

  //////////////////////////////////////////////////////////////////////////////////// Update penyelarasan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  updatePost(id:string,name:string,course: string, session: string, semester:string,

    CLO:string,taksonomi1:string,
    clo1plo1:string,plo1check1:string,
    clo1plo2:string,plo1check2:string,
    clo1plo3:string,plo1check3:string,
    strategi1Check1:string,
    strategi1Check2:string,
    strategi1Check3:string,
    lab1:number,
    presentation1asign1:number,
    presentation2asign1:number,
    ujianAkhir1:number,
    pencapaianHasil1:string,

    CLO2:string,taksonomi2:string,
    clo2plo1:string,plo2check1:string,
    clo2plo2:string,plo2check2:string,
    clo2plo3:string,plo2check3:string,
    strategi2Check1:string,
    strategi2Check2:string,
    strategi2Check3:string,
    lab2:number,
    presentation1asign2:number,
    presentation2asign2:number,
    ujianAkhir2:number,
    pencapaianHasil2:string,

    CLO3:string,taksonomi3:string,
    clo3plo1:string,plo3check1:string,
    clo3plo2:string,plo3check2:string,
    clo3plo3:string,plo3check3:string,
    strategi3Check1:string,
    strategi3Check2:string,
    strategi3Check3:string,
    lab3:number,
    presentation1asign3:number,
    presentation2asign3:number,
    ujianAkhir3:number,
    pencapaianHasil3:string){

    const form:Form = {id:id,name:name,course:course,session:session,semester:semester,

      CLO:CLO,taksonomi1:taksonomi1,
      clo1plo1:clo1plo1,plo1check1:plo1check1,
      clo1plo2:clo1plo2,plo1check2:plo1check2,
      clo1plo3:clo1plo3,plo1check3:plo1check3,
      strategi1Check1:strategi1Check1,
      strategi1Check2:strategi1Check2,
      strategi1Check3:strategi1Check3,
      lab1:lab1,
      presentation1asign1:presentation1asign1,
      presentation2asign1:presentation2asign1,
      ujianAkhir1:ujianAkhir1,
      pencapaianHasil1:pencapaianHasil1,

      CLO2:CLO2,taksonomi2:taksonomi2,
      clo2plo1:clo2plo1,plo2check1:plo2check1,
      clo2plo2:clo2plo2,plo2check2:plo2check2,
      clo2plo3:clo2plo3,plo2check3:plo2check3,
      strategi2Check1:strategi2Check1,
      strategi2Check2:strategi2Check2,
      strategi2Check3:strategi2Check3,
      lab2:lab2,
      presentation1asign2:presentation1asign2,
      presentation2asign2:presentation2asign2,
      ujianAkhir2:ujianAkhir2,
      pencapaianHasil2:pencapaianHasil2,

      CLO3:CLO3,taksonomi3:taksonomi3,
      clo3plo1:clo3plo1,plo3check1:plo3check1,
      clo3plo2:clo3plo2,plo3check2:plo3check2,
      clo3plo3:clo3plo3,plo3check3:plo3check3,
      strategi3Check1:strategi3Check1,
      strategi3Check2:strategi3Check2,
      strategi3Check3:strategi3Check3,
      lab3:lab3,
      presentation1asign3:presentation1asign3,
      presentation2asign3:presentation2asign3,
      ujianAkhir3:ujianAkhir3,
      pencapaianHasil3:pencapaianHasil3};

    this.http.put("http://localhost:3000/api/posts/"+id,form)
    .subscribe(response =>{
      const updatedPosts = [...this.forms];
      const oldPostIndex = updatedPosts.findIndex(p => p.id ===form.id);
      updatedPosts[oldPostIndex]=form;
      this.forms=updatedPosts;
      this.postsUpdated.next([...this.forms]);
      this.router.navigate(["/list"]);
    });
  }


  ////////////////////////////////////////////////////////////////////////  Delete post for Penyelarasan  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/"+postId)
    .subscribe(()=>{
      console.log("Deleted !!");
      const postsUpdated = this.forms.filter(post=> post.id!==postId);
      this.forms = postsUpdated;
      this.postsUpdated.next([...this.forms]);
      this.router.navigate(["/list"]);
    });
  }


  deleteStrategies(strategyId:string){
    this.http.delete("http://localhost:3000/api/strategy/"+strategyId).subscribe(()=>{
      console.log("Deleted !!");
    })
  }

  deleteAssessment(assessmentId:string){
    this.http.delete("http://localhost:3000/api/assessment/"+assessmentId).subscribe(()=>{
      console.log("Deleted !!");
    })
  }

  deleteMainReference(referId:string){
    this.http.delete("http://localhost:3000/api/mainRefer/"+referId).subscribe(()=>{
      console.log("Deleted !!");
    })
  }

  deleteWeekInfo(weekId:string){
    this.http.delete("http://localhost:3000/api/weekDelete/"+weekId).subscribe(()=>{
      console.log("Deleted !!");
    })
  }

  deleteTeachRefer(referId:string){
    this.http.delete("http://localhost:3000/api/deleteTeachRefer/"+referId).subscribe(()=>{
      console.log("Deleted !!");
    })
  }



  //////////////////////////////////////////////////////////////////////////////// Get Course Data \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getCourse(){

    this.http.get<{message : string,course : any}>(
      'http://localhost:3000/api/course'
      )
    .pipe(map((courseData) =>{
        return courseData.course.map(courseInfo =>{
          return{
              id:courseInfo.courseId,
              courseName:courseInfo.courseName
          };
        });
    }))
    .subscribe((transformedCourse)=>{
      // console.log("this is list of course in database :"+transformedCourse.courseName)
      this.course = transformedCourse;
      this.updatedCourse.next([...this.course]);

    });

  }






  //////////////////////////////////////////////////////////////////////////////// Get SLT data \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  getSltData(){

    this.http.get<{message : string,sltout : any}>(
      'http://localhost:3000/api/slt')
    .pipe(map((sltData) =>{
        return sltData.sltout.map(sltinfo =>{
          return{
            id:sltinfo.alignID,
            name:sltinfo.name,
            course:sltinfo.course,
            session:sltinfo.session,
            semester:sltinfo.semester,

            activity1Type1:sltinfo.makmal1,
            activity1Type2:sltinfo.kuliah1,
            activity1Type3:sltinfo.tutorial1,

            pemberatmakmal:sltinfo.lab1+sltinfo.lab2+sltinfo.lab3,
            pemberatpresentation1:sltinfo.presentation1asign1+sltinfo.presentation1asign2+sltinfo.presentation1asign3,
            pemberatpresentation2:sltinfo.presentation2asign1+sltinfo.presentation2asign2+sltinfo.presentation2asign3,
            pemberatexam:sltinfo.ujianAkhir1+sltinfo.ujianAkhir2+sltinfo.ujianAkhir3,

            activity2Type1:sltinfo.makmal2,
            activity2Type2:sltinfo.kuliah2,
            activity2Type3:sltinfo.tutorial2,

            activity3Type1:sltinfo.makmal3,
            activity3Type2:sltinfo.kuliah3,
            activity3Type3:sltinfo.tutorial3,

            hourmeetlab:sltinfo.hourmeetlab,
            weekmeetlab:sltinfo.weekmeetlab,
            hournotmeetlab:sltinfo.hournotmeetlab,
            weeknotmeetlab:sltinfo.weeknotmeetlab,
            hourreadylab:sltinfo.hourreadylab,
            weekreadylab:sltinfo.weekreadylab,

            hourmeettuto:sltinfo.hourmeettuto,
            weekmeettuto:sltinfo.weekmeettuto,
            hournotmeettuto:sltinfo.hournotmeettuto,
            weeknotmeettuto:sltinfo.weeknotmeettuto,
            hourreadytuto:sltinfo.hourreadytuto,
            weekreadytuto:sltinfo.weekreadytuto,

            hourmeetlec:sltinfo.hourmeetlec,
            weekmeetlec:sltinfo.weekmeetlec,
            hournotmeetlec:sltinfo.hournotmeetlec,
            weeknotmeetlec:sltinfo.weeknotmeetlec,
            hourreadylec:sltinfo.hourreadylec,
            weekreadylec:sltinfo.weekreadylec,

            penilaianMeetLab:sltinfo.penilaianMeetLab,
            penilaianNotmeetLab:sltinfo.penilaianNotmeetLab,
            penilaianReadylab:sltinfo.penilaianReadylab,

            penilaianmeetpresentation1:sltinfo.penilaianmeetpresentation1,
            penilaianNotmeetpresentation1:sltinfo.penilaianNotmeetpresentation1,
            hourreadypresent1:sltinfo.hourreadypresent1,
            weekreadypresent1:sltinfo.weekreadypresent1,

            penilaianmeetpresentation2:sltinfo.penilaianmeetpresentation2,
            penilaianNotmeetpresentation2:sltinfo.penilaianNotmeetpresentation2,
            hourreadypresent2:sltinfo.hourreadypresent2,
            weekreadypresent2:sltinfo.weekreadypresent2,

            penilaianmeetexamFinal:sltinfo.penilaianmeetexamFinal,
            penilaiannotmeetexamFinal:sltinfo.penilaiannotmeetexamFinal,
            readyexam:sltinfo.readyexam,
            checkEdit:sltinfo.editCheck


          };
        });
    }))
    .subscribe((transformedData)=>{

      this.sltout = transformedData;
      // console.log("this is a service")
      // console.log(this.sltout);
      this.updatedsltout.next([...this.sltout]);

    });

  }


  saveSltPost(
    id:string,
    name:string,
    course:string,
    session:string,
    semester:string,

    hourmeetlab:number,
    weekmeetlab:number,
    hournotmeetlab:number,
    weeknotmeetlab:number,
    hourreadylab:number,
    weekreadylab:number,

    hourmeettuto:number,
    weekmeettuto:number,
    hournotmeettuto:number,
    weeknotmeettuto:number,
    hourreadytuto:number,
    weekreadytuto:number,

    hourmeetlec:number,
    weekmeetlec:number,
    hournotmeetlec:number,
    weeknotmeetlec:number,
    hourreadylec:number,
    weekreadylec:number,

    penilaianMeetLab:number,
    penilaianNotmeetLab:number,
    penilaianReadylab:number,

    penilaianmeetpresentation1:number,
    penilaianNotmeetpresentation1:number,
    hourreadypresent1:number,
    weekreadypresent1:number,

    penilaianmeetpresentation2:number,
    penilaianNotmeetpresentation2:number,
    hourreadypresent2:number,
    weekreadypresent2:number,

    penilaianmeetexamFinal:number,
    penilaiannotmeetexamFinal:number,
    readyexam:number,
    checkEdit:boolean){

      const sltindata:sltinmodel ={
        id:id,
        name:name,
        course:course,
        session:session,
        semester:semester,

        hourmeetlab:hourmeetlab,
        weekmeetlab:weekmeetlab,
        hournotmeetlab:hournotmeetlab,
        weeknotmeetlab:weeknotmeetlab,
        hourreadylab:hourreadylab,
        weekreadylab:weekreadylab,

        hourmeettuto:hourmeettuto,
        weekmeettuto:weekmeettuto,
        hournotmeettuto:hournotmeettuto,
        weeknotmeettuto:weeknotmeettuto,
        hourreadytuto:hourreadytuto,
        weekreadytuto:weekreadytuto,

        hourmeetlec:hourmeetlec,
        weekmeetlec:weekmeetlec,
        hournotmeetlec:hournotmeetlec,
        weeknotmeetlec:weeknotmeetlec,
        hourreadylec:hourreadylec,
        weekreadylec:weekreadylec,

        penilaianMeetLab:penilaianMeetLab,
        penilaianNotmeetLab:penilaianNotmeetLab,
        penilaianReadylab:penilaianReadylab,

        penilaianmeetpresentation1:penilaianmeetpresentation1,
        penilaianNotmeetpresentation1:penilaianNotmeetpresentation1,
        hourreadypresent1:hourreadypresent1,
        weekreadypresent1:weekreadypresent1,

        penilaianmeetpresentation2:penilaianmeetpresentation2,
        penilaianNotmeetpresentation2:penilaianNotmeetpresentation2,
        hourreadypresent2:hourreadypresent2,
        weekreadypresent2:weekreadypresent2,

        penilaianmeetexamFinal:penilaianmeetexamFinal,
        penilaiannotmeetexamFinal:penilaiannotmeetexamFinal,
        readyexam:readyexam,
        checkEdit:checkEdit


      };
      this.http.post<{message:string,postId:string}>('http://localhost:3000/api/slt',sltindata).subscribe((responseData)=>{
        const id=responseData.postId;
        sltindata.id=id;
        this.sltin.push(sltindata);
        this.updatedsltin.next([...this.sltin]);
        this.router.navigate(["/list"])

      })

  }

  editSltForm(
    id:string,
    name:string,
    course:string,
    session:string,
    semester:string,

    hourmeetlab:number,
    weekmeetlab:number,
    hournotmeetlab:number,
    weeknotmeetlab:number,
    hourreadylab:number,
    weekreadylab:number,

    hourmeettuto:number,
    weekmeettuto:number,
    hournotmeettuto:number,
    weeknotmeettuto:number,
    hourreadytuto:number,
    weekreadytuto:number,

    hourmeetlec:number,
    weekmeetlec:number,
    hournotmeetlec:number,
    weeknotmeetlec:number,
    hourreadylec:number,
    weekreadylec:number,

    penilaianMeetLab:number,
    penilaianNotmeetLab:number,
    penilaianReadylab:number,

    penilaianmeetpresentation1:number,
    penilaianNotmeetpresentation1:number,
    hourreadypresent1:number,
    weekreadypresent1:number,

    penilaianmeetpresentation2:number,
    penilaianNotmeetpresentation2:number,
    hourreadypresent2:number,
    weekreadypresent2:number,

    penilaianmeetexamFinal:number,
    penilaiannotmeetexamFinal:number,
    readyexam:number,
    checkEdit:boolean
  ){
    const sltindata:sltinmodel ={
      id:id,
      name:name,
      course:course,
      session:session,
      semester:semester,

      hourmeetlab:hourmeetlab,
      weekmeetlab:weekmeetlab,
      hournotmeetlab:hournotmeetlab,
      weeknotmeetlab:weeknotmeetlab,
      hourreadylab:hourreadylab,
      weekreadylab:weekreadylab,

      hourmeettuto:hourmeettuto,
      weekmeettuto:weekmeettuto,
      hournotmeettuto:hournotmeettuto,
      weeknotmeettuto:weeknotmeettuto,
      hourreadytuto:hourreadytuto,
      weekreadytuto:weekreadytuto,

      hourmeetlec:hourmeetlec,
      weekmeetlec:weekmeetlec,
      hournotmeetlec:hournotmeetlec,
      weeknotmeetlec:weeknotmeetlec,
      hourreadylec:hourreadylec,
      weekreadylec:weekreadylec,

      penilaianMeetLab:penilaianMeetLab,
      penilaianNotmeetLab:penilaianNotmeetLab,
      penilaianReadylab:penilaianReadylab,

      penilaianmeetpresentation1:penilaianmeetpresentation1,
      penilaianNotmeetpresentation1:penilaianNotmeetpresentation1,
      hourreadypresent1:hourreadypresent1,
      weekreadypresent1:weekreadypresent1,

      penilaianmeetpresentation2:penilaianmeetpresentation2,
      penilaianNotmeetpresentation2:penilaianNotmeetpresentation2,
      hourreadypresent2:hourreadypresent2,
      weekreadypresent2:weekreadypresent2,

      penilaianmeetexamFinal:penilaianmeetexamFinal,
      penilaiannotmeetexamFinal:penilaiannotmeetexamFinal,
      readyexam:readyexam,
      checkEdit:checkEdit


    };
    this.http.put('http://localhost:3000/api/slt/'+id,sltindata).subscribe((responseData)=>{
      const updatedpost = [...this.sltin];
        const oldPostindex =updatedpost.findIndex(p=>p.id ===sltindata.id);
        updatedpost[oldPostindex]=sltindata;
        this.sltin=updatedpost;
      this.updatedsltin.next([...this.sltin]);
      this.router.navigate(["/list"])

    })

  }


  getUserUpdateListener(){
    return this.updateuserdata.asObservable();
  }

  getUserInfo(){
    this.http.get<{message : string,user : any}>(
      'http://localhost:3000/api/userdata'
      )
    .pipe(map((userInfo) =>{
        return userInfo.user.map(users =>{
          return{
              userId:users.userId,
              lecturerName:users.LecturerName,
              department:users.department,
              staffId:users.staffId,
          };
        });
    }))
    .subscribe((transformedCourse)=>{

      this.userdata = transformedCourse;
      this.updateuserdata.next([...this.userdata]);

    });
  }




  saveUserPost(
  id:string,
  plo1:number,
  plo2:number,
  plo3:number,
  CloInfo:{
    clo:string,
    cloId:string,
    taxoLevel:string,
    checkBox1:string,
    checkBox2:string,
    checkBox3:string,
    strategies:{
      strategy:string,
      strategyId:string,
      checkExist:boolean
    },
    assessment:{
      assessment:string,
      weightage:number,
      assessmentId:string,
      assessCheck:boolean,
    },
    criteria:number,
    // alignId:string,
    criteria2:number,
    finalExam:number
  }){

    const alignData:align ={
      id:id,
      plo1:plo1,
      plo2:plo2,
      plo3:plo3,
      CloInfo:CloInfo,

    };
    // console.log("hai");
    console.log(alignData);
    this.http.post<{message:string,postId:string}>('http://localhost:3000/api/alignment/'+id,alignData).subscribe((responseData)=>{
      // console.log("hai");
      this.router.navigate(["/list"]);
    })


  }

  getCourseDetail(id:string){
    this.http.get<{message : string,course : any}>(
      'http://localhost:3000/api/courseDetail/'+id
      )
    .pipe(map((c) =>{
        return c.course.map(course =>{
          return{
             id:course.courseId,
             courseName:course.courseName,
             session:course.session,
             semester:course.semester,
             credit:course.credit,
             courseCode:course.courseCode,
             name:course.name,
          };
        });
    }))
    .subscribe((transformedCourse)=>{
      // console.log(transformedCourse)
      this.courseDetail = transformedCourse;
      this.updatedCourseDetail.next([...this.courseDetail]);

    });
  }

  getAlignmentData(){

    this.http.get<{message : string,alignData : any}>(
      'http://localhost:3000/api/align')
    .pipe(map((getalign) =>{
        return getalign.alignData.map(fetchedAlign =>{
          return{
            id:fetchedAlign.alignmentId,
            plo1:fetchedAlign.plo1,
            plo2:fetchedAlign.plo2,
            plo3:fetchedAlign.plo3,
            CloInfo:[{
              cloId:fetchedAlign.cloId,
              clo:fetchedAlign.clo,
              taxoLevel:fetchedAlign.taxoLevel,
              checkBox1:fetchedAlign.checkBox1,
              checkBox2:fetchedAlign.checkBox2,
              checkBox3:fetchedAlign.checkBox3,
              strategies:fetchedAlign.strategy,
              checkExist:fetchedAlign.checkExist,
              rowId:fetchedAlign.rowId,
              strategyId:fetchedAlign.strategyId,
              assessment:fetchedAlign.assessment,
              weightage:fetchedAlign.weightage,
              assessmentId:fetchedAlign.assessmentId,
              assessCheck:fetchedAlign.assessCheck,
              criteria:fetchedAlign.criteria,
              criteria2:fetchedAlign.criteria2
            }],


          };
        });
    }))
    .subscribe((transformedData)=>{

      this.alignData = transformedData;
      // console.log("this is a service")

      this.updateAlignData.next([...this.alignData]);
      // console.log(this.updateAlignData);

    });

  }

  getAssessData(){
    this.http.get<{message : string,assess : any}>(
      'http://localhost:3000/api/assess')
    .pipe(map((getAssess) =>{
        return getAssess.assess.map(fetchedAssess =>{
          return{
            id:fetchedAssess.alignmentId,
            CloInfo:[{
              courseId:fetchedAssess.courseId,
              rowId:fetchedAssess.rowId,
              assessment:fetchedAssess.assessment,
              weightage:fetchedAssess.weightage,
              assessmentId:fetchedAssess.assessmentId,
              assessCheck:fetchedAssess.assessCheck,
              finalExam:fetchedAssess.finalExam,
            }],


          };
        });
    }))
    .subscribe((transformedData)=>{

      this.assess = transformedData;
      // console.log("this is a service")

      this.assessUpdate.next([...this.assess]);
      // console.log(this.updateAlignData);

    });
  }



  saveContAssess(
    id:string,
    examId:string,
  sumHourMeetAssessment:number,
  sumHourReadyAssessment:number,
  checkFinal:boolean,
  examWeight:number,
  contAssessment:{
    activitiesCont:string,
    contId:string,
    hourMeetCont:number,
    hourNotMeetCont: number,
    hourReadyCont: number,
    weekReadyCont: number,
    checkCont:boolean
    weightage:number
  },
  teachLearn:{
    hourMeet: number,
    hourNotMeet: number,
    hourReady: number,
    strategyId: number,
    teachId: number,
    weekMeet: number,
    weekNotMeet: number,
    weekReady: number,
    checkExist:boolean,
  }
  ){
    const sltData:sltData={
      id:id,
      examId:examId,
      checkFinal:checkFinal,
      examWeight:examWeight,
      sumHourMeetAssessment:sumHourMeetAssessment,
      sumHourReadyAssessment:sumHourReadyAssessment,
      contAssessment:contAssessment,
      teachLearn:teachLearn
    };
    // console.log(sltData);
    this.http.post<{message:string,postId:string}>('http://localhost:3000/api/contAssess/'+id,sltData).subscribe((responseData)=>{
      // console.log("hai");
      this.router.navigate(["/list"]);
    })

  }


  getTeachData(){
    this.http.get<{message : string,teach : any}>(
      'http://localhost:3000/api/teach')
    .pipe(map((getTeach) =>{
        return getTeach.teach.map(fetchedTeach =>{
          return{
            id:fetchedTeach.courseId,
            teachLearn:[{
            activities:fetchedTeach.activitiesType,
            hourMeet:fetchedTeach.teachmeetHour,
            weekMeet:fetchedTeach.teachMeetWeek,
            hourNotMeet:fetchedTeach.teachnotMeetHour,
            weekNotMeet:fetchedTeach.teachnotMeetWeek,
            hourReady:fetchedTeach.teachPrepareHour,
            weekReady:fetchedTeach.teachPrepareWeek,
            teachId:fetchedTeach.teachId,
            checkExist:fetchedTeach.checkExist
            }],


          };
        });
    }))
    .subscribe((transformedData)=>{

      this.teachData = transformedData;
      // console.log(this.teachData)

      this.teachUpdate.next([...this.teachData]);
      // console.log(this.updateAlignData);

    });
  }



  getContAssess(){
    this.http.get<{message : string,contAsses : any}>(
      'http://localhost:3000/api/contAssess')
    .pipe(map((getContAssess) =>{
        return getContAssess.contAsses.map(fetchedContAssess =>{
          return{
            id:fetchedContAssess.courseId,
            contAssessment:[{
              activitiesCont:fetchedContAssess.assessType,
              contId:fetchedContAssess.contId,
              hourMeetCont:fetchedContAssess.meetHour,
              hourNotMeetCont: fetchedContAssess.notMeetHour,
              hourReadyCont: fetchedContAssess.prepareHour,
              weekReadyCont: fetchedContAssess.prepareWeek,
              checkCont: fetchedContAssess.checkCont,
              weightage:fetchedContAssess.weightage,
            }]


          };
        });
    }))
    .subscribe((transformedData)=>{

      this.contAssess = transformedData;
      // console.log(this.contAssess)

      this.contAssessUpdate.next([...this.contAssess]);
      // console.log(this.updateAlignData);

    });

  }



  getExamData(){
    this.http.get<{message : string,exam : any}>(
      'http://localhost:3000/api/finalExam')
    .pipe(map((getFinalExam) =>{
        return getFinalExam.exam.map(fetchedExam =>{
          return{
            id:fetchedExam.courseId,
            examId:fetchedExam.examId,
            sumHourMeetAssessment:fetchedExam.finalExamMeet,
            sumHourReadyAssessment:fetchedExam.finalExamPrepare,
            checkFinal:fetchedExam.checkFinal,
            examWeight:fetchedExam.examWeight



          };
        });
    }))
    .subscribe((transformedData)=>{

      this.finalExamData = transformedData;
      // console.log(this.finalExamData)

      this.finalExamUpdate.next([...this.finalExamData]);
      // console.log(this.updateAlignData);

    });
  }


  getMaxCredit(){
    this.http.get<{message : string,course : any}>(
      'http://localhost:3000/api/creditHour')
    .pipe(map((getCourseCredit) =>{
        return getCourseCredit.course.map(fetchedCourse =>{
          return{
            id:fetchedCourse.courseId,
            credit:fetchedCourse.credit,



          };
        });
    }))
    .subscribe((transformedData)=>{

      this.credit = transformedData;
      // console.log(this.finalExamData)

      this.creditUpdate.next([...this.credit]);
      // console.log(this.updateAlignData);

    });
  }



saveCurrentCourse(
  id:string,
  courseInfoId:string,
  lectureDay:string,
  lectureSession:string,
  lectureVenue:string,
  medium:string,
  practicalDay:string,
  practicalSession:string,
  practicalVenue:string,
  checkEdit:boolean,
  telephoneNo:string,
  references:{
    referenceId:string,
    reference:string,
    referCheck:boolean,
  },
  room:string,
  skill:string,
  teachTable:{
    teachTableId:string,
    checkTeachTable:boolean,
    weekOtherDesc:string,
    teachRef:{
      teachRefId:string,
      timeTableRef:string,
      checkRef:boolean,
      rowId:string
    },
    weekInfo:{
      activityDesc:string,
      activityId:string,
      activityType:string,
      checkWeekInfo:boolean,
      rowId:string,
    }
  }
){
  const currentCourse:currentCourse={
    id:id,
    courseInfoId:courseInfoId,
    lectureDay:lectureDay,
    lectureSession:lectureSession,
    lectureVenue:lectureVenue,
    medium:medium,
    practicalDay:practicalDay,
    practicalSession:practicalSession,
    practicalVenue:practicalVenue,
    checkEdit:checkEdit,
    telephoneNo:telephoneNo,
    room:room,
    skill:skill,
    references:references,
    teachTable:teachTable,
  }
  // console.log(currentCourse);
  this.http.post<{message:string,postId:string}>('http://localhost:3000/api/currentCourse/'+id,currentCourse).subscribe((responseData)=>{

    this.router.navigate(["/list"])

  })

}

getCurrentCourse(){
  this.http.get<{message : string,curCourse : any}>(
    'http://localhost:3000/api/currentCourse')
  .pipe(map((getCurrentCourse) =>{
      return getCurrentCourse.curCourse.map(fetchedCurCourse =>{
        return{
          id:fetchedCurCourse.courseId,
          lectureDay:fetchedCurCourse.lectureDay,
          lectureSession:fetchedCurCourse.lectureSession,
          lectureVenue:fetchedCurCourse.lectureVenue,
          medium:fetchedCurCourse.medium,
          practicalDay:fetchedCurCourse.practicalDay,
          practicalSession:fetchedCurCourse.practicalSession,
          practicalVenue:fetchedCurCourse.practicalVenue,
          checkEdit:fetchedCurCourse.checkEdit,
          telephoneNo:fetchedCurCourse.telephoneNo,
          room:fetchedCurCourse.room,
          skill:fetchedCurCourse.skill,
          courseInfoId:fetchedCurCourse.courseInfoId,
        };
      });
  }))
  .subscribe((transformedData)=>{



    this.currentCourseData=transformedData;
    // console.log(this.currentCourseData)
    this.curCourseupdate.next([...this.currentCourseData]);
    // console.log(this.updateAlignData);

  });
}


getCourseReference(){
  this.http.get<{message : string,courseRef : any}>(
    'http://localhost:3000/api/courseRef')
  .pipe(map((getCourseRef) =>{
      return getCourseRef.courseRef.map(fetchedCurCourse =>{
        return{
          id:fetchedCurCourse.courseId,
          referenceId:fetchedCurCourse.referenceId,
          referCheck:fetchedCurCourse.referCheck,
          referData:fetchedCurCourse.referData,
        };
      });
  }))
  .subscribe((transformedData)=>{

    this.courseRef=transformedData;

    this.courseRefupdate.next([...this.courseRef]);
    // console.log(this.courseRef);
    // this.router.navigate(["/list"]);

  });
}



getWeekOther(){
  this.http.get<{message : string,weekOtherData : any}>(
    'http://localhost:3000/api/weekOther')
  .pipe(map((getWeekOtherData) =>{
      return getWeekOtherData.weekOtherData.map(fetchedData =>{
        return{
          id:fetchedData.courseId,
          teachTable:[{
            teachTableId:fetchedData.teachTableId,
            checkTeachTable:fetchedData.checkTeachTable,
            weekOtherDesc:fetchedData.weekOtherDesc,
            rowId:fetchedData.rowId
          }]
        };
      });
  }))
  .subscribe((transformedData)=>{

    this.weekOther=transformedData;

    this.weekOtherUpdate.next([...this.weekOther]);
    // console.log(this.weekOther);
    // this.router.navigate(["/list"]);

  });
}


getTeachRef(){
  this.http.get<{message : string,teachRefData : any}>(
    'http://localhost:3000/api/teachRef')
  .pipe(map((getTeachRef) =>{
      return getTeachRef.teachRefData.map(fetchedData =>{
        return{
          id:fetchedData.courseId,
          teachTable:[{
            teachRef:[{
              teachRefId:fetchedData.teachRefId,
              timeTableRef:fetchedData.teachTableRef,
              checkRef:fetchedData.checkRef,
              rowId:fetchedData.rowId
            }]
          }]

        };
      });
  }))
  .subscribe((transformedData)=>{

    this.teachRef=transformedData;

    this.teachRefUpdate.next([...this.teachRef]);
    // console.log(this.teachRef);
    // this.router.navigate(["/list"]);

  });
}


getWeekInfo(){
  this.http.get<{message : string,teachRefData : any}>(
    'http://localhost:3000/api/weekInfo')
  .pipe(map((getTeachRef) =>{
      return getTeachRef.teachRefData.map(fetchedData =>{
        return{
          id:fetchedData.courseId,
          teachTable:[{
            weekInfo:[{
              activityDesc:fetchedData.activityDesc,
              activityId:fetchedData.activityId,
              activityType:fetchedData.activityType,
              checkWeekInfo:fetchedData.checkWeekInfo,
              rowId:fetchedData.rowId,
            }]
          }]

        };
      });
  }))
  .subscribe((transformedData)=>{

    this.weekInfo=transformedData;

    this.weekInfoUpdate.next([...this.weekInfo]);
    // console.log(this.weekInfo);
    // this.router.navigate(["/list"]);

  });
}




}

