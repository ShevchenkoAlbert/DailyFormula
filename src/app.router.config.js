export default function routerSettings($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/src/views/main.html',
		controller: 'MainController'
	})
	.when('/menu', {
		templateUrl: '/src/views/menu/menu.html',
		controller:'Menu'
	})
	.when('/calc', {
		templateUrl: '/src/views/calculate.template.html',
		controller: 'CalcController'
	})
	.when('/blog', {
		templateUrl: '/src/views/blog/blog.html',
		controller:'Blog'
	})
	.when('/post1',{
		templateUrl:'/src/views/posts/post1.html',
		controller:'Blog'
	})	
	.when('/post2',{
		templateUrl:'/src/views/posts/post2.html',
		controller:'Blog'
	})
	.when('/post3',{
		templateUrl:'/src/views/posts/post3.html',
		controller:'Blog'
	})
	.otherwise({ redirectTo: '/' });
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
};