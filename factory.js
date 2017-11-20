Eolmig.factory('factoryAuth', function($resource, constant) {
 	var factory = {
		login: $resource(constant.ARROW_URL + '/api/user/login', { }, {
			post: { method: 'POST' }
		}),
		current: $resource(constant.ARROW_URL + '/api/user/current')
	};

	return factory;
})

.factory('factoryAccount', function($resource, constant) {
	var factory = {
		account: $resource(constant.ARROW_URL + '/api/account/account')
	};

	return factory;
})

.factory('factoryTask', function($resource, constant) {
	var factory = {
		task: $resource(constant.ARROW_URL + '/api/task/task'),
		task: $resource(constant.ARROW_URL + '/api/task/task', { }, {
			post: { method: 'POST' }
		})
	};

	return factory;
});