(function() {

	var ftpCusSiteController = function($scope,appFactory, NgTableParams) {
		$scope.suppOrCusLabel = 'Customer';
		$scope.reporttypesLoaded = false;
		$scope.allCusOrSuppLabel =  'All customers';
		$scope.ftpsiteType = 2;
		
		$scope.getAllCustomers = function() {
			appFactory.get_customers().then(function(data) {
				if (data.results && data.results.messageResult.status) { 
					$scope.suppliersOrCustomers =  data.results.model;
				}
			});
		}
		$scope.suppliersOrCustomers = $scope.getAllCustomers();
	}
	
	ftpCusSiteController.$inject = [ '$scope','appFactory' ,'NgTableParams'];
	angular.module('PSAMApp').controller('ftpCusSiteController',
			ftpCusSiteController);
}());