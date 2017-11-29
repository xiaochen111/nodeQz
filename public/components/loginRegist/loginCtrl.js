angular.module('myApp').controller('loginCtrl', ['$rootScope','$scope','$http','$state',
    function($rootScope,$scope,$http,$state){
	console.log('login')


	$scope.btnFn = function(){
		$http({  
    	method:'post',  
	    url:'/loginPost',
	    params:{
	    	username:$scope.username,
	    	pw:$scope.pw
	    }  
		}).then(function(res){  
		    console.log(res)
		    let obj = res.data;
		    if(obj.data == '1'){
		    	alert('登录成功！')
		    	localStorage.setItem('name', obj.username);
		    	$scope.$emit('name','冒泡到父元素')
		    	$state.go('index')
		    }else{
		    	alert('登录失败！')
		    }
		}) 
	}

}])