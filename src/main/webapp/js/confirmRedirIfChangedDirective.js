(function (){    
    angular.module('PSAMApp').directive('confirmRedirIfChangedDirective', ['designskopeFormFactory',
        function (designskopeFormFactory) {
                return {
                    restrict: 'A',
                    require: ["form"],
                    link: function (scope, element, attr, ctrls) {
                        
                        var formCtrl = ctrls[0];
//                        var current = {
//                            path: $location.path(),
//                            search: $location.search()
//                        };
                        designskopeFormFactory.add(formCtrl);
                                                
                        //$rootScope.$on('submitDoneEvent', function () { formCtrl.$setPristine(); });
                    }
                };
            }]);
}());