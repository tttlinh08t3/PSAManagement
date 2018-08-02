(function (){    
    var designskopeHttpInterceptor = function($q, $log, $rootScope, HTTP_SUFFIX) {
//        $log.debug('$log is here to show you that this is a regular factory with injection');
        var is_local_file = function(url) {
            return url.indexOf('views/') == 0;
        };
        
        var myInterceptor = {
            // optional method
            'request': function(config) {
                // do something on success
                if (is_local_file(config.url)) {
                    config.url += HTTP_SUFFIX;
                }
                config.headers['tokenID'] = getCookie('tokenID');                
                
                return config;
            },

            // optional method
           'requestError': function(rejection) {
              // do something on error
//              if (canRecover(rejection)) {
//                return responseOrNewPromise
//              }
                return $q.reject(rejection);
            },
            
            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },

            // optional method
           'responseError': function(rejection) {             
              // do something on error
//              if (canRecover(rejection)) {
//                return responseOrNewPromise
//              }
                return $q.reject(rejection);
            }
        };
        return myInterceptor;
    };
    designskopeHttpInterceptor.$inject = ['$q', '$log', '$rootScope', 'HTTP_SUFFIX'];
    
    angular.module('PSAMApp').factory('designskopeHttpInterceptor', designskopeHttpInterceptor);   
}());