
var globalCtrl = angular.module('eleme.page', [])
  .run(/* ngInject */ function($rootScope) {
    $rootScope.yoo = 'yes! this data is muti-bind in globalCtrl';
  });

module.exports = globalCtrl;
