/**
 * angular-dynamicinclude - Angular.js service providing lazy loading
 * @author nbieu
 * @version 
 * @link 
 * @license 
 */
(function (){
    angular.module('angular-dynamicinclude', []);
}());

(function (){
    var dynamicloadingService = function ($q, $rootScope, $timeout) {
        this.loaded_files = [];
        
        this.load = function(files, suffix) {
            var promises = [];
            for (var i in files) {
                if (this.loaded_files.indexOf(files[i]) > -1) {
                    continue;
                }
                this.loaded_files.push(files[i]);
                promises.push(this.loadFile(files[i] + suffix));
            }
            return $q.all(promises);
        };
        
        this.loadFile = function(file) {            
            var elm, deferred = $q.defer();              
            if (file.indexOf('.js') > -1) {
                elm = this.createScript(file);
            } else {
                elm = this.createCSS(file);
            }            
            elm.onload = elm.onreadystatechange = function (e) {
                if (elm.readyState && elm.readyState !== 'complete' && elm.readyState !== 'loaded') {
                    return;
                }
                                
                $timeout(function () {
                    $rootScope.$apply(function() {
                        deferred.resolve(e);
                    });
                });
            }
            elm.onerror = function (e) {
                $timeout(function () {
                    $rootScope.$apply(function() {
                        deferred.reject(e);
                    });
                });
            }
            return deferred.promise;
        };
        
        this.createScript = function (src) {
            var elm = document.createElement('script');
            
            elm.src = src;
            document.body.appendChild(elm);
            return elm;
        };
        
        this.createCSS = function (href) {
            var style = document.createElement('link');

            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = href;

            document.head.appendChild(style);
            return style;
        };
    };
    dynamicloadingService.$inject = ['$q', '$rootScope', '$timeout'];
    
    angular.module('angular-dynamicinclude').service('dynamicloadingService', dynamicloadingService);
}());

(function (){
    var dynamicmoduleService = function ($injector) {
        this.loaded_modules = [];
        
        this.registerModules = function (moduleNames, providers) {
            if (!Array.isArray(moduleNames)) {
                moduleNames = [moduleNames];
            }            
            for (var i in moduleNames) {
                if (this.loaded_modules.indexOf(moduleNames[i]) > -1) {
                    continue;
                }
                this.loaded_modules.push(moduleNames[i]);
                this.registerModule(moduleNames[i], providers);
            }
        };
        
        this.registerModule = function (moduleName, providers) {
            var module = angular.module(moduleName);

            if (module.requires) {
                for (var i = 0; i < module.requires.length; i++) {
                    this.registerModule(module.requires[i], providers);
                }
            }

            angular.forEach(module._invokeQueue, function(invokeArgs) {
                var provider = providers[invokeArgs[0]];
                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            });
            angular.forEach(module._configBlocks, function (fn) {
                $injector.invoke(fn);
            });
            angular.forEach(module._runBlocks, function (fn) {
                $injector.invoke(fn);
            });
        };  
    };
    dynamicmoduleService.$inject = ['$injector'];
    
    angular.module('angular-dynamicinclude').service('dynamicmoduleService', dynamicmoduleService);
}());

(function (){
    angular.module('angular-dynamicinclude').provider("dynamicinclude", ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        var providers = {
            $controllerProvider: $controllerProvider,
            $compileProvider: $compileProvider,
            $filterProvider: $filterProvider,
            $provide: $provide
        };   
        var suffix = "";
        
        this.register = function (moduleName, _suffix) {
            var app = angular.module(moduleName);
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service; 
            suffix = _suffix;
        }
        
        this.register_lazymodule = function(moduleNames, files) {           
            return function(dynamicinclude) {                
                return dynamicinclude.lazymodule(moduleNames, files);
            };
        }
        this.register_lazy = function(files) {                                  
            return function(dynamicinclude) {
                return dynamicinclude.lazy(files);            
            };
        }

        this.$get = ['dynamicloadingService', 'dynamicmoduleService', function (dynamicloadingService, dynamicmoduleService) {
            return {
                lazy: function(files) {                    
                    return dynamicloadingService.load(files, suffix);                    
                },
                lazymodule: function(moduleNames, files) {
                    return dynamicloadingService.load(files, suffix).then(function(promise) {                    
                        dynamicmoduleService.registerModules(moduleNames, providers);
                        return promise;
                    });
                }
            };
        }];
    }]);
}());
