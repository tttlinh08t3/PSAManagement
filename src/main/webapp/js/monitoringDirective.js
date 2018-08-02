(function() {
	var monitoringDirective = function() {
		var monitoringController = function($scope, appFactory, NgTableParams,
				$filter,dataShareFactory) {
			$scope.startedOptions = [ 'YES', 'NO' ];
			$scope.ftpsiteTypes = [ 'Supplier', 'Customer' ];
			$scope.getSchedulers = function() {
				$scope.tableParams1 = null;
				var type = $scope.ftpsiteType;
				if (((null == $scope.ftpsiteType) || (undefined == $scope.ftpsiteType))) {
					type = "ALL";
				}
				appFactory.get_schedulers($scope.schedulerType).then(
						function(data) {
							if (data.results
									&& data.results.messageResult.status) {
								$scope.datasetTable1 = data.results.model;
								$scope.tableParams1 = new NgTableParams({
									count : 10
								}, {
									counts : [], // hide page counts
									dataset : $scope.datasetTable1
								});
								$scope.tableParams1.reload();
							}
						});
			};
			$scope.$watch("ftpsiteType", function(newValues, oldValues) {
				var dataset = $scope.datasetTable1;
				if (null != $scope.ftpsiteType) {
					dataset = $filter('filter')(dataset, {
						name : $scope.ftpsiteType.toUpperCase(),
					}, false);
				}
				$scope.tableParams1 = new NgTableParams({
					count : 10
				}, {
					counts : [], // hide page counts
					dataset : dataset
				});
			});
			// event handlers
			$scope.$on('$http:loading', function(e, data) {
				if (data.get_schedulers) {
					$scope.schedulers_loaded = data.get_schedulers == 2;
				}
			});
			$scope.getSchedulers();

			$scope.start = function(scheduler, schedulerType) {
				appFactory.start_scheduler(scheduler, schedulerType).then(
						function(data) {
							if (data.results
									&& data.results.messageResult.status) {
								$scope.getSchedulers();
							}
						});
			};

			$scope.stop = function(scheduler, schedulerType) {
				appFactory.stop_scheduler(scheduler, schedulerType).then(
						function(data) {
							if (data.results
									&& data.results.messageResult.status) {
								$scope.getSchedulers();
							}
						});
			};
			$scope.sendData = function(scheduler) {
				dataShareFactory.sendData(scheduler);
			};
		}

		monitoringController.$inject = [ '$scope', 'appFactory',
				'NgTableParams', '$filter','dataShareFactory' ];
		return {
			controller : monitoringController,
			templateUrl : 'views/monitoringTemplate.html',
		};
	}
	angular.module('PSAMApp').directive('monitoringDirective',
			monitoringDirective);
}());