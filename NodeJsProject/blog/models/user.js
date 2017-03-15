var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var userSchema = new Schema({
	userName:String,
	password:String,
	email:String
});

mongoose.model('user',userSchema);

module.exports.Schema = function(modelName){
return {model:mongoose.model(modelName)};
}

