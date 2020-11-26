export interface cloInfo{

  cloIn:{
    id:string,
    // clo:string,
    // taxoLevel:string,
    // checkBox1:string,
    // checkBox2:string,
    // checkBox3:string,
    // strategies:{
    //   strategy:string,
    //   strategyId:string,
    //   checkExist:boolean,
    // },
    courseId:string,
    assessment:{
      assessment:string,
      weightage:number,
      assessmentId:string,
      assessCheck:boolean,
    },
    criteria:string,
    finalExam:number,
  }
}


