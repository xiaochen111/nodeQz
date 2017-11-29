angular.module('myApp').controller('indexCtrl', ['$rootScope','$scope','$http', function($rootScope,$scope,$http){
	
	console.log('欢迎来到首页！！！')

	$http({
		url:'/showNote',
		method:'post'
	}).then(function(res){
		console.log(res)
		$scope.list = res.data;
	})

}])