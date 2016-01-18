// Angular Application
// Author : Raphaël Racine
// This application is used for an angular exercise with GitHub API

(function() {
	
	var app = angular.module('Test2Module', ['ui.router', 'chart.js']);
	
	app.config(function($stateProvider, $urlRouterProvider) {
		
		// Config States for UI-Router
		$urlRouterProvider.otherwise('welcome');
		$urlRouterProvider.when('user', 'user.repositories');
		
		// Welcome State
		$stateProvider.state('welcome', {
			url: '/welcome',
			templateUrl: '/partials/welcome.html'
		})
		// User State
		.state('user', {
			url: '/user/:user',
			templateUrl: '/partials/user.html',
			controller: 'UserController',
			abstract: true
		})
		// User Repositories State
		.state('user.repositories', {
			url: '/repositories',
			templateUrl: '/partials/repositories.html',
			controller: 'UserRepositoriesController'
		})
		// User Repository State
		.state('user.repository', {
			url: '/repositories/:name',
			templateUrl: 'partials/repository.html',
			controller: 'UserRepositoryController'
		});
		
	});
	
	app.factory('GitHub', function() {
		
		return new Github({
  			token: "788c7eb1389a47079296d8faacbe08250c3b7914",
  			auth: "oauth"
		});
		
	});
	
	app.controller('UserController', function($scope, GitHub, $stateParams, $state) {
		
		GitHub.getUser().show($stateParams.user, function(err, user) {			
			
			if(err) {
				alert("Impossible to retrieve this user");
				$state.go('welcome');
			}
			else {						
				$scope.user = user;
				$scope.$apply(); // Refresh view
			}
			
		});
		
	});
	
	app.controller('UserRepositoriesController', function($scope, GitHub, $stateParams, $state) {
		
		GitHub.getUser().userRepos($stateParams.user, function(err, repositories) {
			if(err) {
				alert("Impossible to list the repositories of the user");
				$state.go('welcome');
			}
			else {
				$scope.repositories = repositories;	
				$scope.$apply(); // Refresh view
			}
		});
		
	});
	
	app.controller('UserRepositoryController', function($scope, $stateParams, GitHub, $state) {
		
		var repo = GitHub.getRepo($stateParams.user, $stateParams.name);
		
		// Loading data concerning this repo
		repo.show(function(err, repoData) {			
			if(err) {
				alert("Impossible to retrieve this repository");
				$state.go('user.repositories');
			}
			else {
				$scope.repoData = repoData;			
				$scope.$apply(); // Refresh the view
			}				
		});
		
		// Loading contributors of this repo
		repo.contributors(function(err, contributors) {
			if(err) {
				alert("Impossible to load contributors of this repository");
				$state.go('user.repositories');
			}
			else {			
				$scope.contributors = contributors;
				
				$scope.dataCommits = [[]];
				$scope.labelsCommits = [];
				$scope.numberOfCommits = 0;
				
				// Generate stats for commits graph
				contributors.forEach(function(c) {
					$scope.dataCommits[0].push(c.total);
					$scope.labelsCommits.push(c.author.login);
					$scope.numberOfCommits += c.total;
				});
				
				$scope.$apply();
			}
		});
		
	});

	
})();