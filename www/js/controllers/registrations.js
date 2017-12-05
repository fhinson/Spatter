angular.module('spatter.controllers')

.controller('RegistrationsCtrl', function($scope, RegistrationsService, $ionicPopup, $state, $localstorage){
  $scope.data = {};
  $scope.loadingSignup = false;

  var errorFormatter = function(data){
    var errorString = "";
    for(var i = 0; i < data.length; i++){
      errorString += data[i];
      if(i < data.length-1)
        errorString += "<br><br>";
    }
    return errorString;
  }

  $scope.signup = function(){
    if(window.plugins){
      cordova.plugins.Keyboard.close();
    }
    if($scope.loadingSignup == false){
      $scope.loadingSignup = true;
      RegistrationsService.signupUser($scope.data.email, $scope.data.password)
      .success(function(data) {
        $scope.loadingSignup = false;
        $state.go('games');
      }).error(function(data) {
        $scope.loadingSignup = false;
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: errorFormatter(data)
        });
      });
    }
  }

})
