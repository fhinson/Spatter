angular.module('spatter', ['ionic', 'spatter.controllers', 'spatter.services', 'spatter.filters', 'spatter.directives'])

.run(function($ionicPlatform, $http, $localstorage, $rootScope, ServerUrl, Games, Users) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Users.getUser(1).then(function(response){
      $localstorage.setObject('user', response);
      $rootScope.$broadcast('userRetrieved', response);
    });

    Games.getAll().then(function(response){
      $localstorage.setObject('games', response);
      $rootScope.$broadcast('gamesRetrieved', response);
    })

  });
})

.constant('ServerUrl', 'http://spatter-api.herokuapp.com')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('games', {
    url: '/games',
    templateUrl: 'templates/tab-games.html',
    controller: 'GamesCtrl'
  })
  .state('game-detail', {
    url: '/games/:gameId',
    templateUrl: 'templates/game-detail.html',
    controller: 'GameDetailCtrl'
  })
  .state('account', {
    url: '/account',
    templateUrl: 'templates/tab-account.html',
    controller: 'AccountCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/games');

});

// declare controllers module
angular.module('spatter.controllers', []);

// declare services module
angular.module('spatter.services', []);

// declare directives module
angular.module('spatter.directives', []);

// declare filters module
angular.module('spatter.filters', []);
