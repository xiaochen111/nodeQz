var app = angular.module('myApp',["ui.router","oc.lazyLoad"]);

app.controller('headCtrl', ['$rootScope','$scope','$http', function($rootScope,$scope,$http){
	
	$scope.name = localStorage.getItem('name');
	$rootScope.$on('name',function(){
		$scope.name = localStorage.getItem('name');
	})

}]);

app.controller('footCtrl', ['$scope', function($scope){
	$scope.name = 'foot';
}])