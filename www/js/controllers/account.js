angular.module('spatter.controllers')

.controller('AccountCtrl', function($scope, Users) {
  Users.getUser(1).then(function(response){
    $scope.user = response;
  });

  $scope.settings = {
    enableFriends: true
  };
});
