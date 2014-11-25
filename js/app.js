/**
 * AngularJS application
 * Displays the latest 10 last Yahoo pipes news items
 * @author Elvin Fortes - FortesGlobalWeb.nl
 */
(function() {	
	//Main module
	var App = angular.module("app", ["ngRoute", "News"]);	
	
	//Set config
	App.constant("Config", {
        "apiUrl": 'http://pipes.yahoo.com/pipes/pipe.run?_id=DqsF_ZG72xGLbes9l7okhQ&_render=json&_callback=JSON_CALLBACK'
    });
	
	//Init main app controller
	App.controller("MainCtrl", function($scope) {		
		$scope.title = "Loading...";
		$scope.pubDate = "";
		$scope.description = "";		
		$scope.$on('newsloaded', function(event, data) {
			$scope.title = data.title;
			$scope.pubDate = data.pubDate;
			$scope.description = data.description;
		});
	});
		
	//Define application routes
	App.config(['$routeProvider', function($routeProvider) {		
		$routeProvider.when('/news', {
			templateUrl : 'partials/news.html',
			controller : 'NewsCtrl'
		}).otherwise({
			redirectTo : '/news'
		});
	}]);
})();

