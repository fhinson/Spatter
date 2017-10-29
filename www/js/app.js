angular.module('spatter', ['ionic', 'spatter.controllers', 'spatter.services', 'spatter.filters', 'spatter.directives'])

.run(function($ionicPlatform, $http, $localstorage, $rootScope) {
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

    var getGames = function(){
      return $http.get('http://spatter-api.dev/todays_games')
        .then(function(response) {
          // response
          return response.data;
        }, function(response) {
          // response
          console.log(response);
      });
    }

    getGames().then(function(response){
      $localstorage.setObject('games', response);
      $rootScope.$broadcast('gamesRetrieved', response);
    })

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.games', {
      url: '/games',
      views: {
        'tab-games': {
          templateUrl: 'templates/tab-games.html',
          controller: 'GamesCtrl'
        }
      }
    })
    .state('tab.game-detail', {
      url: '/games/:gameId',
      views: {
        'tab-games': {
          templateUrl: 'templates/game-detail.html',
          controller: 'GameDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/games');

});
