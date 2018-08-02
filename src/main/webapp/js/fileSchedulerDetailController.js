(function() {

	var fileSchedulerDetailController = function($scope, appFactory) {
		$scope.schedulerType = 2; 
		$scope.link ='fileMonitoring'; 
	}

	fileSchedulerDetailController.$inject = [ '$scope', 'appFactory' ];
	angular.module('PSAMApp').controller('fileSchedulerDetailController',
			fileSchedulerDetailController);
}());