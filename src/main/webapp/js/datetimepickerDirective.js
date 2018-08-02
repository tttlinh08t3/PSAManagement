(function() {
	var datetimepickerDirective = function() {
		var link = function(scope, element, attr, ngModel) {
			console.log(scope[attr.ngModel]);
			element = $(element);
			element.datepicker({
				dateFormat : 'yy-mm-dd',
				defaultDate : scope[attr.ngModel]
			});
			
			element.on('changeDate', function(event) {
				scope.$apply(function() {
					ngModel.$setViewValue(event.date);
				});
			});
		};
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				$(function() {
					element.datepicker({
						dateFormat : attrs.dateFormat ? attrs.dateFormat
								: 'yy-mm-dd',
						onSelect : function(date) {
							scope.$apply(function() {
								ngModelCtrl.$setViewValue(date);
							});
						}
					});
				});
			}
		}
	};

	angular.module('PSAMApp').directive('datetimepickerDirective',
			datetimepickerDirective);
}());