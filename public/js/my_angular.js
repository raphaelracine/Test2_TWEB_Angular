(function() {
	
	var module = angular.module('Test2Module', []);
	
	module.factory('GitHub', function() {
		
		var github = new Github({
  			token: "788c7eb1389a47079296d8faacbe08250c3b7914",
  			auth: "oauth"
		});
		
		return github;
		
	});
	
})();