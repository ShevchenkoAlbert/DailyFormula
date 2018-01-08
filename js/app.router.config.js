export default function routerSettings($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('')
	
	$routeProvider
	.when('/', {
		templateUrl: '../js/views/main.html',
		controller: 'MainController'
	})
	.when('/menu', {
		templateUrl: 'js/views/menu.html',
		// controller: 'MainController'
	})
	.when('/calc', {
		templateUrl: '../js/views/calculate.template.html',
		controller: 'CalcController'
	})
	.when('/blog', {
		templateUrl: 'js/views/blog.html',
		// controller:'Blog'
	})

	.otherwise('/');
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
};