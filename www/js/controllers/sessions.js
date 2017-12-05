angular.module('spatter.controllers')

.controller('SessionsCtrl', function(ServerUrl, $scope, $ionicPopup, $state, SessionsService, $http) {
  $scope.data = {};
  $scope.loadingLogin = false;

  // login function querying SessionsService
  $scope.login = function() {
    if(window.plugins){
      cordova.plugins.Keyboard.close();
    }
    if($scope.loadingLogin == false){
      $scope.loadingLogin = true;
      SessionsService.loginUser($scope.data.email, $scope.data.password)
      .success(function(data) {
        $scope.loadingLogin = false;
        if(ionic.Platform.isAndroid() == false){
          // StatusBarService.toggle('show');
        }
        $state.go('games');
      }).error(function(data) {
        $scope.loadingLogin = false;
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: data
        });
      });
    }
  };
});
