(function() {
	var ftpSiteDropdownlistDirective = function() {
		var ftpSiteDropdownlistController = function($scope, appFactory,
				designskopeFormFactory, $filter, designskopeQ, NgTableParams,
				$modal) {
			$scope.allReporttypes = [];
			$scope.reporttypes = [];
			$scope.protocols = [ 'ftp', 'ftps' ];
			$scope.isSuppOrCusSelected = false;
			$scope.isProtocolSelected = false;
			$scope.isReporttypeSelected = false;
			$scope.isReporttypeLoaded = false;
			$scope.getAllCategories = function() {
				appFactory.get_categories().then(function(data) {
					if (data.results) {
						$scope.allCategories = data.results.model;
					}
				});
			};

			
			$scope.getAllReportTypes = function() {
				if (!$scope.allReporttypes && $scope.categories_loaded ) {
					return;
				}
				appFactory.get_reportTypes().then(function(data) {
					if (data.results) {
						$scope.allReporttypes = data.results.model;
						$scope.reporttypes = $scope.allReporttypes;
						$scope.isReporttypeLoaded = true;
					}
				});
			};
			$scope.getAllCategories();
			$scope.getAllReportTypes();
			$scope.$on('$http:loading', function(e, data) {
				if (data.get_categories) {
					$scope.categories_loaded = data.get_categories == 2;
				}
			});

			$scope.onChangeCategory = function(selectedCategoryId) {
				if (null == selectedCategoryId) {
					$scope.reporttypes = $scope.allReporttypes;
				} else {
					var filteredReportTypes = [];
					angular.forEach($scope.allReporttypes, function(model) {
						if (model.category.id == selectedCategoryId) {
							filteredReportTypes.push(model);
						}
					});
					$scope.reporttypes = filteredReportTypes;
				}
			}
		}

		ftpSiteDropdownlistController.$inject = [ '$scope', 'appFactory',
				'designskopeFormFactory', '$filter', 'designskopeQ',
				'NgTableParams', '$modal' ];
		return {
			controller : ftpSiteDropdownlistController,
			templateUrl : 'views/ftpSiteDropdownlist.html',
		};
	}
	angular.module('PSAMApp').directive('ftpSiteDropdownlistDirective',
			ftpSiteDropdownlistDirective);
}());