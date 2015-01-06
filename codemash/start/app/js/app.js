var app = angular.module("app", ["ui.router"]);

app.config (function ($stateProvider, $routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	
	$stateProvider.state('cards', {
	        url : '/cards',
		templateUrl: "cards.html"
	});
	
	
	$urlRouterProvider.otherwise('/cards');
});
