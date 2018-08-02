(function() {
	var schedulerDetailDirective = function() {
		var schedulerDetailController = function($scope, $routeParams,
				appFactory, dataShareFactory, $filter) {
			$scope.scheduler_name = $routeParams.scheduler_name;
			$scope.options = [ 'YES', 'NO' ];
			$scope.intervalTypes = [ 'DAILY', 'WEEKLY', 'MONTHLY' ];
			$scope.schedulerDetail = {};
			$scope.loaded = true;
			
			$scope.getDetails = function() {
				$scope.startedCol = $scope.schedulerDetail.started;
				$scope.interval = $scope.schedulerDetail.interval;
				$scope.startedDate = $.datepicker.formatDate('yy-mm-dd',
						new Date());
				$scope.loaded = false;
			};

			$scope.getSchedulerDetail = function() {
				appFactory.get_scheduler($scope.schedulerType,
						$scope.scheduler_name).then(function(data) {
					if (data.results && data.results.messageResult.status) {
						$scope.schedulerDetail = data.results.model[0];
						$scope.getDetails();
					}
				});
			};
			$scope.getSchedulerDetail();

			$scope.start = function() {
				$scope.loaded = true;
				appFactory.start_scheduler($scope.schedulerDetail,
						$scope.schedulerType).then(function(data) {
					if (data.results && data.results.messageResult.status) {
						$scope.schedulerDetail = data.results.model[0];
						$scope.getDetails();
					}
				});
			};

			$scope.stop = function() {
				$scope.loaded = true;
				appFactory.stop_scheduler($scope.schedulerDetail,
						$scope.schedulerType).then(function(data) {
					if (data.results && data.results.messageResult.status) {
						$scope.schedulerDetail = data.results.model[0];
						$scope.getDetails();
					}
				});
			};

			$scope.update = function(schedulerType) {
				$scope.loaded = true;
				var updatedScheduler = JSON.stringify({
					"name" : $scope.schedulerDetail.name,
					"path" : $scope.schedulerDetail.path,
					"interval" : $scope.interval,
					"startDate" : $scope.startedDate,
					"started" : $scope.startedCol
				});
				appFactory.update_scheduler(updatedScheduler,
						$scope.schedulerType).then(function(data) {
					if (data.results && data.results.messageResult.status) {
						$scope.schedulerDetail = data.results.model[0];
						$scope.getDetails();
					}
				});
			};
		};

		schedulerDetailController.$inject = [ '$scope', '$routeParams',
				'appFactory', 'dataShareFactory', '$filter' ];
		return {
			controller : schedulerDetailController,
			templateUrl : 'views/schedulerDetailTemplate.html',
		};
	}
	angular.module('PSAMApp').directive('schedulerDetailDirective',
			schedulerDetailDirective);
}());