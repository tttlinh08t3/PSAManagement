(function() {
	var mainController = function($scope, $rootScope, designskopeQ,authenticationService) {
		var username = authenticationService.getUserName();
		$rootScope.currentUser = username.toUpperCase();
		
		designskopeQ.get_loading_deferred().promise.then(null, null, function(
				data) {
			$scope.$broadcast("$http:loading", data);
		});
		$scope.logout = function() {
			$rootScope.showHeader = false;
		};
	};
	mainController.$inject = [ '$scope', '$rootScope', 'designskopeQ' ,'authenticationService'];

	angular.module('PSAMApp').controller('mainController', mainController);
}());
