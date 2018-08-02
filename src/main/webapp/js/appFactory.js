(function() {
	var appFactory = function(appService, Notification, designskopeQ, $log,
			DEBUG_MODE, LOGIN_URL) {

		var myprofile, supplierInfo, customerInfo, ftpSiteInfo, categoryInfo, reportTypeInfo, schedulerInfo, systemAlertInfo, ftpsiteNamesInfo,
						userInfo, roleInfo, updateRoleMsg 		= {};

		var ftpsiteType;
		var beforeHttp = function(obj, callee) {
			for ( var caller in obj) {
				if (obj[caller] == callee) {
					var loading = {};
					loading[caller] = 1;
					designskopeQ.get_loading_deferred().notify(loading);
					return caller;
				}
			}
		}

		var afterHttp = function(res) {
			if (DEBUG_MODE == 1) {
				var url = res.config.url + ':' + res.status;
				$log.debug(url);
				console.log(res);
				if (res.data == null) {
					Notification.error({
						message : url + ': The data is null'
					});
				}
				if (res.data && res.data.error) {
					Notification.error({
						message : url + ': ' + res.data.error
					});
				}
				if (res.data && res.data.errors) {
					res.data.errors.forEach(function(e) {
						Notification.error({
							message : url + ': ' + e
						});
					});
				}
			}

			if (res.status == 401) {
				Notification.warning('Please login!');
				setTimeout(function() {
					window.location.href = LOGIN_URL;
				}, 1000);
			} else if (res.status == 200 || res.status == -1) {
				var results = angular.copy(res.data);
				if (typeof results == "string") {
					// catch exception errors of the server
					if (/<[a-z][\s\S]*>/i.test(results)) {
						var url = res.config.url;
						Notification.error({
							message : url + ': ' + results
						});
						results = null;
					}
				}
				if (results == null) {
					res.data = {
						error : 'The data is null'
					};
				} else if (results.results || results.error || results.errors) {
					// skip
				} else {
					res.data = {
						results : results
					};
				}
			}

			return res.data;
		}

		var extendProp = function(o, props) {
			for (i = 0; i < props.length; i++) {
				if (!o[props[i]]) {
					o[props[i]] = {};
				}
				o = o[props[i]];
			}
			return o;
		};

		var httpCallback = function(response) {
			return afterHttp(response);
		}

		var shortcutCallback = function(_caller) {
			return function(response) {
				var caller = _caller;
				var loading = {};
				loading[caller] = 2;
				designskopeQ.get_loading_deferred().notify(loading);
				return response;
			};
		}

		var factory = {
			get_suppliers : function() {
				var caller = beforeHttp(this, arguments.callee);
				if (!supplierInfo) {
					supplierInfo = appService.get('/suppliers').then(
							httpCallback, httpCallback);
				}
				return supplierInfo.then(shortcutCallback(caller));
			},
			get_customers : function() {
				var caller = beforeHttp(this, arguments.callee);
				if (!customerInfo) {
					customerInfo = appService.get('/customers').then(
							httpCallback, httpCallback);
				}
				return customerInfo.then(shortcutCallback(caller));
			},
			get_ftpsites : function(ftpsiteTypeId) {
				var caller = beforeHttp(this, arguments.callee);
				if (ftpsiteType != ftpsiteTypeId) {
					ftpsiteType = ftpsiteTypeId;
					ftpSiteInfo = appService.get('/ftpsites/' + ftpsiteTypeId)
							.then(httpCallback, httpCallback);
				}
				return ftpSiteInfo.then(shortcutCallback(caller));
			},
			test_ftpsite : function(ftpInfo) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.post("/ftpsite/checkValidSite", ftpInfo)
						.then(function(response) {
							return afterHttp(response);
						}, httpCallback).then(shortcutCallback(caller));
			},
			post_ftpsite : function(ftpsite) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.post("/ftpsite", ftpsite).then(
						function(response) {
							return afterHttp(response);
						}, httpCallback).then(shortcutCallback(caller));
			},
			put_ftpsite : function(ftpsite, id) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.put('/ftpsite/' + id, ftpsite).then(
						function(response) {
							// clear the local data
							return afterHttp(response);
						}, httpCallback).then(shortcutCallback(caller));
			},
			get_categories : function() {
				var caller = beforeHttp(this, arguments.callee);
				if (!categoryInfo) {
					categoryInfo = appService.get('/categories').then(
							httpCallback, httpCallback);
				}
				return categoryInfo.then(shortcutCallback(caller));
			},
			get_reportTypes : function() {
				var caller = beforeHttp(this, arguments.callee);
				reportTypeInfo = appService.get('/reporttypes').then(
						httpCallback, httpCallback);
				return reportTypeInfo.then(shortcutCallback(caller));
			},
			get_schedulers : function(schedulerType) {
				var caller = beforeHttp(this, arguments.callee);
				schedulerInfo = appService.get(
						'/ftpsiteConnection/schedulers/' + schedulerType).then(
						httpCallback, httpCallback);
				return schedulerInfo.then(shortcutCallback(caller));
			},
			start_scheduler : function(scheduler, schedulerType) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.post(
						"/ftpsiteConnection/scheduler/start/" + schedulerType,
						scheduler).then(function(response) {
					return afterHttp(response);
				}, httpCallback).then(shortcutCallback(caller));
			},
			stop_scheduler : function(scheduler, schedulerType) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.post(
						"/ftpsiteConnection/scheduler/stop/" + schedulerType,
						scheduler).then(function(response) {
					return afterHttp(response);
				}, httpCallback).then(shortcutCallback(caller));
			},
			get_scheduler : function(schedulerType, schedulerName) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.get(
						"/ftpsiteConnection/scheduler/" + schedulerType + "/"
								+ schedulerName).then(function(response) {
					return afterHttp(response);
				}, httpCallback).then(shortcutCallback(caller));
			},
			update_scheduler : function(scheduler, schedulerType) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.post(
						"/ftpsiteConnection/scheduler/update/" + schedulerType,
						scheduler).then(function(response) {
					return afterHttp(response);
				}, httpCallback).then(shortcutCallback(caller));
			},
			get_system_alerts : function(ftpsiteId, alertType, status,
					fromDate, toDate) {
				var caller = beforeHttp(this, arguments.callee);
				systemAlertInfo = appService.get(
						'/findAlerts/' + ftpsiteId + "/" + alertType + "/"
								+ status + "/" + fromDate + "/" + toDate).then(
						httpCallback, httpCallback);
				return systemAlertInfo.then(shortcutCallback(caller));
			},
			get_ftpsiteNames : function() {
				var caller = beforeHttp(this, arguments.callee);
				ftpsiteNamesInfo = appService.get('/ftpsiteNames').then(
						httpCallback, httpCallback);
				return ftpsiteNamesInfo.then(shortcutCallback(caller));
			},
			get_oracle_users : function(searchUserName) {
				var caller = beforeHttp(this, arguments.callee);
				if (!userInfo) {
					userInfo = appService.get('/searchUsers/'+ searchUserName).then(
							httpCallback, httpCallback);
				}
				return userInfo.then(shortcutCallback(caller));
			},
			get_oracle_user : function(searchUserName) {
				var caller = beforeHttp(this, arguments.callee);
				var oracleUser = appService.get('/searchUsers/'+ searchUserName).then(
						httpCallback, httpCallback);
				return oracleUser.then(shortcutCallback(caller));
			},
			get_roles_4_user : function(userName) {
				var caller = beforeHttp(this, arguments.callee);
				roleInfo = appService.get('/systemroles/'+ userName).then(
						httpCallback, httpCallback);
				return roleInfo.then(shortcutCallback(caller));
			},
			get_available_roles_4_user : function(userName) {
				var caller = beforeHttp(this, arguments.callee);
				roleInfo = appService.get('/systemrolesAvailable/'+ userName).then(
						httpCallback, httpCallback);
				return roleInfo.then(shortcutCallback(caller));
			},
			update_roles_4_user : function(userName, roles) {
				var caller = beforeHttp(this, arguments.callee);
				updateRoleMsg = appService.get('/editsystemroles/'+ userName + '/' + roles).then(
						httpCallback, httpCallback);
				return updateRoleMsg.then(shortcutCallback(caller));
			},
			add_system_user : function(systemuser) {
				var caller = beforeHttp(this, arguments.callee);
				return appService.post("/systemuser", systemuser).then(
						function(response) {
							return afterHttp(response);
						}, httpCallback).then(shortcutCallback(caller));
			}
		};
		return factory;
	};
	appFactory.$inject = [ 'appService', 'Notification', 'designskopeQ',
			'$log', 'DEBUG_MODE', 'LOGIN_URL' ];

	angular.module('PSAMApp').factory('appFactory', appFactory);
}());