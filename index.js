angular.module('eolmig', [
	'ui.router',
	'ngMaterial',
	'ngResource',
	'minimalPiechart'
])

.factory('factoryAuth', function($resource) {
 	var factory = {
		login: $resource('//shaubtest002.shared.gkn.com/arrow-eolmig/api/user/login', { }, {
			post: { method: 'POST' }
	    }),
	    current: $resource('//shaubtest002.shared.gkn.com/arrow-eolmig/api/user/current')
	};

  return factory;
})

.factory('factoryAccount', function($resource) {
	var factory = {
		account: $resource('//shaubtest002.shared.gkn.com/arrow-eolmig/api/account/account'),
		setext2: $resource('//shaubtest002.shared.gkn.com/arrow-eolmig/api/account/setext2', { }, {
			post: { method: 'POST' }
		})
	};

	return factory;
})

.config(function eolmigConfig ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	$mdThemingProvider
		.theme('default')
		.primaryPalette('blue')
		.accentPalette('amber')
		.warnPalette('red')
		.backgroundPalette('blue-grey');

	$stateProvider.state('login', {
		url: '/login',
		views: {
			"main": {
				templateUrl: 'login.tpl.html',
				controller: function ($scope, $state, factoryAuth) {
		      		$scope.login = {
				      	creds: {
				      		email: null,
				      		password: null
				      	},
				      	login: function() {
				      		factoryAuth.login.post($scope.login.creds, function(user) {
				      			sessionStorage.setItem('clientapikey', user.user.clientapikey);
				      			$state.go('dashboard');
				      		},
				      		function(err) {
				      			alert(err.data.message);
				      		});
				    	}
					};
			    }
			}
		}
	});

	$stateProvider.state('dashboard', {
		url: '/dashboard',
		views: {
			"main": {
				templateUrl: 'dashboard.tpl.html',
				controller: function ($scope, $state, $interval, resolvedAuthCurrent, resolvedAccount, resolvedSetext2, factoryAccount) {
					if (sessionStorage.getItem('clientapikey') === null || sessionStorage.getItem('clientapikey') === '') {
						$state.go('login');
					}
		      		$scope.dashboard = {
		      			user: resolvedAuthCurrent,
		      			account: resolvedAccount,
		      			task: resolvedSetext2,
		      			showDn: function(dn) {
		      				alert('Distinguished Name: ' + dn);
		      			},
		      			preparePoc: function(dn) {
		      				$scope.dashboard.poc = dn;
		      			},
		      			setext2: function(dn) {
		      				var o = { dn: dn };
		      				factoryAccount.setext2.post(o, function(result) {
		      					// alert('Set extentionAttribute2 queued');
		      					factoryAccount.setext2.get(function(sr) {
		      						$scope.dashboard.task = sr;
		      					});
		      				},
		      				function(err) {
		      					alert(err.data.message);
		      				});		      				
		      			},
		      			logout: function() {
		      				sessionStorage.removeItem('clientapikey');
		      				$state.go('login');
		      			}
					};
					$interval(function() {
					    factoryAccount.setext2.get(function(sr) {
      						$scope.dashboard.task = sr;
      					});
					}, 3000);
			    }
			}
		},
		resolve: {
			resolvedAuthCurrent: function(factoryAuth) {
				return factoryAuth.current.get().$promise;
			},
			resolvedAccount: function(factoryAccount) {
				return factoryAccount.account.get().$promise;
			},
			resolvedSetext2: function(factoryAccount) {
				return factoryAccount.setext2.get().$promise;	
			}
		},
	});

})

.run(function run($http) {
    // Adding dev key for Arrow
    $http.defaults.headers.common['APIKey'] = 'Yo1WagtLBh9gUOUEaCo0q5zszsDrwjRA';

    // If clientApikey exists in sessionStorage, add it to the http header
    if (sessionStorage.getItem('clientapikey') !== null) {
        $http.defaults.headers.common['x-api-key'] = sessionStorage.getItem('clientapikey');
    }
});