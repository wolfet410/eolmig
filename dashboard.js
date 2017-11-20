Eolmig.controller('controllerDashboard', 
	function controllerDashboard ($scope, $state, $interval, resolvedAuthCurrent, resolvedAccount, factoryAccount) {
		//resolvedTask,

	// To see the scope in Firefox dev tools, remove in production
	window.$scope = $scope;

	if (sessionStorage.getItem('clientapikey') === null || sessionStorage.getItem('clientapikey') === '') {
		$state.go('login');
	}
		      		
	$scope.dashboard = {
		user: resolvedAuthCurrent,
		account: resolvedAccount
		// ,
		// task: resolvedSetext2
	};

	// // Auto-refresh dashboard data every 30 seconds
	// $interval(function() {
	//     factoryAccount.setext2.get(function(sr) {
	// 		$scope.dashboard.task = sr;
	// 	});
	// }, 3000);

	// Dashboard functions
	$scope.showDn = function(dn) {
		alert('Distinguished Name: ' + dn);
	};

	$scope.preparePoc = function(dn) {
		$scope.dashboard.poc = dn;
	};

	$scope.setext2 = function(dn) {
		console.warn('setext2');
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
	};

	$scope.logout = function() {
		sessionStorage.removeItem('clientapikey');
		$state.go('login');
	};

});