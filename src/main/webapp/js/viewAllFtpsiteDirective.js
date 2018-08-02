(function() {
	var viewAllFtpsiteDirective = function() {
		var viewAllFtpsiteController = function($scope, appFactory,
				designskopeFormFactory, $filter, designskopeQ, NgTableParams,
				$modal, appValidationFactory) {
			$scope.getAllFtpsites = function() {
				$scope.tableParams = null;
				appFactory.get_ftpsites($scope.ftpsiteType).then(
						function(data) {
							if (data.results
									&& data.results.messageResult.status) { // should
								// check
								// status
								$scope.datasetTable = data.results.model;
								$scope.tableParams = new NgTableParams({
									count : 10
								}, {
									counts : [], // hide page counts
									dataset : $scope.datasetTable
								});
							}
						});
			}

			// event handlers
			$scope
					.$on(
							'$http:loading',
							function(e, data) {
								if (data.get_ftpsites) {
									$scope.sites_loaded = data.get_ftpsites == 2;
								}
								if (data.get_reportTypes) {
									$scope.reporttypesLoaded = data.get_reportTypes == 2;
									if (data.get_reportTypes == 2
											&& !(data.get_ftpsites == 2)) {
										$scope.getAllFtpsites();
									}
								}
							});

			$scope.filterFtpsites = function() {
				var dataset = $scope.datasetTable;
				var result = [];
				if (null != $scope.suppOrCus) {
					dataset = $filter('filter')(dataset, {
						supplier : $scope.suppOrCus,
					}, true);
				}
				if (null != $scope.protocol) {
					dataset = $filter('filter')(dataset, {
						protocol : $scope.protocol,
					}, true);
				}
				if (null != $scope.reportType) {
					angular.forEach(dataset, function(item) {
						if (item.reporttype.id == $scope.reportType) {
							result.push(item);
						}
					});
					return result;
				}
				if (null != $scope.selectedCategoryId) {
					angular
							.forEach(
									dataset,
									function(item) {
										if (item.reporttype.category.id == $scope.selectedCategoryId) {
											result.push(item);
										}
									});
					return result;
				}
				return dataset;
			};
			$scope.$watchCollection(
					'[suppOrCus, protocol,selectedCategoryId,reportType]',
					function(newValues, oldValues) {
						if ($scope.reporttypesLoaded == false) {
							return;
						}
						var dataset = [];
						dataset = $scope.filterFtpsites();
						$scope.tableParams = new NgTableParams({
							count : 10
						}, {
							counts : [], // hide page counts
							dataset : dataset
						});
					});

			$scope.$watch("current", function(newval, oldval) {
				designskopeQ.get_pagetitle_deferred().notify(newval);
			});

			$scope.showReportType = function(site) {
				var selected = [];
				if ($scope.isReporttypeLoaded) {
					selected = $filter('filter')($scope.allReporttypes, {
						id : site.reporttype.id
					}, true);
					return selected[0].reportType;
				}
				return 'Not define';
			};

			$scope.editSelectedRow = function(dataChanged, id) {
				var editedFtpsite = JSON.stringify({
					"reporttype" : {
						"id" : dataChanged.reporttype,
					},
					"ftpuser" : {
						"username" : dataChanged.username,
						"password" : dataChanged.password
					},
					"host" : dataChanged.host,
					"port" : dataChanged.port,
					"protocol" : dataChanged.protocol,
					"path" : dataChanged.path,
					"note" : dataChanged.note,
					"systemuserByLastUpdatedUserId" : {
						"id" : "1"
					}
				});
				appFactory.put_ftpsite(editedFtpsite, id).then(
						function(data) {
							var title = '';
							var message = '';
							if (data.results.status) {
								$scope.tableParams.reload();
							}
							if (!data.results.status || data.error) {
								var modal = $modal.open({
									templateUrl : 'views/alert.html',
									controller : 'alertController',
									resolve : {
										param : function() {
											return [ 'Error',
													'Fail to save this site',
													false ];
										}
									}
								})
							}
						});
			}

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

		viewAllFtpsiteController.$inject = [ '$scope', 'appFactory',
				'designskopeFormFactory', '$filter', 'designskopeQ',
				'NgTableParams', '$modal', 'appValidationFactory' ];
		return {
			controller : viewAllFtpsiteController,
			templateUrl : 'views/viewAllFtpsiteTemplate.html',
		};
	}
	angular.module('PSAMApp').directive('viewAllFtpsiteDirective',
			viewAllFtpsiteDirective);
}());