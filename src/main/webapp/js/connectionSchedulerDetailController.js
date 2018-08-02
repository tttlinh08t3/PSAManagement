(function() {

	var connectionSchedulerDetailController = function($scope, appFactory) {
		$scope.schedulerType = 1; 
		$scope.link ='connectionMonitoring'; 
		
	}

	connectionSchedulerDetailController.$inject = [ '$scope', 'appFactory' ];
	angular.module('PSAMApp').controller('connectionSchedulerDetailController',
			connectionSchedulerDetailController);
}());