console.log("IN SERVER/CONTROLLER/USERS.JS FILE")

var mongoose = require("mongoose");

var User = mongoose.model("users");
var Question = mongoose.model("questions");

module.exports = (function(){
	return {

		login: function(req,res){
			console.log("IN LOGIN CONTROLLER", req.body.name)
			User.findOne({name: req.body.name}, function(err, user){
				console.log("FOUND USEEERR", user)
				if(err){
					res.json(err)
				}
				else{
					if(user){
						res.json(user)
					}
					else{
						var user = new User({name: req.body.name})
						user.save(function(err, user){
							if(err){
								res.json(err)
							}
							else {
								res.json(user)
							}
						})
					}
				}

			})
		},

		get_question : function(req, res){
			Question.find({}).populate('_user').exec(function(err, question){
				if(err){
					res.json(err)
				}
				else{
					res.json(question)
				}
			})
		},

		create_question: function(req, res){

			new_q = new Question({question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, _user: req.body.curr_user._id})
			new_q.save(function(err){
				if(err){
					res.json(err)
				}
				else{
					res.redirect("/getQuestions")
				}
			})
		},

		remove_question : function(req, res){
			Question.remove({_id: req.body._id}, function(err){
				if(err){
					res.json(err)
				}
				else{
					res.redirect('/getQuestions')
				}
			})
		},

		getQbyId : function(req, res){
			console.log("IN CONTROLLER TO GET QUESTION",req.body._id)
			Question.findOne({_id: req.body._id}, function(err, question){
				if(err){
					res.json(err)
				}
				else{
					res.json(question)
				}
			})
		},

		addVote1 : function(req, res){
			Question.findOne({_id: req.body._id},function(err, question){
				question.option1Vote +=1
				question.save()
				res.json(question)
			})
		},

		addVote2 : function(req, res){
			Question.findOne({_id: req.body._id},function(err, question){
				question.option2Vote +=1
				question.save()
				res.json(question)
			})
		},

		addVote3 : function(req, res){
			Question.findOne({_id: req.body._id},function(err, question){
				question.option3Vote +=1
				question.save()
				res.json(question)
			})
		},

		addVote4 : function(req, res){
			Question.findOne({_id: req.body._id},function(err, question){
				question.option4Vote +=1
				question.save()
				res.json(question)
			})
		},



	}
})();