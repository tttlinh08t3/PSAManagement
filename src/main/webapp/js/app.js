
// // declare modules
//angular.module('Authentication', []);
//angular.module('Home', []);

angular.module('PSAMApp', [
   // 'Authentication',
   // 'Home',
    'ngRoute', 'ui.bootstrap', 'ngTable', 'ui-notification',
					'angular.backtop', 'angular-dynamicinclude', 'ngCookies',
					'xeditable', 'ui.bootstrap'
])
 
.config(['$routeProvider','dynamicincludeProvider', 'HTTP_SUFFIX', function ($routeProvider, dynamicincludeProvider,
			HTTP_SUFFIX) {
		
		dynamicincludeProvider.register('PSAMApp', HTTP_SUFFIX);
		var lazymodule = dynamicincludeProvider.register_lazymodule;
		var lazy = dynamicincludeProvider.register_lazy;
    $routeProvider
			    .when('/logout', {
					 controller : 'logoutController',
					 templateUrl : 'views/logout.html'
		})
        .when('/', {
            templateUrl: 'views/home.html'
        })
		.when(
				'/ftpSuppSite/viewAll',
				{
					controller : 'ftpSuppSiteController',
					templateUrl : 'views/viewAllFtpSuppSite.html',
					resolve : {
						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
								'js/viewAllFtpsiteDirective.js',
								'js/ftpSuppSiteController.js',
								'js/appValidationFactory.js' ])
					}
				}).when(
				'/ftpSuppSite/create',
				{
					controller : 'ftpSuppSiteController',
					templateUrl : 'views/createFtpSuppSite.html',
					resolve : {
						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
								'js/createFtpsiteDirective.js',
								'js/ftpSuppSiteController.js',
								'js/appValidationFactory.js' ])
					}
				}).when(
				'/ftpCusSite/viewAll',
				{
					controller : 'ftpCusSiteController',
					templateUrl : 'views/viewAllFtpCusSite.html',
					resolve : {
						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
								'js/viewAllFtpsiteDirective.js',
								'js/ftpCusSiteController.js',
								'js/appValidationFactory.js' ])
					}
				}).when(
				'/ftpCusSite/create',
				{
					controller : 'ftpCusSiteController',
					templateUrl : 'views/createFtpCusSite.html',
					resolve : {
						lazy : lazy([ 'js/ftpSiteDropdownlistDirective.js',
								'js/createFtpsiteDirective.js',
								'js/ftpCusSiteController.js',
								'js/appValidationFactory.js' ])
					}
				})
				.when('/connectionFailureAlerts', {
			            templateUrl: 'views/viewAllConnectionFailureAlerts.html',
			            controller: 'connectionFailureAlertsController',
			            resolve: {
			                lazy: lazy([ 'js/viewAllSystemAlertsDirective.js',
			                            'js/connectionFailureAlertsController.js',
			                            'js/datetimepickerDirective.js'])
			            }
					})
				.when('/dataMissingAlerts', {
			            templateUrl: 'views/viewAllDataMissingAlerts.html',
			            controller: 'dataMissingAlertsController',
			            resolve: {
			                lazy: lazy(['js/dataMissingAlertsController.js',
			                            'js/viewAllSystemAlertsDirective.js',
			                            'js/datetimepickerDirective.js'])
			            }
				
					})
					.when('/connectionMonitoring', {
						controller : 'connectionMonitoringController',
						templateUrl : 'views/connectionMonitoring.html',
						resolve: {
			                lazy: lazy(['js/monitoringDirective.js',
			                            'js/connectionMonitoringController.js',
			                            'js/dataShareFactory.js'])
			            }
					})
					.when('/fileMonitoring', {
						controller : 'fileMonitoringController',
						templateUrl : 'views/fileMonitoring.html',
						resolve: {
			                lazy: lazy(['js/monitoringDirective.js',
			                            'js/fileMonitoringController.js',
			                            'js/dataShareFactory.js'])
			            }
					})
					.when('/connectionMonitoring/:scheduler_name', {
			            templateUrl: 'views/connectionSchedulerDetail.html',
			            controller: 'connectionSchedulerDetailController',
			            resolve: {
			                lazy: lazy(['js/schedulerDetailDirective.js', 
			                            'js/connectionSchedulerDetailController.js',
			                            'js/dataShareFactory.js',
			                            'js/datetimepickerDirective.js' ])
			            }
			        })
			        .when('/fileMonitoring/:scheduler_name', {
			            templateUrl: 'views/fileSchedulerDetail.html',
			            controller: 'fileSchedulerDetailController',
			            resolve: {
			                lazy: lazy(['js/schedulerDetailDirective.js',
			                            'js/fileSchedulerDetailController.js',
			                            'js/dataShareFactory.js',
			                            'js/datetimepickerDirective.js'])
			            }
			        })
			        .when('/usersAndRoles', {
			controller : 'usersAndRolesController',
			templateUrl : 'views/usersAndRoles.html' 
		}).when('/editRoles/:userName', {
			controller : 'editRolesController',
			templateUrl : 'views/editRoles.html' 
		})
        .otherwise({ redirectTo: '/' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
		$rootScope.showHeader = true;
        // keep user logged in after page refresh
    }])
    .constant('API_URL', '/WebService')
	.constant('DEBUG_MODE', 'false')
	.constant('HTTP_SUFFIX', '')
	.constant('LOGIN_URL', 'login');