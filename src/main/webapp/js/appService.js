(function (){
    var appService = function ($http, API_URL) {
        this.base_url = API_URL;  
        
        this.get = function(uri, data) {
            return $http({
    // headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                method  : 'GET',
                url     : this.base_url + uri
            });
        };
        
        this.post = function(uri, data) {
            return $http({
                headers : {'Content-Type': 'application/json'}, 
                method  : 'POST',
                url     : this.base_url + uri,
                data    : data
            });
        };
        
        this.delete = function(uri, data) {
            return $http({
    // headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                method  : 'DELETE',
                url     : this.base_url + uri,
                data    : data
            });
        };
        
        this.put = function(uri, data) {
            return $http({
            	headers : {'Content-Type': 'application/json'}, 
                method  : 'PUT',
                url     : this.base_url + uri,
                data    : data
            });
        };
    };
    appService.$inject = ['$http', 'API_URL'];
    
    angular.module('PSAMApp').service('appService', appService);
}());
