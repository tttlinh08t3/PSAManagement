(function() {
	var dataMissingAlertsController = function($scope, appFactory,
			NgTableParams) {
		$scope.alertType = 2;
	}

	dataMissingAlertsController.$inject = [ '$scope', 'appFactory',
			'NgTableParams' ];
	angular.module('PSAMApp').controller('dataMissingAlertsController',
			dataMissingAlertsController);
}());