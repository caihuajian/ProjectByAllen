var mongoose =require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
	username:String,
	password:String
});

exports.user =mongoose.model('users',userSchema);