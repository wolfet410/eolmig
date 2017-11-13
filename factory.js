Eolmig.factory('factoryAuth', function($resource) {
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
});