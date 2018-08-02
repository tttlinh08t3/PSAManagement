(function (){
    var designskopeQ = function ($q) {
        var loading_deferred = $q.defer(),
                myprofile_deferred = $q.defer(),
                pagetitle_deferred = $q.defer(),
                projectnav_deferred = $q.defer();
        
        var factory = {
            get_projectnav_deferred: function(renew) {
                return projectnav_deferred; 
            },
            get_pagetitle_deferred: function(renew) {
                return pagetitle_deferred; 
            },
            get_myprofile_deferred: function(renew) {
                return myprofile_deferred; 
            },
            get_loading_deferred: function() {
                return loading_deferred; 
            }
        };
        return factory;
    };
    designskopeQ.$inject = ['$q'];
    
    angular.module('PSAMApp').factory('designskopeQ', designskopeQ);
}());