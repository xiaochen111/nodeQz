angular.module('myApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise("index");
		$stateProvider
		.state('regist',{
			url:'/regist',  // '/'一定要写
			templateUrl: '/components/loginRegist/regist.html',
            controller: "registCtrl",
            resolve:{
            	deps: ['$ocLazyLoad', function($ocLazyLoad) {
            		return $ocLazyLoad.load({
            			files: [
		                    '/components/loginRegist/registCtrl.js' 
		                ]
            		})
            	}]
            }
		})	
		.state('login',{
			url:'/login',  
			templateUrl: '/components/loginRegist/login.html',
            controller: "loginCtrl",
            resolve:{
            	deps: ['$ocLazyLoad', function($ocLazyLoad) {
            		return $ocLazyLoad.load({
            			files: [
		                    '/components/loginRegist/loginCtrl.js' 
		                ]
            		})
            	}]
            }
		})
		.state('index',{
			url:'/index',  
			templateUrl: '/components/index/index.html',
            controller: "indexCtrl",
            resolve:{
            	deps: ['$ocLazyLoad', function($ocLazyLoad) {
            		return $ocLazyLoad.load({
            			files: [
		                    '/components/index/indexCtrl.js' 
		                ]
            		})
            	}]
            }
		})
		.state('member',{ //个人中心
			url:'/member',  
			templateUrl: '/components/member/member.html',
            controller: "memberCtrl",
            resolve:{
            	deps: ['$ocLazyLoad', function($ocLazyLoad) {
            		return $ocLazyLoad.load({
            			files: [
		                    '/components/member/memberCtrl.js' 
		                ]
            		})
            	}]
            }
		})

	
}])