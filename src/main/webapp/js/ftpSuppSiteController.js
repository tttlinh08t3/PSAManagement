(function() {

	var ftpSuppSiteController = function($scope, appFactory, NgTableParams) {
		$scope.suppOrCusLabel = 'Supplier';
		$scope.reporttypesLoaded = false;
		$scope.allCusOrSuppLabel =  'All suppliers';
		$scope.ftpsiteType = 1;
		
		$scope.getAllSuppliers = function() {
			appFactory.get_suppliers().then(function(data) {
				if (data.results && data.results.messageResult.status) { 
					$scope.suppliersOrCustomers =  data.results.model;
				}
			});
		}
		$scope.suppliersOrCustomers = $scope.getAllSuppliers();
		
	}

	ftpSuppSiteController.$inject = [ '$scope','appFactory','NgTableParams' ];

	angular.module('PSAMApp').controller('ftpSuppSiteController',
			ftpSuppSiteController);
}());