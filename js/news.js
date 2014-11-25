/**
 * News module
 * @author Elvin Fortes - FortesGlobalWeb.nl
 */
(function() {	
	
	//Create the module
	var News = angular.module("News", ["app"]);
	
	//Init main controller
	News.controller("NewsCtrl", function($scope, $rootScope, NewsCollection) {		
		$scope.items = [];	
		$scope.isLoading = true;	
		
		//Show or hide the description
		$scope.show = function(item) {
			if (item.showSummary) {
				item.showSummary = false;
			} else {
				item.showSummary = true;
			}
		};
		
		//Get the news items
		NewsCollection.fetchAll(function(data) {
			if (!data.value) {
				return;
			}
			
			//Send news received event
			$rootScope.$broadcast('newsloaded', {
				title: data.value.title,
				pubDate: data.value.pubDate,
				description: data.value.description			
			});
			
			//Strip HTML
			var strip = function(html) {
			   var tmp = document.createElement("DIV");
			   tmp.innerHTML = html;
			   return tmp.textContent || tmp.innerText || "";
			};
			
			//Format the data to display
			var allItems = data.value.items;				
			if (allItems.length > 0) {
				var items = allItems.slice(0, 9);
				var total = items.length;
				for (var i = 0; i < total; i++) {
					var item = items[i];
					
					var image = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRvQMrLAbbhT93EsGzDkOxI_7QvCGAO7T2mwTZZLywKmfGBgMogjGcvEA";
					if (item["media:content"]) {
						image = item["media:content"].url;
					}
					
					//Add news items
					$scope.items.push({
						"title": item.title,
						"summary": strip(item.description),
						"url": item.link,
						"image": image,
						"showSummary": false
					});
				}
				
				//Disable loading
				$scope.isLoading = false;
			}
		}, function() {
			//TODO error handling
		});
	});
	
	//News service
	News.service("NewsCollection", function($http, Config) {
		this.fetchAll = function (success, fail) {
			$http.jsonp(Config.apiUrl).success(function(data) {
				success(data);
			}).error(function(data) {
				fail(data);
			});	
		};		
	});
})();