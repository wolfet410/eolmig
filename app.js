var Eolmig = angular.module('eolmig', [
	'ui.router',
	'ngMaterial',
	'ngResource',
	'minimalPiechart',
	'md.data.table'
]);

Eolmig.config(function eolmigConfig ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
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
				controller: 'controllerLogin'
			}
		}
	});

	$stateProvider.state('dashboard', {
		url: '/dashboard',
		views: {
			"main": {
				templateUrl: 'dashboard.tpl.html',
				controller: 'controllerDashboard'
			}
		},
		resolve: {
			resolvedAuthCurrent: function(factoryAuth) {
				return factoryAuth.current.get().$promise;
			},
			resolvedAccount: function(factoryAccount) {
				return factoryAccount.account.get().$promise;
			}
			// ,
			// resolvedSetext2: function(factoryAccount) {
			// 	return factoryAccount.setext2.get().$promise;	
			// }
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