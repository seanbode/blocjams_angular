angular
  .module('blocJams')
  .controller('AlbumCtrl', function($scope, Fixtures, SongPlayer) {
    $scope.currentAlbum = angular.copy(Fixtures.getAlbum()),
    $scope.songPlayer = SongPlayer;
    //  .controller('AlbumCtrl', function(Fixtures) {
    //      this.albumData = angular.copy(albumPicasso);
    //  }
  });
