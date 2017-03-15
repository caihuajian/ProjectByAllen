var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
mongoose.connect('mongodb://localhost/hello');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'index' });
});



/*hompage*/
router.post('/homepage', function(req, res) {
	var query_doc = {username: req.body.username, password: req.body.password};
	(function(){
		user.count(query_doc, function(err, doc){
			if(doc == 1){
				console.log(query_doc.username + ": login success in " + new Date());
				res.render('homepage', { title: 'homepage' });
			}else{
				console.log(query_doc.username + ": login failed in " + new Date());
				res.redirect('/');
			}
		});
	})(query_doc);
});

module.exports = router;