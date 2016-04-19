console.log("IN SERVER.JS FILE OF MEAN_EXAM")

var express = require("express");
var path = require("path");
var app = express();

var bodyParser = require("body-parser");


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./node_modules")));

app.use(express.static(path.join(__dirname, "./client")));


require("./server/config/mongoose.js");

require("./server/config/routes.js")(app);

port = 8000
app.listen(port,function(){
	console.log("LISTEN TO PORT : ",port,"FOOOOOOOOOOOOO")
})

