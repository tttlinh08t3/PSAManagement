/**
 * angular-chosenplugin - Angular.js service providing jQuery chosen plugin
 * @author nbieu
 * @version 
 * @link 
 * @license 
 */
(function (){
    angular.module('angular-chosenplugin', []);
}());

(function (){        
    var chosenpluginDirective = function() {
        var controller = function($scope) {
            $scope.total = 0;
            
            var chosen = function(flag) {
                if (flag) {
                    $('select#'+$scope.selectId).chosen("destroy");
                }
                $('select#'+$scope.selectId).chosen().change(function(e) {    
                    $scope.$apply(function() {  
                        var values = angular.copy($scope.chosenValues);
                        if (values.indexOf("Deselect all") > -1) {
                            values = [];
                        } else if (values.indexOf("Select all") > -1) {                
                            values = Object.keys($scope.chosendataOptions);
                        }
                        $scope.onChange({values: values});
                    });
                });
            }
            
            // event handlers
            $scope.$watch('chosendataOptions', function (newval) {
                if (newval && angular.isArray(newval)) {
                    var val = {};
                    newval.forEach (function (v) {
                        val[v] = v;
                    });
                    $scope.chosendataOptions = val;
                }
                if (newval) {
                    $scope.total = Object.keys(newval).length;
                }
            });
            
            $scope.$watch(function() {
                return $('select#'+$scope.selectId).find('option').length > 1;
            }, function(newval, oldval) {
                if (!oldval && newval) {                    
                    
                    chosen();
                    $scope.$watch('chosenValues', function (newval, oldval) {                        
                        if (newval.length || oldval.length) {
                            chosen(true);
                        }
                    });  
                }
            });
        };
        controller.$inject = ['$scope'];
        
        return {
            restrict: "E",
            controller: controller,
            scope: {
                selectId: '@',
                chosendataOptions: '=',
                chosenValues: '=',
                onChange: '&'
            },
            template: '<select multiple id="{{ selectId }}" '+
        'ng-show="total"'+
        'ng-model="chosenValues">'+
    '<option value="{{ total != chosenValues.length ? \'Select all\' : \'Deselect all\' }}">'+
        '{{ total != chosenValues.length ? "Select all" : "Deselect all" }}</option>'+
    '<option ng-repeat="(key, val) in chosendataOptions" '+
            'value="{{ key }}" '+
            'ng-selected="{{ chosenValues.indexOf(key)>-1 }}">{{ val }}</option>'+
'</select>'
        }
    };

    angular.module('angular-chosenplugin').directive('chosenpluginDirective', chosenpluginDirective);  
}());