var exam_app = angular.module('myApp', ['ngRoute']);


exam_app.config(function ($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'static/partials/login.html'
		})
		.when('/dashboard', {
			templateUrl: 'static/partials/dashboard.html'
		})
		.when('/poll/:id', {
			templateUrl: 'static/partials/poll.html',
			controller: 'PollController'
		})
		.when('/create', {
			templateUrl: 'static/partials/create.html'
		})
		.otherwise({
			redirectTo: '/login'
		})
})

exam_app.factory("LoginFactory", function($http){

	var factory = {};
	var user;
	factory.user;

	factory.login = function(user, callback){
		console.log("FACTORY", user)
		$http.post('/login', user).success(function(output){
			factory.user = output;
			callback(factory.user);
		})
	}

	factory.getUser = function(callback){
		callback(factory.user)
		console.log("IN FACTOYRYYYYY", factory.user)
		$http.get
	}



	factory.logout = function(){
		factory.user = undefined;
	}

	return factory

})


exam_app.factory("QuestionFactory", function($http){
	var factory = {};
	var questions = {};
	var quest = {};

	factory.index = function(callback){
		$http.get('/getQuestions').success(function(output){
			questions = output;
			callback(questions)
		})
	}


	factory.create_question = function(info, callback){
		$http.post('/create_question', info).success(function(info){
			questions = info;
			callback(questions);

		})
	}

	factory.delete_question = function(question, callback){
		$http.post('/remove_question', question).success(function(output){
			questions = output;
			callback(questions);
		})
	}

	factory.getQbyId = function(info, callback){
		console.log("INF FASDFOSD", info)
		$http.post('/getQbyId', info).success(function(output){
			quest = output;
			callback(quest);
		})
	}

	factory.addVote1 = function(info, callback){
		$http.post('/addVote1', info).success(function(output){
			quest = output;
			callback(quest);
		})
	}

	factory.addVote2 = function(info, callback){
		$http.post('/addVote2', info).success(function(output){
			quest = output;
			callback(quest);
		})
	}

	factory.addVote3 = function(info, callback){
		$http.post('/addVote3', info).success(function(output){
			quest = output;
			callback(quest);
		})
	}

		factory.addVote4 = function(info, callback){
		$http.post('/addVote4', info).success(function(output){
			quest = output;
			callback(quest);
		})
	}

	return factory
})




exam_app.controller("LoginController", function($scope, LoginFactory, $location, QuestionFactory){

	$scope.login = function(user){
		LoginFactory.login(user, function(data){
			$scope.user = data;
			$scope.user = {};
			$location.url("/dashboard")
		})
	}

	get_user = function(){
		LoginFactory.getUser(function(data){
			if(data){
				$scope.user = data;
			}
			else{
				$location.url('/login')
			}
		})
	}
		get_user()
	

	current_user = $scope.user

	$scope.logout= function(){
		$location.url('/login')
		$scope.user= {};
		LoginFactory.logout()

	}

	QuestionFactory.index(function (data){
		$scope.questions = data;
	})

	$scope.delete_question = function(question){
		QuestionFactory.delete_question(question, function(data){
			$scope.questions = data;
		})
	}


})


exam_app.controller("QuestionController", function($scope, $window, $location, QuestionFactory, LoginFactory){
	QuestionFactory.index(function (data){
		$scope.questions = data;
	})
	currUser = LoginFactory.user


	$scope.createQuestion = function(){
		question = $scope.new_question;
		if(!question.question || !question.option1 || !question.option2 || !question.option3 || !question.option4){
			$window.alert("all Fields must be filled out")
			$scope.new_question = {}
		}
		else if(question.question.length < 8){
			$window.alert("Question must be at least 8 characters long")
			$scope.new_question = {}
		}
		else if(question.option1.length < 3 || question.option2.length < 3 || question.option3.length < 3 || question.option4.length < 3){
			$window.alert("options must be at least 3 characters long")
			$scope.new_question = {}
		}
		else{
			$scope.new_question.curr_user = currUser
			QuestionFactory.create_question($scope.new_question, function(data){
				$scope.questions = data;
				$scope.new_question = {}
				$location.url('/dashboard')
			})
		}
	}

})

exam_app.controller('PollController', function($scope,$http, $routeParams, QuestionFactory){
	console.log($routeParams.id)
	var thisQ = {_id: $routeParams.id};
		QuestionFactory.getQbyId(thisQ, function (data){
	$scope.quest = data;
	})

	$scope.vote1 = function(option1){
		QuestionFactory.addVote1(option1, function(data){
			$scope.quest = data;
		})
	}
	$scope.vote2 = function(option2){
		QuestionFactory.addVote2(option2, function(data){
			$scope.quest = data;
		})
	}
	$scope.vote3 = function(option3){
		QuestionFactory.addVote3(option3, function(data){
			$scope.quest = data;
		})
	}
	$scope.vote4 = function(option4){
		QuestionFactory.addVote4(option4, function(data){
			$scope.quest = data;
		})
	}




})





