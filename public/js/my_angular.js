(function() {
	
	var app = angular.module('Test2Module', ['ui.router']);
	
	app.config(function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/enterUser');
		
		$stateProvider.state('enterUser', {
			url: '/enterUser',
			templateUrl: '/partials/enterUser.html'
		})
		.state('userRepositories', {
			url: '/userRepositories/:user',
			templateUrl: '/partials/userRepositories.html',
			controller: 'UserRepositoriesController'
		});
		
	});
	
	app.factory('GitHub', function() {
		
		var github = new Github({
  			token: "788c7eb1389a47079296d8faacbe08250c3b7914",
  			auth: "oauth"
		});
		
		return github;
		
	});
	
	app.controller('UserRepositoriesController', function($scope, $stateParams, GitHub, $state) {
		
		GitHub.getUser().show($stateParams.user, function(err, user) {
			
			if(err) {
				alert("This user can't be retrieved");
				$state.go('enterUser');
			}
			else {
				$scope.user = user;
				console.log($scope.user);
			}
			
		});
		
	});
	
})();