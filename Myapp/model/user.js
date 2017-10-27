const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/test',{useMongoClient:true});

const userSchema=new mongoose.Schema({
	 userName:String,
      Email:any,
      password:any,
      Role:String
});

const user=mongoose.model('user',userSchema);

module.exports=user;