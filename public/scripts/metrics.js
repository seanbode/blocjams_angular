(function() {
  function Metric($rootScope, $window) {
    if (!$window.localStorage.getItem("songPlays")) {
      $window.localStorage.songPlays = JSON.stringify([]);
    };

    return {
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        // Add time to event register// moment.js
        if (songObj != undefined) {
          songObj['playedAt'] = new Date()
        var plays = JSON.parse($window.localStorage.songPlays)
        plays.push(songObj)
        $window.localStorage.songPlays = JSON.stringify(plays)
        };

      },
      listSongsPlayed: function() {
        var songs = [];
        angular.forEach(JSON.parse($window.localStorage.songPlays), function(song) {
            songs.push(song.title);
        });
        return songs;
      }
    };
  }

angular
    .module('blocJams')
    .controller('MetricController', function ($scope, $rootScope, Metric) {
      $scope.metric = Metric
      $scope.buttonCallback = function() {
        alert("button clicked");
        Metrics.listSongsPlayed()
      };
    })
    .service('Metric', Metric);
})();
