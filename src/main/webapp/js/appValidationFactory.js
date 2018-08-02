(function() {
	var appValidationFactory = function() {

		var factory = {
			checkHost : function(host) {
				if (null == host || undefined == host || host.length == 0) {
					return "This field is required";
				}
				var pattern = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
				if (!pattern.test(host)) {
					return "This host is invalid";
				}
			},
			checkPort : function(port) {
				var pattern = /^([0-9])*$/;
				if (port != null) {
					if (!pattern.test(port) || port < 0 || port > 65536) {
						return "This port number is invalid";
					}
				}
			},
			checkPath : function(path) {
				if (null == path || undefined == path || path.length == 0) {
					return "This field is required";
				}
				var pattern = /^(\/)([a-z_\-\A-Z\s0-9\.]+(\/)?)*$/;
				if (!pattern.test(path)) {
					return "This path is invalid";
				}
			},
			checkNull : function(data) {
				if (null == data || undefined == data || data.length == 0) {
					return "This field is required";
				}
			}
		};
		return factory;
	};
	appValidationFactory.$inject = [];

	angular.module('PSAMApp').factory('appValidationFactory',
			appValidationFactory);
}());