export interface sltoutmodel{
  id:string,
  name:string,
  course:string,
  session:string,
  semester:string,

  activity1Type1:string,
  activity1Type2:string,
  activity1Type3:string,

  pemberatmakmal:string,
  pemberatpresentation1:string;
  pemberatpresentation2:string;
  pemberatexam:string;

  activity2Type1:string,
  activity2Type2:string,
  activity2Type3:string,

  activity3Type1:string,
  activity3Type2:string,
  activity3Type3:string,

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
}
