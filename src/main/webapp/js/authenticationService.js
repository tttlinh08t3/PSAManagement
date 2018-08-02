(function() {
	var authenticationService = function($window, $cookieStore, $rootScope) {
		var authenticationService = {};
		$rootScope.currentUser = '';
		authenticationService.setUserName = function(userName) {
			$rootScope.currentUser = userName;
			$cookieStore.put('currentUser', $rootScope.currentUser);
		}

		authenticationService.getUserName = function() {
			return $cookieStore.get('currentUser');
		}

		authenticationService.removeSession = function() {
			$rootScope.currentUser = '';
			$cookieStore.remove('currentUser');
		}
		return authenticationService;
	};
	authenticationService.$inject = [ '$window', '$cookieStore', '$rootScope' ];

	angular.module('PSAMApp').service('authenticationService',
			authenticationService);
}());
