(function() {
  function Metrics($rootScope, $window) {
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
          plays.push(songObj);
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
    }
  }
  angular.module ('blocJams').service('Metrics', Metrics);
})();
