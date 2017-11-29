angular.module('myApp').controller('registCtrl', ['$scope','$http', '$state',function($scope,$http,$state){
	console.log('regist')


	$scope.btnFn = function(){
		$http({  
    	method:'post',  
	    url:'/registPost',
	    params:{
	    	username:$scope.username,
	    	pw:$scope.pw
	    }  
		}).then(function(res){  
		    console.log(res)
		    if(res.data == '1'){
		    	alert('注册成功！')
		    	$state.go('login')
		    }else if(res.data == '2'){
		    	alert('用户名已存在')
		    }
		}) 
	}

}])