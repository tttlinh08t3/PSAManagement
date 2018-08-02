(function() {
	var dataShareFactory = function($rootScope,$timeout) {
//		$rootScope.data = false;
		var factory = {

			sendData : function(data) {
				$rootScope.data = data;
				$timeout(function() {
					$rootScope.$broadcast('data_shared');
				},1000)
			},
			getData : function() {
				return $rootScope.data;
			}
		};
		return factory;
	};
	dataShareFactory.$inject = [ '$rootScope','$timeout' ];

	angular.module('PSAMApp').factory('dataShareFactory', dataShareFactory);
}());