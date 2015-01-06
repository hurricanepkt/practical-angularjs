//<custom element> E 
//div custom-attribute A 
//<div class="custom class-behaviour"> M
// <!-- stom-comment-behavio -->  M

angular.module("app").directive("blursIfStateIsDetailed", function($state) {
	return {
		restrict : 'A',
		link : function (scope, element, attributes, controller) {
			scope.$on('$stateChangeSuccess', function () {
					element.toggleClass('blurred', $state.is('cards.detail'));
			});


			
		}
	};
});