angular
  .module('blocJams')
  .controller('MetricsCtrl', function ($scope, $rootScope, Metrics) {
    $scope.metric = { chart: Metrics.chart }
    $scope.buttonCallback = function() {
      alert("button clicked");
      Metrics.listSongsPlayed()
    };
    $scope.data = [
      {song: "blue", plays: 5 }
    ]
  });
