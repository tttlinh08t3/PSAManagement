(function() {
	var connectionFailureAlertsController = function($scope, appFactory,
			NgTableParams) {
		$scope.alertType = 1;
	}

	connectionFailureAlertsController.$inject = [ '$scope', 'appFactory',
			'NgTableParams' ];
	angular.module('PSAMApp').controller('connectionFailureAlertsController',
			connectionFailureAlertsController);
}());