
angular.module('demo', [
  'ngRoute',
  require('./components/global').name
  ])
  .config(
    /* @ngInject */function($routeProvider, $locationProvider) {
    // 对前端router的配置
    $locationProvider.html5Mode(true);
    // example: 当在根目录时，跳转到/place
    $routeProvider.when('/', {redirectTo: '/place'});
    // example: 当在/place是，绑定其模板和controller
    $routeProvider.when('/place', require('./components/place/place'));
    $routeProvider.otherwise({ redirectTo: '/404' });
  });
