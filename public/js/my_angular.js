(function() {
	
	var app = angular.module('Test2Module', ['ui.router']);
	
	app.config(function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise('welcome');
		
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
		
		GitHub.getRepo($stateParams.user, $stateParams.name).show(function(err, repo) {
			
			$scope.repo = repo;
			$scope.$apply();
			
			console.log(repo);
			
			// Get contributors of the repo
			$http({
				method: 'GET',
				url: repo.contributors_url
			})
			.then(function(res) {
				$scope.contributors = res.data;
			}, function(err) {
			});
			
		});
		
	});
	
})();