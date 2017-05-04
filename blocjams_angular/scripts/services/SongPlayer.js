(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

    var currentAlbum = SongPlayer.currentAlbum = Fixtures.getAlbum();

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (SongPlayer.currentBuzzObject) {
        SongPlayer.currentBuzzObject.setTime(time);
      }
    };

    SongPlayer.currentSong = null;
    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    SongPlayer.currentBuzzObject = null;
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (song == null) {
        setSong(SongPlayer.currentAlbum.songs[0])
      } else if (SongPlayer.currentSong != song) {
        if (SongPlayer.currentBuzzObject) {
          SongPlayer.currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        }

        SongPlayer.currentSong = song;
        SongPlayer.currentBuzzObject = new buzz.sound(SongPlayer.currentSong.audioUrl, {
          formats: ['mp3'],
          preload: true
        });

        SongPlayer.currentBuzzObject.bind('timeupdate', function() {
          $rootScope.$apply(function() {
            SongPlayer.currentTime = SongPlayer.currentBuzzObject.getTime();
          });
        });


        SongPlayer.currentSong = song;
        SongPlayer.currentBuzzObject.play();
        SongPlayer.currentSong.playing = true;
      } else if (SongPlayer.currentSong === song) {
        if (SongPlayer.currentBuzzObject && SongPlayer.currentBuzzObject.isPaused()) {
          SongPlayer.currentBuzzObject.play();
          SongPlayer.currentSong.playing = true;
        }
      }
    };

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      setSong(song);
      SongPlayer.currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    };
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      SongPlayer.currentBuzzObject.pause();
      SongPlayer.currentSong.playing = false;
    };

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        SongPlayer.currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        SongPlayer.play(song);
      }
    };

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      ++currentSongIndex;
      currentSongIndex = currentSongIndex%SongPlayer.currentAlbum.songs.length
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      SongPlayer.play(song);
    }

    return SongPlayer;
  }
  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
