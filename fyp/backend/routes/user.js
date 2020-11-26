const express = require("express");
const bcrypt = require('bcrypt');
const router=express.Router();
const jwt = require("jsonwebtoken");



//insert user
router.post('/signup',(req,res,next)=>{
  const userInput=req.body;
  console.log(userInput)
  console.log(userInput.LecturerName);
  bcrypt.hash(userInput.password,10)
  .then( hash=>{

    db.query(
      'INSERT INTO lecture (lecturerName,username,password) VALUES (?,?,?)',
      [userInput.LecturerName,userInput.username,hash],
      (error) =>{
        if(error) {
          console.error(error);
          console.log("Username has been used")
          res.status(500).json({status:'error'});
        }else{
          console.log("hai berjaya")
          res.status(200).json({status:'User created'});
        }

      }
    )


  });


});


router.post("/login",(req,res,next)=>{
  db.query("SELECT * FROM lecturer WHERE username =?",[req.body.username],
  function(err,rows){
    if(err){
      return res.status(401).json({
        message:'Auth failed',
        error:err
      });
    }
    if(!rows.length){
      return res.status(401).json({
        message:'No user found'

      });
    }

    if(!rows.length){
      return res.status(401).json({
        message:'No user found'
      });
    }



  //  console.log(rows[0].password);

  bcrypt.compare(req.body.password,rows[0].password)
  .then(result=>{
    if(!result){
      return res.status(401).json({
        message:'Wrong password'
      });
    }
    const token = jwt.sign({username:rows[0].username,userId:rows[0].userId},"secret_this_should_be_longer",{expiresIn:"24h"});
    res.status(200).json({
      token:token,
      expiresIn:36000
    });

  });


  })
});


module.exports=router;
