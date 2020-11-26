import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup,FormArray } from '@angular/forms';
import {Form} from '../post.model';
import {NgForm} from "@angular/forms";
import { FormsService } from '../post.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { courses } from '../course.model';
import { Subscription } from 'rxjs';
import {MatDialog} from "@angular/material"
import { WeightErrorComponent } from '../errorweight/errorweight.componet';
import { EmptyInputComponent } from '../emptyinput/emptyinput.component';
import { user } from '../user-data.model';
import { align } from '../align.model';
import{cloInfo} from '../cloInfo.model';






@Component({
  selector : 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls : ['./form-create.component.css']

})

export class FormcreateComponent implements OnInit,OnDestroy{
  enteredCourse = '';
  enteredSession = '';
  enteredSemester = '';
  isLoading= false;
  private mode='create';
  private postId:string;
  form:Form;


  orderForm:FormGroup;
  strate:FormArray;
  assess:FormArray;
  newRow:FormArray;


  constructor(public formsService: FormsService,public route: ActivatedRoute,private dialog:MatDialog,private formBuilder:FormBuilder,private router:Router){}

  newPost = 'NO CREATED FORM';


  sessions:string[] = ['2017/2018','2018/2019','2019/2020'];
  name: string[] = ['Arif Faisal Bin Ahmad Jais'];
  courseControl = new FormControl();
  semesters:string[]=["1","2","3"]
  // courses:string[] = ['GLT 1004: Mastering English 3','WIF 1003: Software Evolution','WIF 1004: Software Testing'];
  myControl = new FormControl();
  totalweightage=0;
  align:align[]=[];
  assessData:align[]=[];
  course:courses[]=[];
  users:user[];
  Iclo:cloInfo[]=[];
  private userSub : Subscription;
  private courseSub :Subscription;
  private alignSub :Subscription;
   plo1;
  plo2;
  plo3;
 holdAlign=[];

ngOnInit(){



  this.orderForm = this.formBuilder.group({
    plo1:'',
    plo2:'',
    plo3:'',
    cloInfo:this.formBuilder.array([this.createNewRow()]),

  });







  // console.log("hai")

//   this.alignSub=this.formsService.getAlignUpdateListener()
//   .subscribe((alignment:align[])=>{
//     // console.log("this is course list : "+course)
//       // this.align=alignment;
//       console.log(this.align);
//       // this.getEditData(alignment);
//   }
// );

this.formsService.getUserInfo();
    this.userSub=this.formsService.getUserUpdateListener()
    .subscribe((user:user[])=>{
      this.users=user;
    });



  this.route.paramMap.subscribe((paramMap: ParamMap)=>{

    if(paramMap.has('id')){
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        // this.formsService.getAlignmentData(this.postId);
        // console.log(this.postId)
        this.isLoading=true;
        this.formsService.getCourseDetail(this.postId);
        this.formsService.getCourse();
        // this.align=this.formsService.getAlignmentData();

        this.align=this.formsService.getEditalignment(this.postId);

        this.assessData=this.formsService.getEditassess(this.postId);
        console.log(this.assessData)       // this.course=this.formsService.getCourseInfo(this.postId);

        // this.alignSub=this.formsService.getAlignUpdateListener().subscribe((align:align)=>
        // {
        //   this.align=align;
        //   console.log(this.align);
        //   this.getAllData(this.align);

        // });

        this.courseSub=this.formsService.getCourseDetailListener().subscribe((course)=>{
          this.course=course;
          // console.log(this.course)
        });

        console.log(this.assessData);
        // console.log(this.orderForm.get('cloInfo'));
        // this.orderForm.setControl('cloInfo', this.setClo(this.align));

        if(this.align.length>0){

          // this.holdAlign=this.align;
          // console.log(this.align);
          // for(var i=0;i<this.align.length;i++){

          // }


          this.orderForm.patchValue({
            plo1:this.align[this.align.length-1].plo1,
            plo2:this.align[this.align.length-1].plo2,
            plo3:this.align[this.align.length-1].plo3,
          })
          if(this.assessData.length>0){
            this.orderForm.setControl('cloInfo',this.setClo(this.align,this.assessData));
          }



            // console.log(this.orderForm.get('cloInfo'))

            this.weightchange(this.orderForm)

        }
        // else{
        //   this.router.navigate(["/list"]);
        // }





        // this.getEditData(this.align);

        // this.form=this.formsService.getPost(this.postId);
        // this.lab1weight=this.form.lab1;
        // this.lab2weight=this.form.lab2;
        // this.lab3weight=this.form.lab3;

        // this.present1weight1=this.form.presentation1asign1;
        // this.present1weight2=this.form.presentation1asign2;
        // this.present1weight3=this.form.presentation1asign3;

        // this.present2weight1=this.form.presentation2asign1;
        // this.present2weight2=this.form.presentation2asign2;
        // this.present2weight3=this.form.presentation2asign3;

        // this.examweight1=this.form.ujianAkhir1;
        // this.examweight2=this.form.ujianAkhir2;
        // this.examweight3=this.form.ujianAkhir3;


        // this.caltotalweight();

        this.isLoading=false;

    }else{
      this.mode = 'create';
      this.postId = null;
      this.isLoading=false;
    }
  });
}



test(){
  console.log("haiiiiiii")
}
  onAddForm(f : NgForm) {
    if(f.invalid){
      console.log("invalid form")
      this.dialog.open(EmptyInputComponent)
      return;
    }
    this.totalweightage= f.value.lab1+f.value.presentation1asign1+f.value.presentation2asign1+f.value.ujianAkhir1+f.value.lab2+
    f.value.presentation1asign2+f.value.presentation2asign2+f.value.ujianAkhir2+f.value.lab3+f.value.presentation1asign3+f.value.presentation2asign3+f.value.ujianAkhir3;

    if(this.totalweightage<100 )
    {
      console.log(this.totalweightage)
      this.dialog.open(WeightErrorComponent, {data :{message:"Weightage less than 100",total:this.totalweightage}});
      return;
    }

    if(this.totalweightage>100){
      this.dialog.open(WeightErrorComponent, {data :{message:"Weightage more than 100",total:this.totalweightage}});
      return;
    }

    this.isLoading=true;
    // console.log("check 1 "+f.value.strategi1Check1);
    if(this.mode==='create'){

      this.formsService.addPost(
        "arif",f.value.course,f.value.session,f.value.semester,

        f.value.CLO,f.value.taksonomi1,
        f.value.clo1plo1,f.value.plo1check1,
        f.value.clo1plo2,f.value.plo1check2,
        f.value.clo1plo3,f.value.plo1check3,
        f.value.strategi1Check1,
        f.value.strategi1Check2,
        f.value.strategi1Check3,
        f.value.lab1,
        f.value.presentation1asign1,
        f.value.presentation2asign1,
        f.value.ujianAkhir1,
        f.value.pencapaianHasil1,

        f.value.CLO2,f.value.taksonomi2,
        f.value.clo2plo1,f.value.plo2check1,
        f.value.clo2plo2,f.value.plo2check2,
        f.value.clo2plo3,f.value.plo2check3,
        f.value.strategi2Check1,
        f.value.strategi2Check2,
        f.value.strategi2Check3,
        f.value.lab2,
        f.value.presentation1asign2,
        f.value.presentation2asign2,
        f.value.ujianAkhir2,
        f.value.pencapaianHasil2,

        f.value.CLO3,f.value.taksonomi3,
        f.value.clo3plo1,f.value.plo3check1,
        f.value.clo3plo2,f.value.plo3check2,
        f.value.clo3plo3,f.value.plo3check3,
        f.value.strategi3Check1,
        f.value.strategi3Check2,
        f.value.strategi3Check3,
        f.value.lab3,
        f.value.presentation1asign3,
        f.value.presentation2asign3,
        f.value.ujianAkhir3,
        f.value.pencapaianHasil3);
    }else{
      console.log("Edited");

      this.formsService.updatePost(this.postId,"arif",f.value.course,f.value.session,f.value.semester,

      f.value.CLO,f.value.taksonomi1,
      f.value.clo1plo1,f.value.plo1check1,
      f.value.clo1plo2,f.value.plo1check2,
      f.value.clo1plo3,f.value.plo1check3,
      f.value.strategi1Check1,
      f.value.strategi1Check2,
      f.value.strategi1Check3,
      f.value.lab1,
      f.value.presentation1asign1,
      f.value.presentation2asign1,
      f.value.ujianAkhir1,
      f.value.pencapaianHasil1,

      f.value.CLO2,f.value.taksonomi2,
      f.value.clo2plo1,f.value.plo2check1,
      f.value.clo2plo2,f.value.plo2check2,
      f.value.clo2plo3,f.value.plo2check3,
      f.value.strategi2Check1,
      f.value.strategi2Check2,
      f.value.strategi2Check3,
      f.value.lab2,
      f.value.presentation1asign2,
      f.value.presentation2asign2,
      f.value.ujianAkhir2,
      f.value.pencapaianHasil2,

      f.value.CLO3,f.value.taksonomi3,
      f.value.clo3plo1,f.value.plo3check1,
      f.value.clo3plo2,f.value.plo3check2,
      f.value.clo3plo3,f.value.plo3check3,
      f.value.strategi3Check1,
      f.value.strategi3Check2,
      f.value.strategi3Check3,
      f.value.lab3,
      f.value.presentation1asign3,
      f.value.presentation2asign3,
      f.value.ujianAkhir3,
      f.value.pencapaianHasil3);
    }

      f.resetForm();

  }

// getEditData(align){
//   console.log(align)
//   this.orderForm.patchValue({
//     plo1:align.plo1,
//     plo2:align.plo2,
//     plo3:align.plo3,
//     // cloInfo:{
//     //     clo:align.CloInfo.clo,
//     //     taxoLevel:align.CloInfo.taxoLevel,
//     //     checkBox1:align.CloInfo.checkBox1,
//     //     checkBox2:align.CloInfo.checkBox2,
//     //     checkBox3:align.CloInfo.checkBox3,
//         // strategies:{
//         //   strategy:align.CloInfo.strategies.strategy,
//         // },
//         // assessment:{
//         //   assessment:align.CloInfo.assessment.assessment,
//         //   weightage:align.CloInfo.assessment.weightage
//         // }

//     }

//   // })
// })

checkSame;
checkStrategy='';
checkAssess='';
count=1;

holdAssess;
finalTemp=[];
  setClo(clo,assess): FormArray{
    const formArray = new FormArray([]);
    // console.log(assess);
    var countAssess=0;
    var countRow=1;
    for(var i=0;i<clo.length;i++){
      // this.count=1;
      // console.log(assess[countAssess].CloInfo[0].finalExam)
      // if(assess.length>0){
      //   this.holdAssess=;
      // }
      // else if(assess.length<0){

        for(var j=0;j<assess.length;j++){
          // console.log(assess[j].CloInfo[0].rowId)
          if(assess[j].CloInfo[0].rowId==countRow  && countRow<clo.length+1){
            this.finalTemp[countRow-1]=assess[j].CloInfo[0].finalExam;
            countRow++
            console.log("hai")
            // console.log("this.finalTemp[this.countRow]")
          }


        }
      //   this.holdAssess='';
      // }
      // console.log(clo);
      // console.log(assess)
      if(this.checkSame!==clo[i].CloInfo[0].cloId && countAssess<3){
        this.checkSame=clo[i].CloInfo[0].cloId;

        formArray.push(
          this.formBuilder.group({
            clo:clo[i].CloInfo[0].clo,
            taxoLevel:clo[i].CloInfo[0].taxoLevel,
            checkBox1:clo[i].CloInfo[0].checkBox1,
            checkBox2:clo[i].CloInfo[0].checkBox2,
            checkBox3:clo[i].CloInfo[0].checkBox3,
            strategies:this.setStrategy(clo,this.count),
            assessment:this.setAssess(this.assessData,this.count),
            criteria1:clo[i].CloInfo[0].criteria,
            criteria2:clo[i].CloInfo[0].criteria2,
            cloId:clo[i].CloInfo[0].cloId,
            finalExam:this.finalTemp[countAssess],
            // ,
          })
        )
          countAssess++;
          this.count++;
      }

    }
    return formArray;
  }


strId=[];
assessId;
  setStrategy(str,row):FormArray{
    const formArray = new FormArray([]);
    // console.log(str);
    for(var s=0;s<str.length;s++){

      if(str[s].CloInfo[0].strategies!=null){
          this.checkStrategy=str[s].CloInfo[0].clo;
          if(row==str[s].CloInfo[0].rowId)
          {
            if(this.strId[0]!==str[s].CloInfo[0].strategyId && s==0){
              this.strId[0]=str[s].CloInfo[0].strategyId;
            }
            for(var i=0;i<this.strId.length;i++)
            {
              if(this.strId[i]==str[s].CloInfo[0].strategyId ){

              }
            }
              this.strId[s]=str[s].CloInfo[0].strategyId;
              formArray.push(
                this.formBuilder.group({
                  strategy:str[s].CloInfo[0].strategies,
                  strategyId:str[s].CloInfo[0].strategyId,
                  checkExist:str[s].CloInfo[0].checkExist

                })
              )


          }


      }
    }

    return formArray;
  }


  setAssess(assess,row):FormArray{
    const formArray = new FormArray([]);
    // console.log(assess);
    for(var i=0;i<assess.length;i++){
      if(assess[i].CloInfo[0].assessment!=null){

        if(row==assess[i].CloInfo[0].rowId){
          if(this.assessId!=assess[i].CloInfo[0].assessmentId){
            this.assessId=assess[i].CloInfo[0].assessmentId;
            formArray.push(
              this.formBuilder.group({
                assess:assess[i].CloInfo[0].assessment,
                weightage:assess[i].CloInfo[0].weightage,
                assessmentId:assess[i].CloInfo[0].assessmentId,
                assessCheck:assess[i].CloInfo[0].assessCheck
              })
            )
          }

    }
      }

    }


      return formArray;
  }




  saveData(){

    if(this.totalWeight<100 )
    {
      // console.log(this.totalweightage)
      this.dialog.open(WeightErrorComponent, {data :{message:"Weightage less than 100",total:this.totalWeight}});
      return;
    }else if(this.totalWeight>100){
      this.dialog.open(WeightErrorComponent, {data :{message:"Weightage More than 100",total:this.totalWeight}});
      return;
    }


    this.formsService.saveUserPost(this.postId,
      this.orderForm.value.plo1,this.orderForm.value.plo2,this.orderForm.value.plo3,this.orderForm.value.cloInfo);
    // console.log(this.orderForm.value);
    // console.log()
  }


  createNewRow():FormGroup{
    return this.formBuilder.group({
      clo:'',
      taxoLevel:'',
      checkBox1:'',
      checkBox2:'',
      checkBox3:'',
      strategies:this.formBuilder.array([this.createStrategies()]),
      assessment:this.formBuilder.array([this.createAssessment()]),
      criteria1:'',
      criteria2:'',
      finalExam:'',
      cloId:''
    })
  }

  createStrategies():FormGroup{
    return this.formBuilder.group({
      strategy:'',
      strategyId:'',
      checkExist:'',
    });
  }

  createAssessment():FormGroup{
    return this.formBuilder.group({
      assess:'',
      weightage:'',
      assessmentId:'',
      assessCheck:'',

    })
  }

  addStrategiesButton(str){

    (<FormArray>str.get('strategies')).push(this.createStrategies());
  }
  addAssessmentButton(assess){
    (<FormArray>assess.get('assessment')).push(this.createAssessment());
  }
  addNewRowButton(){
    (<FormArray>this.orderForm.get('cloInfo')).push(this.createNewRow());
  }


  // addStrategies():void{
  //   this.strate = this.orderForm.get('strategies')as FormArray;
  //   this.strate.push(this.createStrategies());
  // }
  // addAssessment():void{
  //   this.assess = this.orderForm.get('assessment')as FormArray;
  //   this.assess.push(this.createAssessment());
  // }

  // addNewRow(){
  //   this.assess = this.orderForm.get('cloInfo')as FormArray;
  //   this.assess.push(this.createAssessment());
  // }

  removeStrategiesButton(i,str,t){
    this.DeleteStrategies(t);
    (<FormArray>str.get('strategies')).removeAt(i);

  }
  hold='';
  removeAssessmentButton(i,assessment,assessId){
    this.DeleteAssessment(assessId);
    (<FormArray>assessment.get('assessment')).removeAt(i);
  }
  removeNewRowButton(i){
    // console.log((<FormArray>this.orderForm.get('cloInfo')));
    (<FormArray>this.orderForm.get('cloInfo')).removeAt(i);
  }


  DeleteAssessment(assessId){

    if(assessId!==''){
      this.formsService.deleteAssessment(assessId);
    }

  }



  DeleteStrategies(strategyId){

    if(strategyId!==''){
      this.formsService.deleteStrategies(strategyId);
    }

  }


  ngOnDestroy(){
    this.courseSub.unsubscribe();
    // this.alignSub.unsubscribe();
  }


 totalWeight=0;
 numconver;
 finalWeight=0;
  weightchange(v){
    // console.log((<FormArray>this.orderForm.get('cloInfo')).value)
    this.totalWeight=0
    for(var j=0;j<(<FormArray>this.orderForm.get('cloInfo')).value.length;j++){

      for(var i=0;i<(<FormArray>this.orderForm.get('cloInfo')).value[j].assessment.length; i++){



        this.numconver= +(<FormArray>this.orderForm.get('cloInfo')).value[j].assessment[i].weightage;
        // console.log("this is change"+this.numconver)
        this.totalWeight=this.totalWeight+this.numconver;
        // console.log( this.totalWeight);
      }
    }

    for(var f=0;f<(<FormArray>this.orderForm.get('cloInfo')).value.length;f++){
      this.finalWeight=+(<FormArray>this.orderForm.get('cloInfo')).value[f].finalExam;
      this.totalWeight=this.totalWeight+this.finalWeight;
    }

  }


}
