var app = angular.module("app", ["ngRoute"]);

app.config (function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	
	$routeProvider.when('/cards', {
		templateUrl: "cards.html"
	});
});
