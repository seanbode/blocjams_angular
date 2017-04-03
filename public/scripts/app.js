angular
  .module('blocJams', ['ui.router'])
  .config(function($stateProvider, $locationProvider) {
    $stateProvider
      .state('landing', {
          url: '/',
          controller: 'LandingCtrl as landing',
          templateUrl: '/templates/landing.html'
      })
      .state('album', {
           url: '/album',
           templateUrl: '/templates/album.html'
       })
       .state('collection', {
          url: '/collection',
          controller: 'CollectionCtrl as collection',
          templateUrl: '/templates/collection.html'
       })
       .state('metrics', {
          url: '/metrics',
          templateUrl: '/templates/metrics.html'
       });
  });
