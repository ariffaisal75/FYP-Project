export interface sltData{
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
    checkCont:boolean,
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
}
