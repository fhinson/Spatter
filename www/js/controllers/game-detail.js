angular.module('spatter.controllers')

.controller('GameDetailCtrl', function($scope, $stateParams, $timeout, $ionicScrollDelegate, $localstorage, $rootScope, Users, Games) {
  $scope.game = Games.get($stateParams.gameId);
  console.log($scope.game);

  $scope.user = JSON.parse($localstorage.get('User'));

  $scope.hideTime = false;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  var commenterColors = [
    "#E74C3C",
    "#9B59B6",
    "#2980B9",
    "#E67E22",
    "#2ECC71",
    "#F39C12",
    "#16A085",
    "#F30DFF",
    "#2C3E50",
    "#27AE60",
    "#3498DB",
    "#C0392B",
    "#D35400",
    "#F1C40F",
    "#1ABC9C",
    "#34495E",
    "#8E44AD",
  ];

  var updateLocalstorageUser = function(){
    $localstorage.setObject('User', $scope.user);
  }

  $scope.getUserAvatar = function(comment){
    var userIds = $scope.comments.map(a => a.user_id);
    var presentUserId = comment.user_id;
    var userIndex = userIds.indexOf(presentUserId);
    var userAvatar = "img/defaults/" + (userIndex+1).toString() + ".svg";
    return userAvatar;
  }

  $scope.getUserColor = function(comment){
    var userIds = $scope.comments.map(a => a.user_id);
    var presentUserId = comment.user_id;
    var userIndex = userIds.indexOf(presentUserId);
    var userColor = commenterColors[userIndex];
    return userColor;
  }

  $scope.sendComment = function() {
    var d = new Date();

    $scope.tempComment = {
      user_id: $scope.user.id,
      comment: $scope.data.comment,
      upvotes: 0,
      downvotes: 0,
      created_at: d
    };

    $scope.noComments = false;

    $scope.comments.push($scope.tempComment);

    Games.addComment($stateParams.gameId, $scope.user.id, $scope.data.comment).then(function(response){
      $scope.tempComment.id = response;
    });

    delete $scope.data.comment;
    $ionicScrollDelegate.scrollBottom(true);
  };

  $scope.upvoteComment = function(comment){
    if($scope.isUpvoted(comment)){
      $scope.unUpvoteComment(comment);
    }
    else{
      if($scope.isDownvoted(comment)){
        $scope.unDownvoteComment(comment);
      }
      comment.upvotes++;
      if($scope.user.upvoted_comments == null){
        $scope.user.upvoted_comments = [comment.id];
      }
      else{
        $scope.user.upvoted_comments.push(comment.id);
      }
      Games.upvoteComment(comment, $scope.user);
    }
    updateLocalstorageUser();
  }

  $scope.downvoteComment = function(comment){
    if($scope.isDownvoted(comment)){
      $scope.unDownvoteComment(comment);
    }
    else{
      if($scope.isUpvoted(comment)){
        $scope.unUpvoteComment(comment);
      }
      comment.downvotes++;
      if($scope.user.downvoted_comments == null){
        $scope.user.downvoted_comments = [comment.id];
      }
      else{
        $scope.user.downvoted_comments.push(comment.id);
      }
      Games.downvoteComment(comment, $scope.user);
    }
    updateLocalstorageUser();
  }

  $scope.unUpvoteComment = function(comment){
    comment.upvotes--;
    var index = $scope.user.upvoted_comments.indexOf(comment.id);
    if (index > -1) {
      $scope.user.upvoted_comments.splice(index, 1);
    }
    Games.unUpvoteComment(comment, $scope.user);
    updateLocalstorageUser();
  }

  $scope.unDownvoteComment = function(comment){
    comment.downvotes--;
    var index = $scope.user.downvoted_comments.indexOf(comment.id);
    if (index > -1) {
      $scope.user.downvoted_comments.splice(index, 1);
    }
    Games.unDownvoteComment(comment, $scope.user);
    updateLocalstorageUser();
  }

  $scope.isUpvoted = function(comment){
    if($scope.user.upvoted_comments == null) return "";
    return $scope.user.upvoted_comments.indexOf(comment.id) !== -1 ? "upvoted" : "";
  }

  $scope.isDownvoted = function(comment){
    if($scope.user.downvoted_comments == null) return "";
    return $scope.user.downvoted_comments.indexOf(comment.id) !== -1 ? "downvoted" : "";
  }

  $scope.flagComment = function(comment){
    comment.flags++;
    if($scope.user.flagged_comments == null){
      $scope.user.flagged_comments = [comment.id];
    }
    else{
      $scope.user.flagged_comments.push(comment.id);
    }
    Games.flagComment(comment, $scope.user);
    updateLocalstorageUser();
  }

  $scope.isFlagged = function(comment){
    if($scope.user.flagged_comments == null) return "";
    return $scope.user.flagged_comments.indexOf(comment.id) !== -1 ? "flagged" : "";
  }


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.comments = [];
  $scope.tempComment = {};
  $scope.commentsLoaded = false;
  $scope.noComments = false;
  Games.getComments($stateParams.gameId).then(function(response){
    $scope.comments = response;
    $scope.commentsLoaded = true;
    if($scope.comments.length == 0){
      $scope.noComments = true;
    }
    $ionicScrollDelegate.scrollBottom(true);
  });

  $scope.doRefresh = function() {
    Games.getComments($stateParams.gameId).then(function(response){
      $scope.comments = response;
      $scope.$broadcast('scroll.refreshComplete');
      if($scope.comments.length == 0){
        $scope.noComments = true;
      }
    });
  };
});
