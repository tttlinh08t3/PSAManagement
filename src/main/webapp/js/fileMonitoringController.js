(function() {
	var fileMonitoringController = function($scope, appFactory,
			NgTableParams) {
		$scope.schedulerType = 2; 
		$scope.detailLink ='fileMonitoring'; 
	}

	fileMonitoringController.$inject = [ '$scope', 'appFactory',
			'NgTableParams' ];
	angular.module('PSAMApp').controller('fileMonitoringController',
			fileMonitoringController);
}());