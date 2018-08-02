(function() {

	var connectionMonitoringController = function($scope, appFactory,
			NgTableParams) {
		$scope.schedulerType = 1; 
		$scope.detailLink ='connectionMonitoring'; 
	}

	connectionMonitoringController.$inject = [ '$scope', 'appFactory',
			'NgTableParams' ];
	angular.module('PSAMApp').controller('connectionMonitoringController',
			connectionMonitoringController);
}());