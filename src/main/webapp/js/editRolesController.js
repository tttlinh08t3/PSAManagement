(function() {
	var editRolesController = function($scope, $routeParams, appFactory, NgTableParams) {
		$scope.userName = $routeParams.userName;
		$scope.useEmail = "";
		$scope.selectedAvailableRoles = [];
		$scope.selectedAssignedRoles = [];
		$scope.saveStatus = "";
		$scope.userExised = false;
		
		$scope.getAvailableRoles = function() {
			$scope.availabeRolesTable = null;
			appFactory.get_available_roles_4_user($scope.userName).then(function(data) {
				if (data.results && data.results.messageResult.status) {
					$scope.datasetAvailableRoles = data.results.model;
					$scope.availabeRolesTable = new NgTableParams({
						page: 1, 
						count : 10
					}, {
						counts : [], // hide page counts
						dataset : $scope.datasetAvailableRoles
					});
					$scope.availabeRolesTable.reload();
					for (i = 0 ; i < $scope.datasetAvailableRoles.length; i++) {
						$scope.selectedAvailableRoles[$scope.datasetAvailableRoles[i].id] = false;
					}
				}
			});
		};
		
		$scope.getAssignedRoles = function() {
			$scope.assignedRolesTable = null;
			appFactory.get_roles_4_user($scope.userName).then(function(data) {
				if (data.results && data.results.messageResult.status) {
					$scope.datasetAssignedRoles = data.results.model;
					$scope.assignedRolesTable = new NgTableParams({
						page: 1, 
						count : 10
					}, {
						counts : [], // hide page counts
						dataset : $scope.datasetAssignedRoles
					});
					$scope.assignedRolesTable.reload();
					if ($scope.datasetAssignedRoles.length > 0) {
						$scope.userExised = true;
					}
					for (i = 0 ; i < $scope.datasetAssignedRoles.length; i++) {
						$scope.selectedAssignedRoles[$scope.datasetAssignedRoles[i].id] = false;
					}
				}
			});
		};
		
		$scope.addNewUser = function() {
			var message = '';
			var newUserJSON = JSON.stringify({
				"id" : null,
				"userName" : $scope.userName,
				"email" : $scope.useEmail
			});
			appFactory.add_system_user(newUserJSON).then(function(data) {
				message = data.results.message;
				// }
				if (data.error) {
					message = 'Fail to add new user';
				}
			});
		};
		
		// event handlers
		$scope.$on('$http:loading', function(e, data) {
			if (data.get_available_roles_4_user) {
				$scope.availableRoles_loaded = data.get_available_roles_4_user == 2;
			}
			if (data.get_roles_4_user) {
				$scope.assignedRoles_loaded = data.get_roles_4_user == 2;
			}
			if (data.update_roles_4_user) {
				if (data.update_roles_4_user == 2) {
					$scope.saveStatus = "saved";
				}
			}
		});
		
		$scope.getOracleUser = function() {
			if (!$scope.userExised) { // user may be not existed
				appFactory.get_oracle_user($scope.userName).then(function(data) {
					if (data.results && data.results.messageResult.status) {
						$scope.useEmail = data.results.model[0].email;
					}
				});
			}
		}
		
		$scope.getAvailableRoles();
		$scope.getAssignedRoles();
		$scope.getOracleUser();
		
		$scope.assign = function() {
			for (i = 0 ; i < $scope.datasetAvailableRoles.length; i++) {
				if ($scope.selectedAvailableRoles[$scope.datasetAvailableRoles[i].id] == true) {
					$scope.datasetAssignedRoles.push($scope.datasetAvailableRoles[i]);
				}
			}
			for (i = $scope.datasetAvailableRoles.length-1 ; i >= 0; i--) {
				if ($scope.selectedAvailableRoles[$scope.datasetAvailableRoles[i].id] == true) {
					$scope.datasetAvailableRoles.splice(i, 1);
				}
			}
			$scope.availabeRolesTable.reload();
			$scope.assignedRolesTable.reload();
			$scope.selectedAvailableRoles = [];
			$scope.selectedAssignedRoles = [];
		};
		
		$scope.remove = function() {
			for (i = 0 ; i < $scope.datasetAssignedRoles.length; i++) {
				if ($scope.selectedAssignedRoles[$scope.datasetAssignedRoles[i].id] == true) {
					$scope.datasetAvailableRoles.push($scope.datasetAssignedRoles[i]);
				}
			}
			for (i = $scope.datasetAssignedRoles.length-1 ; i >= 0; i--) {
				if ($scope.selectedAssignedRoles[$scope.datasetAssignedRoles[i].id] == true) {
					$scope.datasetAssignedRoles.splice(i, 1);
				}
			}
			$scope.availabeRolesTable.reload();
			$scope.assignedRolesTable.reload();
			$scope.selectedAvailableRoles = [];
			$scope.selectedAssignedRoles = [];
		};
		
		$scope.saveUpdate = function() {
			if (!$scope.userExised) {
				$scope.addNewUser();
			}
			var rolesArr = "";
			$scope.saveStatus = "saving";
			for (i = 0 ; i < $scope.datasetAssignedRoles.length ; i++) {
				rolesArr = rolesArr + $scope.datasetAssignedRoles[i].id + '-';
			}
			if (rolesArr == '') {
				rolesArr = 'none';
			}
			rolesArr = rolesArr.slice(0,-1);
			appFactory.update_roles_4_user($scope.userName, rolesArr).then(function(data) {
				if (data.results && data.results.status) {
					$scope.saveStatus = "saved";
				}
			});
		};
		
		$scope.back = function() {
			$location.path('#/usersAndRoles');
		};
		
	}
	editRolesController.$inject = [ '$scope', '$routeParams', 'appFactory', 'NgTableParams' ];

	angular.module('PSAMApp').controller('editRolesController',
			editRolesController);
}());