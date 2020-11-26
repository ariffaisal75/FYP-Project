const express = require("express");
const router=express.Router();
const checkAuth = require("../middleware/check-auth");



// app.get("/api/posts/:id",(req,res,next)=>{
//     db.query(
//       'SELECT alignID,name,course,session,semester FROM alignment WHERE alignID =?',
//       [req.params.id],
//       (error,form)=>{
//         if(form){
//           res.status(200).json({
//             message:'fetched',
//             forms:form
//           });
//         }else{
//           // console.log(forms);
//           console.error(error);
//           res.status(404).json({
//             message:'error post'});

//         }
//       }

//     )
// });

router.post("",
checkAuth,(req,res,next) => {
  const form=req.body;

db.query(
  'INSERT INTO alignment (name,course,session,semester,CLO,taksonomi1,clo1plo1,plo1check1,clo1plo2,plo1check2,clo1plo3,plo1check3,makmal1,kuliah1,tutorial1,lab1,presentation1asign1,presentation2asign1,ujianAkhir1,pencapaianHasil1,          CLO2,taksonomi2,clo2plo1,plo2check1,clo2plo2,plo2check2,clo2plo3,plo2check3,makmal2,kuliah2,tutorial2,lab2,presentation1asign2,presentation2asign2,ujianAkhir2,pencapaianHasil2,       CLO3,taksonomi3,clo3plo1,plo3check1,clo3plo2,plo3check2,clo3plo3,plo3check3,makmal3,kuliah3,tutorial3,lab3,presentation1asign3,presentation2asign3,ujianAkhir3,pencapaianHasil3,userId) VALUES (?,?,?,?,  ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,   ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,  ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  [form.name,form.course,form.session,form.semester,

    form.CLO,form.taksonomi1,
    form.clo1plo1,form.plo1check1,
    form.clo1plo2,form.plo1check2,
    form.clo1plo3,form.plo1check3,
    form.strategi1Check1,
    form.strategi1Check2,
    form.strategi1Check3,
    form.lab1,
    form.presentation1asign1,
    form.presentation2asign1,
    form.ujianAkhir1,
    form.pencapaianHasil1,

    form.CLO2,form.taksonomi2,
    form.clo2plo1,form.plo2check1,
    form.clo2plo2,form.plo2check2,
    form.clo2plo3,form.plo2check3,
    form.strategi2Check1,
    form.strategi2Check2,
    form.strategi2Check3,
    form.lab2,
    form.presentation1asign2,
    form.presentation2asign2,
    form.ujianAkhir2,
    form.pencapaianHasil2,

    form.CLO3,form.taksonomi3,
    form.clo3plo1,form.plo3check1,
    form.clo3plo2,form.plo3check2,
    form.clo3plo3,form.plo3check3,
    form.strategi3Check1,
    form.strategi3Check2,
    form.strategi3Check3,
    form.lab3,
    form.presentation1asign3,
    form.presentation2asign3,
    form.ujianAkhir3,
    form.pencapaianHasil3,
    req.userData.userId],
  (error)=>{
    if(error){
      console.error(error);
      res.status(500).json({
        message:'Creating form failed'});
    }else{
      res.status(200).json({
        message:'Successful save',
        //postId:alignID
      });
    }
  });



//  res.status(201).json({
//    message: 'post added successfully'
//  });
});

router.put("/:id",checkAuth,(req,res,next)=> {
  db.query(
    'UPDATE alignment SET name=?,course=?,session=?,semester=? ,CLO = ?, taksonomi1=?, clo1plo1 =?, plo1check1=?, clo1plo2=?, plo1check2=?,clo1plo3=?,plo1check3=?,makmal1=?,kuliah1=?,tutorial1=?,lab1=?,presentation1asign1=?,presentation2asign1=?,ujianAkhir1=?,pencapaianHasil1=?,         CLO2 =?, taksonomi2=?, clo2plo1 =?, plo2check1=?, clo2plo2=?, plo2check2=?,clo2plo3=?,plo2check3=?,makmal2=?,kuliah2=?,tutorial2=?,lab2=?,presentation1asign2=?,presentation2asign2=?,ujianAkhir2=?,pencapaianHasil2=?,      CLO3=?, taksonomi3=?, clo3plo1 =?, plo3check1=?, clo3plo2=?, plo3check2=?,clo3plo3=?,plo3check3=?,makmal3=?,kuliah3=?,tutorial3=?,lab3=?,presentation1asign3=?,presentation2asign3=?,ujianAkhir3=?,pencapaianHasil3=?,userId=? WHERE alignID=?',
    [req.body.name,req.body.course,req.body.session,req.body.semester,
      req.body.CLO,req.body.taksonomi1,
      req.body.clo1plo1,req.body.plo1check1,
      req.body.clo1plo2,req.body.plo1check2,
      req.body.clo1plo3,req.body.plo1check3,
      req.body.strategi1Check1,
      req.body.strategi1Check2,
      req.body.strategi1Check3,
      req.body.lab1,
      req.body.presentation1asign1,
      req.body.presentation2asign1,
      req.body.ujianAkhir1,
      req.body.pencapaianHasil1,

      req.body.CLO2,req.body.taksonomi2,
      req.body.clo2plo1,req.body.plo2check1,
      req.body.clo2plo2,req.body.plo2check2,
      req.body.clo2plo3,req.body.plo2check3,
      req.body.strategi2Check1,
      req.body.strategi2Check2,
      req.body.strategi2Check3,
      req.body.lab2,
      req.body.presentation1asign2,
      req.body.presentation2asign2,
      req.body.ujianAkhir2,
      req.body.pencapaianHasil2,

      req.body.CLO3,req.body.taksonomi3,
      req.body.clo3plo1,req.body.plo3check1,
      req.body.clo3plo2,req.body.plo3check2,
      req.body.clo3plo3,req.body.plo3check3,
      req.body.strategi3Check1,
      req.body.strategi3Check2,
      req.body.strategi3Check3,
      req.body.lab3,
      req.body.presentation1asign3,
      req.body.presentation2asign3,
      req.body.ujianAkhir3,
      req.body.pencapaianHasil3,req.userData.userId,req.params.id],
    (error)=>{
      if(error){
        console.log("This is a error: "+error);
        res.status(500).json({message:'Failed to update'});
      }else{
        res.status(200).json({status:'Updated'})
      }
    }
  )
});



router.get("",checkAuth,(req,res,next)=>{
//  const forms = [
//    {
//      id:'s424r',
//      course:'sda',
//      session: 'asa',
//      semester:'adsa'

//    }

//  ];
 db.query(
   'SELECT c.* FROM course AS c where userId=?',
   [req.userData.userId],
   (error,forms) =>{
     if(error){
        console.log(error);
        res.status(500).json({status:'Failed to fetch'});
     }else{
      //  console.log("this is")
      //  console.log( forms)
      res.status(200).json({
        message: 'Posts fetch successfully',
        course:forms
      });

     }
   }
 )

});


router.delete("/:id",checkAuth,(req,res,next)=>{
  console.log(req.params.id);
  db.query(
    'DELETE FROM alignment WHERE alignID=?',
    [req.params.id],
    (error) => {
      if(error){
        res.status(500).json({message: 'Failed to delete'});
      }else{
        res.status(200).json({status:'deleted'});
      }
    }
  );
  // res.status(200).json({message:" Post deleted!" });
});








module.exports=router;
