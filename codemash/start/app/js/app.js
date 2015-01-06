//SETTER
angular.module("app", ["ui.router", "ngAnimate"]);
angular.module("app").run(function($rootScope, $state) {

  $rootScope.searchQueryChanged = function(query) {
    $rootScope.searchQuery = query;
  };

});

angular.module("app").filter('capitalize', function() {
  return function(input) {
	return input.charAt(0).toUpperCase() + input.slice(1);
  };
});

//GETTER
angular.module("app").config (function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	
	$stateProvider.state('cards', {
	    url : '/cards',
		templateUrl: "cards.html",
		controller : 'CardsController',
		resolve : { 
		    cardsResponse : function($http) {
				return $http.get('/api/cards');
			}
		}		
	});
	
	$stateProvider.state('cards.detail', {
		url: '/:id',
		templateUrl: "detail.html",
		controller: "DetailViewController",
		onEnter: function($stateParams) {
		  console.log($stateParams.id);
		}
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

angular.module("app").controller("DetailViewController", function($scope, $state, $stateParams, cardsResponse) {

  var cards = cardsResponse.data.cards;

  $scope.$on('$stateChangeSuccess', function() {
    $scope.card = _(cards).findWhere({id: parseInt($stateParams.id,10)});
  });

  $scope.isDetailState = function() {
    return $state.is('cards.detail');
  };

  $scope.hide = function() {
    $state.go('cards');
  };

});
angular.module("app").controller('CardsController', function($scope, $rootScope, $state, CardFilter, cardsResponse) {
	var cards = cardsResponse.data.cards;
	
	$scope.heroFilters = CardFilter.heroFilters;
	$scope.manaFilters = CardFilter.manaFilters;
	$scope.currentManaFilter = 'all';
	$scope.currentHeroFilter = 'neutral';
	$scope.currentPage = 0;
	$scope.totalPages = 0;

	function renderFilteredCards() {
		var pages = CardFilter.filterCards(cards, $scope.currentManaFilter, $scope.currentHeroFilter);
		$scope.totalPages = pages.length;
		$scope.cards = pages[$scope.currentPage];
	}
	
	$scope.detailViewFor = function(card) {
		$state.go('cards.detail', {id: card.id});
	};
  
	$scope.setHeroFilter = function (hero) {
		$scope.currentPage = 0;
		$scope.currentHeroFilter = hero.value;
	}
	
	$scope.setManaFilter = function (mana) {
		$scope.currentPage = 0;
		$scope.currentManaFilter = mana;
	}
	
	$scope.nextPage = function() {
		$scope.currentPage += 1;
	};
	$scope.previousPage = function() {
		$scope.currentPage -= 1;
	};
	
	$scope.canGoNext = function() {
		return $scope.currentPage < $scope.totalPages - 1;
	};
	$scope.canGoPrevious = function() {
		return $scope.currentPage > 0;
	};
	$scope.$watchGroup(['currentManaFilter', 'currentHeroFilter', 'currentPage'],renderFilteredCards);
});