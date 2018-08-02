(function() {

	var logoutController = function($scope,$rootScope) {
//		$scope.title = param[0];
//		$scope.message = param[1];
//		$scope.isCancelShowed = param[2];
//		$scope.ok = function() {
//			$modalInstance.close();
//		};
//		
		$rootScope.showHeader = false;
		$scope.login = function() {
			$rootScope.showHeader = true;
		};
	};
	logoutController.$inject = [ '$scope','$rootScope' ];
	angular.module('PSAMApp').controller('logoutController', logoutController);
}());

