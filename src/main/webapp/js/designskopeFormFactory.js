(function (){    
    var designskopeFormFactory = function($rootScope) {
        var formCtrls = [];
        
        var getFormCtrlIndex = function (name) {
            if (formCtrls && formCtrls.length) {
                for (var i in formCtrls) {
                    if (formCtrls[i].$name == name) {
                        return i;
                    }
                }
            }
        };
        
        var factory = {
            add: function (formCtrl) {
                formCtrls.push(formCtrl);
            },
            clear: function () {
                formCtrls = [];
            },
            setPristines: function () {
                if (formCtrls && formCtrls.length) {
                    for (var i in formCtrls) {
                        formCtrls[i].$setPristine();
                    }
                }
            },
            isPristines: function () {
                if (formCtrls && formCtrls.length) {
                    for (var i in formCtrls) {
                        if (formCtrls[i].$dirty) {
                            return false;
                        }
                    }
                }
                return true;
            },            
            resetForm: function (nameorctrl, keepvals) {
                if (typeof nameorctrl == "string") {
                    var i = getFormCtrlIndex(nameorctrl);
                    nameorctrl = formCtrls[i];
                }
                if (nameorctrl) {
                    nameorctrl.$setPristine();
                    if (!keepvals) {
                        document[nameorctrl.$name].reset();
                    }
                }
            }
        };
        return factory;
    };
    designskopeFormFactory.$inject = ['$rootScope'];
    
    angular.module('PSAMApp').factory('designskopeFormFactory', designskopeFormFactory);
}());