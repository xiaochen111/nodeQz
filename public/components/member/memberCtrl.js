angular.module('myApp').controller('memberCtrl', ['$rootScope', '$scope', '$http', '$state',
	function($rootScope, $scope, $http,$state) {

	console.log('欢迎来到个人中心！！！')
	$scope.userInfo = {};
	$http({
		method: 'post',
		url: '/memberPost'
	}).then(function(res) {
		console.log(res)
		$scope.userInfo = res.data[0];
	})



	$scope.note = {}
	$scope.submit = function(){
		$http({
			method: 'post',
			url: '/doNote',
			params:{
		    	title:$scope.note.title,
		    	content:$scope.note.content
		    }
		}).then(function(res) {
			console.log(res)
			alert(res.data);
			$state.go('index')
		})
	}


}])