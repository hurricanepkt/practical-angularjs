var app = angular.module("app", ["ui.router"]);

app.config (function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	
	$stateProvider.state('cards', {
	        url : '/cards',
		templateUrl: "cards.html",
		controller : 'CardsController'
	});
	$stateProvider.state('decks', {
	        url : '/decks',
		templateUrl: "decks.html"
	});
	$stateProvider.state('admin', {
	        url : '/admin',
		templateUrl: "admin.html"
	});
	
	$urlRouterProvider.otherwise('/cards');
});


app.controller('CardsController', function($scope, $http) {

	$http.get('/api/cards').success(function (response) { 
		$scope.cards = response.cards;
	});
	console.log('created');
});