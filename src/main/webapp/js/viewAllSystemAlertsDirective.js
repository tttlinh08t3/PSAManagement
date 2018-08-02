(function() {
	var viewAllSystemAlertsDirective = function() {
		var systemAlertsController = function($scope, appFactory, NgTableParams,
				$filter) {
			$scope.ftpsiteNames = [];
			$scope.statuses = [ 'OPEN', 'CLOSED' ];
			$scope.fromDate = $.datepicker.formatDate('yy-mm-dd', new Date());
			$scope.toDate = $.datepicker.formatDate('yy-mm-dd', new Date());
			$scope.alerts_loaded = true;

			$scope.getFtpsiteNames = function() {
				appFactory.get_ftpsiteNames().then(function(data) {
					if (data.results) {
						$scope.ftpsiteNames = data.results.model;
					}
				});
			};

			$scope.getFtpsiteNames();
			$scope.getSystemAlerts = function(ftpsiteId, alertType, status,
					fromDate, toDate) {
				$scope.alertTable = null;
				appFactory.get_system_alerts(ftpsiteId, alertType, status,
						fromDate, toDate).then(function(data) {
					if (data.results && data.results.messageResult.status) {
						$scope.datasetTable = data.results.model;
						$scope.alertTable = new NgTableParams({
							count : 10
						}, {
							counts : [], // hide page counts
							dataset : $scope.datasetTable
						});
					}
				});
			};

			$scope.$on('$http:loading', function(e, data) {
				if (data.get_ftpsiteNames) {
					$scope.ftpsiteNames_loaded = data.get_ftpsiteNames == 2;
				}
				if (data.get_system_alerts) {
					$scope.alerts_loaded = data.get_system_alerts == 2;
				}
			});
			$scope.$watchCollection('[name, status,fromDate,toDate]', function(
					newValues, oldValues) {
				// $scope.getSystemAlerts();
				if ((null == $scope.name ) || (undefined==$scope.name)) {
					$scope.name ='ALL' ;
				}
				if ((null == $scope.status)|| (undefined==$scope.status)) {
					$scope.status = 'ALL';
				}
				$scope.getSystemAlerts($scope.name, $scope.alertType ,$scope.status,
						$scope.fromDate, $scope.toDate);
			});
		}

		systemAlertsController.$inject = [ '$scope', 'appFactory',
				'NgTableParams', '$filter'];
		return {
			controller : systemAlertsController,
			templateUrl : 'views/viewAllSystemAlertsTemplate.html',
		};
	}
	angular.module('PSAMApp').directive('viewAllSystemAlertsDirective',
			viewAllSystemAlertsDirective);
}());