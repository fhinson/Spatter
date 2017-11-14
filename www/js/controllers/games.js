angular.module('spatter.controllers')

.controller('GamesCtrl', function($scope, Games, $rootScope, $localstorage) {
  $scope.games = Games.get();
  $scope.gamesLoaded = false;
  $scope.noGames = false;

  $rootScope.$on('gamesRetrieved', function(event, response){
    $scope.games = response;
    $scope.gamesLoaded = true;
    if($scope.games.length == 0){
      $scope.noGames = true;
    }
  });

  $rootScope.$on('userRetrieved', function(event, response){
    $scope.user = response;
  });

  $scope.remove = function(game) {
    Games.remove(game);
  };

  $scope.doRefresh = function() {
    Games.getAll().then(function(response){
      $localstorage.setObject('games', response);
      $scope.games = response;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
});
