const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
    name:{type:String,require:true},
    course:{type:String,require:true},
    session:{type:String,require:true},
    semester:{type:String,require:true}
});


module.exports=mongoose.model('Post',postSchema);
