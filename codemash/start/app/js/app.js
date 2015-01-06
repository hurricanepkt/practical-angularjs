//SETTER
angular.module("app", ["ui.router"]);


//GETTER
angular.module("app").config (function ($stateProvider, $urlRouterProvider, $locationProvider) {
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


angular.module("app").controller('CardsController', function($scope, $http, CardFilter) {

	$http.get('/api/cards').success(function (response) { 
		$scope.cards = response.cards;
	});
	$scope.currentHeroFilter = 'neutral';
	$scope.heroFilters = CardFilter.heroFilters;
	$scope.setHeroFilter = function (hero) {
		$scope.currentHeroFilter = hero.value;
	}
});