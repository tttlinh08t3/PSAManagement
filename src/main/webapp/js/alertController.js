(function() {

	var alertController = function($scope, $modalInstance, param) {
		$scope.title = param[0];
		$scope.message = param[1];
		$scope.isCancelShowed = param[2];
		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss();
		};
	};
	alertController.$inject = [ '$scope', '$modalInstance', 'param' ];
	angular.module('PSAMApp').controller('alertController', alertController);
}());
