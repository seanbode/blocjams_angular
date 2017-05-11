angular
  .module('blocJams', ['ui.router'])
  .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
          url: '/',
          controller: 'LandingCtrl as landing',
          templateUrl: '/templates/landing.html'
      })
      .state('album', {
           url: '/album',
           controller: 'AlbumCtrl',
           templateUrl: '/templates/album.html'
       })
       .state('collection', {
          url: '/collection',
          controller: 'CollectionCtrl',
          templateUrl: '/templates/collection.html'
       })
       .state('metrics', {
          url: '/metrics',
          controller: 'MetricsCtrl',
          templateUrl: '/templates/metrics.html'
       });
    $urlRouterProvider.otherwise('/');
  });
