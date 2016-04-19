console.log("IN SERVER/CONFIG/ROUTES.JS FILE");

var users = require("../controllers/users.js");

module.exports = function(app){
	app.post('/login', function(req, res){
		users.login(req,res);
	})

	app.get('/getQuestions', function(req, res){
		users.get_question(req, res);
	})

	app.post('/create_question', function(req, res){
		users.create_question(req,res);
	})

	app.post('/remove_question', function(req, res){
		users.remove_question(req, res);
	})

	app.post('/getQbyId', function(req, res){
		users.getQbyId(req,res);
	})

	app.post('/addVote1', function(req, res){
		users.addVote1(req, res);
	})
	app.post('/addVote2', function(req, res){
		users.addVote2(req, res);
	})
	app.post('/addVote3', function(req, res){
		users.addVote3(req, res);
	})
	app.post('/addVote4', function(req, res){
		users.addVote4(req, res);
	})


}