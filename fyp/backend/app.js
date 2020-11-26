const express =  require('express');
const bodyParser = require('body-parser');
const checkAuth = require("./middleware/check-auth");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");





const mysql = require('mysql');

//create connection to database
//the mysql.createConnection function takes in a configuration object which contain host,user,password and the databse name.
// const db = mysql.createConnection({
//   //properties
//   host: 'localhost',
//   user:'root',
//   password:'arif1997',
//   database:'fmsd'
// });
const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'',
  database:'fyp2',
  multipleStatements: true
});
//connect to database
db.connect((err) => {
  if(err){
    console.log(err);
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");

  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-type,Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods"," GET, POST, PATCH, PUT,  DELETE, OPTIONS");
  next();
});

app.get("/api/course",(req,res,next)=>{

  db.query(
    "SELECT courseId,courseName FROM course",
    (error,course)=>{
      if(error){
        console.error(error);
        res.status(500).json({message: "Failed to fetch"})
      }else{

        res.status(200).json({
          message: "Successfully fetch",
          course:course
        })
      }
    }
  )

});


app.get("/api/slt",(req,res,next)=>{

  db.query(
    "SELECT a.*,  s.hourmeetlab,s.hournotmeetlab,s.weeknotmeetlab,s.hourreadylab,s.weekreadylab,s.weekmeetlab,s.hourmeettuto,s.weekmeettuto,s.hournotmeettuto,s.weeknotmeettuto,s.hourreadytuto,s.weekreadytuto,s.hourmeetlec,s.weekmeetlec,s.hournotmeetlec,s.weeknotmeetlec,s.hourreadylec,s.weekreadylec,s.penilaianNotmeetLab,s.penilaianNotmeetpresentation1,s.weekreadypresent1,s.penilaianmeetpresentation2,s.penilaianNotmeetpresentation2,s.weekreadypresent2,s.hourreadypresent2,s.hourreadypresent1,s.penilaianmeetpresentation1,s.penilaianmeetexamFinal,s.penilaiannotmeetexamFinal,s.penilaianReadylab,s.penilaianMeetLab,s.readyexam,s.editCheck FROM alignment AS a LEFT JOIN slt AS s ON s.alignID=a.alignID ",

  (error,Data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({

        message:"Successfull fetch",
        sltout:Data
      })
    }

  })

});

app.post("/api/slt",(req,res,next)=>{

  db.query('INSERT INTO slt (alignID,  hourmeetlab,weekmeetlab,hournotmeetlab,weeknotmeetlab,hourreadylab,weekreadylab,  hourmeettuto,weekmeettuto,hournotmeettuto,weeknotmeettuto,hourreadytuto,weekreadytuto,  hourmeetlec,weekmeetlec,hournotmeetlec,weeknotmeetlec,hourreadylec,weekreadylec,  penilaianMeetLab,penilaianNotmeetLab,penilaianReadylab,  penilaianmeetpresentation1,penilaianNotmeetpresentation1,hourreadypresent1,weekreadypresent1,  penilaianmeetpresentation2,penilaianNotmeetpresentation2,hourreadypresent2,weekreadypresent2,  penilaianmeetexamFinal,penilaiannotmeetexamFinal,readyexam,editCheck) VALUES (?, ?,?,?,?,?,?, ?,?,?,?,?,?, ?,?,?,?,?,?, ?,?,?, ?,?,?,?, ?,?,?,?,  ?,?,?,?)',
  [req.body.id,req.body.hourmeetlab,req.body.weekmeetlab,req.body.hournotmeetlab,req.body.weeknotmeetlab,req.body.hourreadylab,req.body.weekreadylab,
req.body.hourmeettuto,req.body.weekmeettuto,req.body.hournotmeettuto,req.body.weeknotmeettuto,req.body.hourreadytuto,req.body.weekreadytuto,
req.body.hourmeetlec,req.body.weekmeetlec,req.body.hournotmeetlec,req.body.weeknotmeetlec,req.body.hourreadylec,req.body.weekreadylec,
req.body.penilaianMeetLab,req.body.penilaianNotmeetLab,req.body.penilaianReadylab,
req.body.penilaianmeetpresentation1,req.body.penilaianNotmeetpresentation1,req.body.hourreadypresent1,req.body.weekreadypresent1,
req.body.penilaianmeetpresentation2,req.body.penilaianNotmeetpresentation2,req.body.hourreadypresent2,req.body.weekreadypresent2,
req.body.penilaianmeetexamFinal,req.body.penilaiannotmeetexamFinal,req.body.readyexam,req.body.checkEdit],
(error)=>{
  if(error){
    console.log(error);
    res.status(500).json({
      message:'error post'
    });
  }else{
    res.status(200).json({
      message:'Successful save'
    });
  }
}
  );

});

app.put("/api/slt/:id",(req,res,next)=>{
  db.query(
    'UPDATE alignment AS a ,slt AS s SET a.course =?,a.session=?,a.semester=?,s.hourmeetlab=?,s.weekmeetlab=?,s.hournotmeetlab=?,s.weeknotmeetlab=?,s.hourreadylab=?,s.weekreadylab=?,s.hourmeettuto=?,s.weekmeettuto=?,s.hournotmeettuto=?,s.weeknotmeettuto=?,s.hourreadytuto=?,s.weekreadytuto=?,s.hourmeetlec=?,s.weekmeetlec=?,s.hournotmeetlec=?,s.weeknotmeetlec=?,s.hourreadylec=?,s.weekreadylec=?,s.penilaianMeetLab=?,s.penilaianNotmeetLab=?,s.penilaianReadylab=?,s.penilaianmeetpresentation1=?,s.penilaianNotmeetpresentation1=?,s.hourreadypresent1=?,s.weekreadypresent1=?,s.penilaianmeetpresentation2=?,s.penilaianNotmeetpresentation2=?,s.hourreadypresent2=?,s.weekreadypresent2=?,s.penilaianmeetexamFinal=?,penilaiannotmeetexamFinal=?,readyexam=?  WHERE a.alignID =? AND s.alignID =? ',
    [req.body.course,req.body.session,req.body.semester,req.body.hourmeetlab,req.body.weekmeetlab,req.body.hournotmeetlab,req.body.weeknotmeetlab,req.body.hourreadylab,req.body.weekreadylab,
      req.body.hourmeettuto,req.body.weekmeettuto,req.body.hournotmeettuto,req.body.weeknotmeettuto,req.body.hourreadytuto,req.body.weekreadytuto,
      req.body.hourmeetlec,req.body.weekmeetlec,req.body.hournotmeetlec,req.body.weeknotmeetlec,req.body.hourreadylec,req.body.weekreadylec,
      req.body.penilaianMeetLab,req.body.penilaianNotmeetLab,req.body.penilaianReadylab,
      req.body.penilaianmeetpresentation1,req.body.penilaianNotmeetpresentation1,req.body.hourreadypresent1,req.body.weekreadypresent1,
      req.body.penilaianmeetpresentation2,req.body.penilaianNotmeetpresentation2,req.body.hourreadypresent2,req.body.weekreadypresent2,
      req.body.penilaianmeetexamFinal,req.body.penilaiannotmeetexamFinal,req.body.readyexam,req.params.id,req.params.id
    ],
    (error,data)=>{
      if(error){
        console.error(error);
        res.status(500).json({status:'error'});
      }else{
        // console.log(req.params.id);
        res.status(200).json({status:'updated'})
      }
    }
  )

});

app.get("/api/userdata",checkAuth,(req,res,next)=>{

  db.query(
    'SELECT * FROM user WHERE userId=?',
    [req.userData.userId],
    (error,users)=>{
      if(error){
        console.log(error);
        res.status(500).json({status:'Failed to fetch'});
      }else{
        // console.log(users)
        res.status(200).json({
          message: 'Posts fetch successfully',
          user:users
        });

      }
    }
  )

});



app.post("/api/alignment/:id",(req,res,next)=>{
rowId=0;
  // console.log(req.body.CloInfo);

  for(j=0;j<req.body.CloInfo.length;j++){
    for( i=0;i<req.body.CloInfo[j].strategies.length; i++)
    {
      rowId=j+1;
      console.log(req.body.CloInfo[j]);
      if(req.body.CloInfo[j].strategies[i].checkExist)
      {
          db.query('UPDATE strategies SET strategy=? WHERE strategyId=?',
            [req.body.CloInfo[j].strategies[i].strategy,req.body.CloInfo[j].strategies[i].strategyId]
            );(error)=>{

              if(error){
                console.log(error);
                res.status(500).json({
                  message:'error post'
                });
              }
            }
      }else if(!req.body.CloInfo[j].strategies[i].checkExist){

            // console.log("test"+rowId)
            // console.log(req.body.CloInfo[i].assessment[j].assess);
            db.query('INSERT INTO strategies(strategy,courseId,rowId,checkExist) VALUES (?,?,?,?) ',
              [req.body.CloInfo[j].strategies[i].strategy,req.params.id,rowId,true]
              );(error)=>{

                if(error){
                  console.log(error);
                  res.status(500).json({
                    message:'error post'
                  });
                }
              }


          }
        }
      }




  for(j=0;j<req.body.CloInfo.length;j++){
    for( i=0;i<req.body.CloInfo[j].assessment.length; i++)
    {
      rowId=j+1;
      // console.log(rowId);

      if(req.body.CloInfo[j].assessment[i].assessCheck){

        db.query('UPDATE assessment SET assessment=?,weightage=?,finalExam=? WHERE assessmentId=? AND rowId=?',
        [req.body.CloInfo[j].assessment[i].assess,req.body.CloInfo[j].assessment[i].weightage,req.body.CloInfo[j].finalExam,req.body.CloInfo[j].assessment[i].assessmentId,rowId]
        );(error)=>{
          if(error){
            console.log(error);
            res.status(500).json({
              message:'error post'
            });
          }
        }

      }else if(!req.body.CloInfo[j].assessment[i].assessCheck){

        db.query('INSERT INTO assessment(assessment,weightage,courseId,rowId,assessCheck,finalExam) VALUES (?,?,?,?,?,?) ',
        [req.body.CloInfo[j].assessment[i].assess,req.body.CloInfo[j].assessment[i].weightage,req.params.id,rowId,true,req.body.CloInfo[j].finalExam]
        );(error)=>{

          if(error){
            console.log(error);
            res.status(500).json({
              message:'error post'
            });
          }
        }
      }


    }
  }




  for(i=0;i<req.body.CloInfo.length;i++){
    rowId=i+1;
    db.query('UPDATE clo SET criteria=?,criteria2=? WHERE courseId=? AND rowId=?',
    [req.body.CloInfo[i].criteria1,req.body.CloInfo[i].criteria2,req.params.id,rowId]);
    (error)=>{
      if(error){
        console.log(error);
        res.status(500).json({
          message:'error post'
        });
      }
    }
  }



  res.status(200).json({
    message:'Successful save'
  });


});

app.get("/api/align",(req,res,next)=>{

  db.query(
    "SELECT a.*, c.cloId,c.clo,c.taxoLevel,c.checkBox1, c.checkBox2,c.checkBox3,c.criteria,c.criteria2,str.strategy,str.checkExist,str.rowId,str.strategyId FROM align AS a RIGHT JOIN clo AS c ON c.courseId=a.courseId LEFT JOIN strategies as str ON c.rowId=str.rowId AND c.courseId=str.courseId ",

  (error,Data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({

        message:"Successfull fetch",
        alignData:Data
      })
    }

  })

});


app.get("/api/assess",(req,res,next)=>{

  db.query(
    "SELECT a.*, c.cloId,c.clo,c.taxoLevel,c.checkBox1, c.checkBox2,c.checkBox3,c.criteria,c.criteria2,assess.assessment,assess.assessCheck,assess.weightage,assess.assessmentId,assess.rowId,assess.finalExam FROM align AS a RIGHT JOIN clo AS c ON c.courseId=a.courseId LEFT JOIN assessment AS assess ON c.rowId=assess.rowId AND c.courseId=assess.courseId",
  (error,Data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        assess:Data
      })
    }

  })

});



app.get("/api/courseDetail/:id",(req,res,next)=>{
  db.query("SELECT * FROM course WHERE courseId=?",
  [req.params.id],
  (error,Data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({

        message:"Successfull fetch",
        course:Data
      })
    }

  })
})


app.delete("/api/strategy/:id",(req,res,next)=>{

  db.query("DELETE FROM strategies WHERE strategyId=?",
  [req.params.id],
  (error)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
      })
    }

  })
})


app.delete("/api/assessment/:id",(req,res,next)=>{

  db.query("DELETE FROM assessment WHERE assessmentId=?",
  [req.params.id],
  (error)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to Delete"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull Delete",
      })
    }

  })
})


app.post("/api/contAssess/:id",(req,res,next)=>{



console.log(req.body)
  for(i=0;i<req.body.teachLearn.length;i++){

    if(!req.body.teachLearn[i].checkExist){
      db.query("INSERT INTO teachlearn(teachmeetHour,teachMeetWeek,teachnotMeetHour,teachnotMeetWeek,teachPrepareHour,teachPrepareWeek,courseId,rowId,checkExist,activitiesType) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [req.body.teachLearn[i].hourMeet,req.body.teachLearn[i].weekMeet,req.body.teachLearn[i].hourNotMeet,req.body.teachLearn[i].weekNotMeet,req.body.teachLearn[i].hourReady,req.body.teachLearn[i].weekReady,req.params.id,i+1,true,req.body.teachLearn[i].activities],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to save"})
        }

      })
    }else if(req.body.teachLearn[i].checkExist){
      // console.log(req.body);
      db.query("UPDATE teachlearn SET teachmeetHour=?, teachMeetWeek=?, teachnotMeetHour=?,teachnotMeetWeek=?,teachPrepareHour=?,teachPrepareWeek=?,activitiesType=? WHERE teachId=?",
      [req.body.teachLearn[i].hourMeet,req.body.teachLearn[i].weekMeet,req.body.teachLearn[i].hourNotMeet,req.body.teachLearn[i].weekNotMeet,req.body.teachLearn[i].hourReady,req.body.teachLearn[i].weekReady,req.body.teachLearn[i].activities,req.body.teachLearn[i].teachId],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to update"})
        }

      })
    }

  }

  if(!req.body.checkFinal){
    db.query("INSERT INTO sumassessment(courseId,finalExamMeet,finalExamPrepare,checkFinal,examWeight) VALUES (?,?,?,?,?)",
    [req.params.id,req.body.sumHourMeetAssessment,req.body.sumHourReadyAssessment,true,req.body.examWeight],
    (error)=>{
      if(error){
        console.error(error);
        res.status(500).json({message:"failed to update"})
      }

    })
  }else if(req.body.checkFinal){
    db.query("UPDATE sumassessment SET finalExamMeet=?, finalExamPrepare=?,examWeight=? WHERE examId=?",
    [req.body.sumHourMeetAssessment,req.body.sumHourReadyAssessment,req.body.examWeight,req.body.examId],
    (error)=>{
      if(error){
        console.error(error);
        res.status(500).json({message:"failed to update"})
      }

    })
  }



  for(c=0;c<req.body.contAssessment.length;c++){

    if(!req.body.contAssessment[c].checkCont){
      db.query("INSERT INTO contassessment(meetHour,notMeetHour,courseId,prepareHour,prepareWeek,checkCont,assessType,weightage) VALUES (?,?,?,?,?,?,?,?)",
      [req.body.contAssessment[c].hourMeetCont,req.body.contAssessment[c].hourNotMeetCont,req.params.id,req.body.contAssessment[c].hourReadyCont,req.body.contAssessment[c].weekReadyCont,true,req.body.contAssessment[c].activitiesCont,req.body.contAssessment[c].weightage],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to save"})
        }

      })
    }else if(req.body.contAssessment[c].checkCont){

      db.query("UPDATE contassessment SET meetHour=?,notMeetHour=?,prepareHour=?,prepareWeek=?,assessType=?,weightage=? WHERE contId=?",
      [req.body.contAssessment[c].hourMeetCont,req.body.contAssessment[c].hourNotMeetCont,req.body.contAssessment[c].hourReadyCont,req.body.contAssessment[c].weekReadyCont,req.body.contAssessment[c].activitiesCont,req.body.contAssessment[c].weightage,req.body.contAssessment[c].contId],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to update"})
        }

      })

    }

  }
    // console.log(Data)
    res.status(200).json({
      message:"Successfull save",
    })
  // console.log(req.body.teachLearn[1]);
})


// app.post("/api/teach",(req,res,next)=>{



// })


app.get("/api/teach",(req,res,next)=>{

  db.query("SELECT * FROM teachlearn",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to Delete"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        teach:data
      })
    }

  })
})


app.get("/api/contAssess",(req,res,next)=>{

  db.query("SELECT * FROM contassessment",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to Delete"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        contAsses:data
      })
    }

  })
})



app.get("/api/finalExam",(req,res,next)=>{

  db.query("SELECT * FROM sumassessment",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        exam:data
      })
    }

  })
})

app.get("/api/creditHour",(req,res,next)=>{
  db.query("SELECT * FROM course",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        course:data
      })
    }

  })
})


app.post("/api/currentCourse/:id",(req,res,next)=>{

  for(i=0;i<req.body.references.length;i++){

    if(req.body.references[i].checkReference){
      // db.query("UPDATE refertable SET weekOtherDesc=? WHERE teachTableId=?",
      // [])
      db.query("UPDATE refertable SET referData=? WHERE referenceId=?",
      [req.body.references[i].reference,req.body.references[i].referenceId],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to update"})
        }
      })
    }else if(!req.body.references[i].checkReference){
      db.query("INSERT INTO refertable(courseId,referCheck,referData) VALUES (?,?,?)",
      [req.params.id,true,req.body.references[i].reference],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to save"})
        }

      })
    }
  }


  if(req.body.checkEdit){
    db.query("UPDATE currentcourse SET lectureDay=?,lectureSession=?,lectureVenue=?,medium=?,practicalDay=?,practicalSession=?,practicalVenue=?,telephoneNo=?,room=?,skill=? WHERE courseInfoId=?",
    [req.body.lectureDay,req.body.lectureSession,req.body.lectureVenue,req.body.medium,req.body.practicalDay,req.body.practicalSession,req.body.practicalVenue,req.body.telephoneNo,req.body.room,req.body.skill,req.body.courseInfoId],
    (error)=>{
      if(error){
        console.error(error);
        res.status(500).json({message:"failed update"});
      }
    })
  }
  else if(!req.body.checkEdit){
    db.query("INSERT INTO currentcourse(courseId,lectureDay,lectureSession,lectureVenue,medium,practicalDay,practicalSession,practicalVenue,checkEdit,telephoneNo,room,skill) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [req.params.id,req.body.lectureDay,req.body.lectureSession,req.body.lectureVenue,req.body.medium,req.body.practicalDay,req.body.practicalSession,req.body.practicalVenue,true,req.body.telephoneNo,req.body.room,req.body.skill],
    (error)=>{
      if(error){
        console.error(error);
        res.status(500).json({message:"failed to save"})
      }else{
        // console.log(Data)
        res.status(200).json({
          message:"Successfull save",

        })
      }

    })
  }


  for(j=0;j<req.body.teachTable.length;j++){

    if(req.body.teachTable[j].checkTeachTable){
      db.query("UPDATE teachtable SET weekOtherDesc=? WHERE teachTableId=?",
      [req.body.teachTable[j].weekOtherDesc,req.body.teachTable[j].teachTableId],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to update"});
        }
      })
    }else if(!req.body.teachTable[j].checkTeachTable){
      db.query("INSERT INTO teachtable(courseId,rowId,checkTeachTable,weekOtherDesc) VALUES (?,?,?,?)",
      [req.params.id,j+1,true,req.body.teachTable[j].weekOtherDesc],
      (error)=>{
        if(error){
          console.error(error);
          res.status(500).json({message:"failed to save"})
        }
      })
    }

  }


    for(i=0;i<req.body.teachTable.length;i++){
      for(j=0;j<req.body.teachTable[i].teachRef.length;j++){

        if(req.body.teachTable[i].teachRef[j].checkTeachRef){
          db.query("UPDATE teachreference SET teachTableRef=? WHERE teachRefId=?",
          [req.body.teachTable[i].teachRef[j].timeTableRef,req.body.teachTable[i].teachRef[j].teachRefId],
          (error)=>{
            if(error){
              console.error(error);
              res.status(500).json({message:"Failed to update"})
            }
          })
        }else if(!req.body.teachTable[i].teachRef[j].checkTeachRef){
          db.query("INSERT INTO teachreference(courseId,teachTableRef,checkRef,rowId) VALUES (?,?,?,?)",
          [req.params.id,req.body.teachTable[i].teachRef[j].timeTableRef,true,i],
          (error)=>{
            if(error){
              console.error(error);
              res.status(500).json({message:"failed to save"});
            }
          })
        }

      }
    }


    for(h=0;h<req.body.teachTable.length;h++){
      for(t=0;t<req.body.teachTable[h].weekInfo.length;t++){
        // console.log("hai")
        if(req.body.teachTable[h].weekInfo[t].checkweekInfo){
          // console.log("in if")
            db.query("UPDATE weekinfo SET activityDesc=?,activityType=? WHERE activityId=?",
            [req.body.teachTable[h].weekInfo[t].activityDesc,req.body.teachTable[h].weekInfo[t].activityType,req.body.teachTable[h].weekInfo[t].activityId],
            (error)=>{
              if(error){
                console.error(error);
                res.status(500).json({message:"failed to update"});
              }
            } )
        }else if(!req.body.teachTable[h].weekInfo[t].checkweekInfo){

          db.query("INSERT INTO weekinfo(courseId,activityDesc,activityType,checkWeekInfo,rowId) VALUES (?,?,?,?,?)",
          [req.params.id,req.body.teachTable[h].weekInfo[t].activityDesc,req.body.teachTable[h].weekInfo[t].activityType,true,h],
          (error)=>{
            if(error){
              console.error(error);
              res.status(500).json({message:"Failed to save"})
            }
          })
        }

      }
    }







// console.log(req.body.teachTable[0].weekInfo[0].checkweekInfo)

res.status(200).json({
  message:"Successfull save",

})
  // res.status(200).json({message:"Successfull save",})

})

app.get("/api/currentCourse",(req,res,next)=>{
  db.query("SELECT * FROM currentcourse",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(data)
      res.status(200).json({
        message:"Successfull fetch",
        curCourse:data
      })
    }

  })
})


app.get("/api/courseRef",(req,res,next)=>{
  db.query("SELECT * FROM referTable",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        courseRef:data
      })
    }

  })
})

app.get("/api/weekOther",(req,res,next)=>{
  db.query("SELECT * FROM teachTable",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        weekOtherData:data
      })
    }

  })
})

app.get("/api/teachRef",(req,res,next)=>{
  db.query("SELECT * FROM teachreference",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        teachRefData:data
      })
    }

  })
})

app.get("/api/weekInfo",(req,res,next)=>{
  db.query("SELECT * FROM weekinfo",
  (error,data)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to fetch"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull fetch",
        teachRefData:data
      })
    }

  })
})


app.delete("/api/mainRefer/:id",(req,res,next)=>{

  db.query("DELETE FROM referTable WHERE referenceId=?",
  [req.params.id],
  (error)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to Delete"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull Delete",
      })
    }

  })
})


app.delete("/api/weekDelete/:id",(req,res,next)=>{

  db.query("DELETE FROM weekInfo WHERE activityId=?",
  [req.params.id],
  (error)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to Delete"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull Delete",
      })
    }

  })
})


app.delete("/api/deleteTeachRefer/:id",(req,res,next)=>{

  db.query("DELETE FROM teachReference WHERE teachRefId=?",
  [req.params.id],
  (error)=>{
    if(error){
      console.error(error);
      res.status(500).json({message:"failed to Delete"})
    }else{
      // console.log(Data)
      res.status(200).json({
        message:"Successfull Delete",
      })
    }

  })
})


app.use("/api/user",userRoutes)
app.use("/api/posts",postRoutes)
module.exports = app;
