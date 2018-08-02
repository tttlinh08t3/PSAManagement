(function() {
	var usersAndRolesController = function($scope, appFactory, NgTableParams) {
		$scope.searchName = "%25";
		$scope.limitRows = 10;
		
		$scope.getOracleUsers = function() {
			$scope.tableParams1 = null;
			//var name4Search = $scope.searchName;
//			if (name4Search.indexOf('%') !== -1) {
//				name4Search = name4Search.replace(new RegExp('%', 'g'), '%25');
//			}
			//name4Search = name4Search.toUpperCase();
			appFactory.get_oracle_users($scope.searchName).then(function(data) {
				if (data.results && data.results.messageResult.status) {
					$scope.datasetTable1 = data.results.model;
					$scope.tableParams1 = new NgTableParams({
						page: 1, 
						count : 10
					}, {
						counts : [], // hide page counts
						dataset : $scope.datasetTable1
					});
					$scope.tableParams1.reload();
				}
			});
		};
		
		// event handlers
		$scope.$on('$http:loading', function(e, data) {
			if (data.get_oracle_users) {
				$scope.users_loaded = data.get_oracle_users == 2;
			}
		});
		$scope.getOracleUsers();
		
		$scope.enterSearch = function(e) {
			if (e.keyCode == 13) {
				$scope.getOracleUsers();
			}
		};
		$scope.changeRowsPerPage = function() {
			$scope.tableParams1.count($scope.limitRows);
		};
	}
	usersAndRolesController.$inject = [ '$scope', 'appFactory', 'NgTableParams' ];

	angular.module('PSAMApp').controller('usersAndRolesController',
			usersAndRolesController);
}());