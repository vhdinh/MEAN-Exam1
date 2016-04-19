console.log("IN MODELS/USER.JS FILE");

var mongoose = require("mongoose");


var UserSchema = new mongoose.Schema({
	name: {type: String, unique: true, require: true},
}, {timestamps: true});

mongoose.model("users", UserSchema);

var QuestionSchema = new mongoose.Schema({
	question: {type: String, require: true, minlength: 8},
	option1: {type: String, require: true, minlength: 3},
	option1Vote : {type: Number, min: 0, default: 0},
	option2: {type: String, require: true, minlength: 3},
	option2Vote : {type: Number, min: 0, default: 0},
	option3: {type: String, require: true, minlength: 3},
	option3Vote : {type: Number, min: 0, default: 0},
	option4: {type: String, require: true, minlength: 3}, 
	option4Vote: {type: Number, min: 0, default: 0},
	_user : {type: mongoose.Schema.Types.ObjectId, ref: "users"}
}, {timestamps: true});

mongoose.model("questions", QuestionSchema)
