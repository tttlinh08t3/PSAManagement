(function (){    
    angular.module('PSAMApp').directive('confirmRedirIfXeditChangedDirective', ['designskopeFormFactory',
        function (designskopeFormFactory) {
                return {
                    restrict: 'A',
                    require: ["form"],
                    link: function (scope, element, attr, ctrls) {
                        
                        var formCtrl = ctrls[0];
                        designskopeFormFactory.add(formCtrl);
                        
                        // event handlers
                        scope.$watch(function() {
                            if (!formCtrl.$visible) {
                                return false;
                            }
                            var el = $('table.table tbody tr td span[e-form="'+formCtrl.$name+'"] + span').find("span .ng-dirty");
                            return el.length>0;
                        }, function(newval) {
                            if (newval) {
                                if (!formCtrl.$dirty) {
                                    formCtrl.$setDirty();
                                }
                            } else {
                                if (formCtrl.$dirty) {
                                    formCtrl.$setPristine();
                                }
                            }
                        });
                    }
                };
            }]);
}());
