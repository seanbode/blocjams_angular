angular
  .module('blocJams')
  .controller('CollectionCtrl', function($scope, Fixtures) {
    $scope.albums = [];
    for (var i=0; i < 12; i++) {
      $scope.albums.push(angular.copy(Fixtures.getAlbum()));
    }
  });
