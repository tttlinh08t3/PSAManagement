(function() {
	var loginController = function($scope, $rootScope,$http,authenticationService) {
		
		
		$scope.login = function() {
				authenticationService.setUserName($scope.username);
				console.log($scope.username);
		};
	};
	loginController.$inject = [ '$scope', '$rootScope','$http','authenticationService' ];

	angular.module('PSAMApp', [ 'ngRoute', 'ngCookies' ]).controller('loginController', loginController);
}());

