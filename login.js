Eolmig.controller('controllerLogin', function controllerLogin ($scope, $state, factoryAuth) {
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
});