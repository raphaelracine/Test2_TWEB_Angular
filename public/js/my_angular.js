// Angular Application
// Author : Raphaël Racine
// This application is used for an angular exercise with GitHub API

(function() {
	
	var app = angular.module('Test2Module', ['ui.router']);
	
	app.config(function($stateProvider, $urlRouterProvider) {
		
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
			controller: 'UserController'
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
			$scope.user = user;
			$scope.$apply(); // Refresh view
		});
		
	});
	
	app.controller('UserRepositoriesController', function($scope, GitHub, $stateParams) {
		
		GitHub.getUser().userRepos($stateParams.user, function(err, repositories) {
			$scope.repositories = repositories;	
			$scope.$apply(); // Refresh view
		});
		
	});
	
	app.controller('UserRepositoryController', function($scope, $stateParams, GitHub, $http) {
		
		var repo = GitHub.getRepo($stateParams.user, $stateParams.name);
		
		// Loading data concerning this repo
		repo.show(function(err, repoData) {			
			$scope.repoData = repoData;			
			$scope.$apply(); // Refresh the view		
		});
		
		// Loading contributors of this repo
		repo.contributors(function(err, contributors) {
			$scope.contributors = contributors;
			$scope.$apply();
			
			// We have to count the total of commits using map and reduce
			$scope.numberOfCommits = contributors.map(function(c) {
				return c.total;
			}).reduce(function(a, b) {
				return a + b;
			});
		});
		
	});

	
})();