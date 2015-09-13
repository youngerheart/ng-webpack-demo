require('./place.html');
require('./place.css');

var placeCtrl = /* @ngInject */function($scope) {
  $scope.hehe = 'yes! this data is muti-bind in placeCtrl';
};

// router的两个参数，放在module的对象中
module.exports = {
  templateUrl: '/static/components/place/place.html',
  controller: placeCtrl
};
