
var userDBModel  = require('../models/user.js');

var user = new userDBModel.Schema('user').model;

exports.reg = function(req,res,next){
	var userModel = new user();
	console.log('-----------------------');
	userModel.userName = req.body.userName;
	userModel.password = req.body.password;
	userModel.email = req.body.email;
	userModel.save(function(err,userInfo){});
	res.render('index',{title:'主页'});
}

exprots.login = function(req,res,next){
	
}