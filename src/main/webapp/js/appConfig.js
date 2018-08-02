//(function() {
//	var PSAMApp = angular.module('PSAMApp',
//			[ 'ngRoute', 'ui.bootstrap', 'ngTable', 'ui-notification',
//					'angular.backtop', 'angular-dynamicinclude', 'ngCookies',
//					'xeditable', 'ui.bootstrap' ]);
//	PSAMApp.config([ '$compileProvider', function($compileProvider) {
//	} ])
//	var appConfig = function($routeProvider, dynamicincludeProvider,
//			HTTP_SUFFIX) {
//		dynamicincludeProvider.register('PSAMApp', HTTP_SUFFIX);
//		var lazymodule = dynamicincludeProvider.register_lazymodule;
//		var lazy = dynamicincludeProvider.register_lazy;
//		$routeProvider.when(
//				'/ftpSuppSite/viewAll',
//				{
//					controller : 'ftpSuppSiteController',
//					templateUrl : 'views/viewAllFtpSuppSite.html',
//					resolve : {
//						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
//								'js/viewAllFtpsiteDirective.js',
//								'js/ftpSuppSiteController.js',
//								'js/appValidationFactory.js' ])
//					}
//				}).when(
//				'/ftpSuppSite/create',
//				{
//					controller : 'ftpSuppSiteController',
//					templateUrl : 'views/createFtpSuppSite.html',
//					resolve : {
//						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
//								'js/createFtpsiteDirective.js',
//								'js/ftpSuppSiteController.js',
//								'js/appValidationFactory.js' ])
//					}
//				}).when(
//				'/ftpCusSite/viewAll',
//				{
//					controller : 'ftpCusSiteController',
//					templateUrl : 'views/viewAllFtpCusSite.html',
//					resolve : {
//						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
//								'js/viewAllFtpsiteDirective.js',
//								'js/ftpCusSiteController.js',
//								'js/appValidationFactory.js' ])
//					}
//				}).when(
//				'/ftpCusSite/create',
//				{
//					controller : 'ftpCusSiteController',
//					templateUrl : 'views/createFtpCusSite.html',
//					resolve : {
//						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
//								'js/createFtpsiteDirective.js',
//								'js/ftpCusSiteController.js',
//								'js/appValidationFactory.js' ])
//					}
//				}).when('/connectionMonitoring', {
//			controller : 'monitoringController',
//			templateUrl : 'views/connectionMonitoring.html'
//		}).when('/login', {
//			templateUrl : 'views/login.html',
//			controller: 'loginController'
//		}).when('/', {
//			templateUrl : 'views/home.html',
//			controller : 'mainController',
//		}).otherwise({
//			redirectTo : 'views/login.html',
//			controller: 'loginController'
//		});
//
//	};
//	var appRun = function run($rootScope, $http, $location, $localStorage) {
//		// keep user logged in after page refresh
//		if ($localStorage.currentUser) {
//			$http.defaults.headers.common.Authorization = 'Bearer '
//					+ $localStorage.currentUser.token;
//		}
//
//		// redirect to login page if not logged in and trying to access a
//		// restricted page
//		$rootScope.$on('$locationChangeStart', function(event, next, current) {
//			var publicPages = [ '/login' ];
//			var restrictedPage = publicPages.indexOf($location.path()) === -1;
//			if (restrictedPage && !$localStorage.currentUser) {
//				$location.path('/login');
//			}
//		});
//	}
//	PSAMApp.constant('API_URL', '/WebService');
//	PSAMApp.constant('DEBUG_MODE', 'false');
//	PSAMApp.constant('HTTP_SUFFIX', '');
//	PSAMApp.constant('LOGIN_URL', 'login')
//
//	appConfig.$inject = [ '$routeProvider', 'dynamicincludeProvider',
//			'HTTP_SUFFIX' ];
//	appRun.$inject = [ '$rootScope', '$http',
//	          			'$location', '$localStorage' ];
//	
//	PSAMApp.config(appConfig).run(appRun);
//}());