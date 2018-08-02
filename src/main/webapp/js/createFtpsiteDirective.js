(function() {
	var createFtpsiteDirective = function() {
		var createFtpsiteController = function($scope, appFactory,
				designskopeFormFactory, $filter, designskopeQ, NgTableParams,
				$modal, appValidationFactory) {
			$scope.loaded = true;
			// table difference => dynamic web service => will change

			$scope.$watch("current", function(newval, oldval) {
				designskopeQ.get_pagetitle_deferred().notify(newval);
			});

			$scope.$on('$http:loading', function(e, data) {
				if (data.test_ftpsite) {
					$scope.loaded = data.test_ftpsite == 2;
				}
				if (data.post_ftpsite) {
					$scope.loaded = data.post_ftpsite == 2;
				}
			});

			$scope.testConnection = function(formCtrl) {
				var ftpInfo = JSON.stringify({
					"username" : $scope.username,
					"password" : $scope.password,
					"host" : $scope.host,
					"port" : $scope.port,
					"path" : $scope.path
				});

				appFactory.test_ftpsite(ftpInfo).then(
						function(data) {
							var message = '';
							message = data.results.message;
							if (data.error) {
								message = 'Cannot check at this time';
							}
							var modal = $modal.open({
								templateUrl : 'views/alert.html',
								controller : 'alertController',
								resolve : {
									param : function() {
										return [ 'Test connection result',
												message, false ];
									}
								}
							})
						});
			}
			// create
			$scope.addNewSite = function(formCtrl) {
				$scope.isSuppOrCusSelected = ($scope.suppOrCus == null);
				$scope.isProtocolSelected = ($scope.protocol == null);
				$scope.isReporttypeSelected = ($scope.reportType == null);
				if ($scope.suppOrCus == null || $scope.protocol == null
						|| $scope.reportType == null) {
					return;
				}
				var message = '';
				var newSiteJSON = JSON.stringify({
					"reporttype" : {
						"id" : $scope.reportType
					},
					"ftpuser" : {
						"username" : $scope.username,
						"password" : $scope.password
					},
					"ftpsitetype" : {
						"id" : $scope.ftpsiteType
					},
					"name" : $scope.suppOrCus,
					"host" : $scope.host,
					"port" : $scope.port,
					"protocol" : $scope.protocol,
					"path" : $scope.path,
					"up" : false,
					"note" : $scope.note,
					"systemuserByCreatedUserId" : {
						"id" : "1"
					},
					"systemuserByLastUpdatedUserId" : {
						"id" : "1"
					}
				});
				appFactory.post_ftpsite(newSiteJSON).then(function(data) {
					if (data.results.status) {
						designskopeFormFactory.resetForm(formCtrl, true);
					}
					message = data.results.message;
					// }
					if (data.error) {
						message = 'Fail to create new site';
					}
					var modal = $modal.open({
						templateUrl : 'views/alert.html',
						controller : 'alertController',
						resolve : {
							param : function() {
								return [ 'Information', message, false ];
							}
						}
					})
				});
			};
			// validation
			$scope.checkHost = function(host) {
				return appValidationFactory.checkHost(host);
			}
			$scope.checkPort = function(port) {
				return appValidationFactory.checkPort(port);
			};
			$scope.checkPath = function(path) {
				return appValidationFactory.checkPath(path);
			};
			$scope.checkUsername = function(username) {
				return appValidationFactory.checkNull(username);
			};
			$scope.checkPassword = function(password) {
				return appValidationFactory.checkNull(password);
			};
		}

		createFtpsiteController.$inject = [ '$scope', 'appFactory',
				'designskopeFormFactory', '$filter', 'designskopeQ',
				'NgTableParams', '$modal', 'appValidationFactory' ];
		return {
			controller : createFtpsiteController,
			templateUrl : 'views/createFtpsiteTemplate.html',
		};
	}
	angular.module('PSAMApp').directive('createFtpsiteDirective',
			createFtpsiteDirective);
}());