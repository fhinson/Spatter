angular.module('spatter.controllers')

.controller('WelcomeCtrl', function($scope){

  // StatusBarService.toggle("hide");

  var loadWelcome = function(){
    setTimeout(function(){
      $(".logo").addClass("animated fadeInDown");
      $(".logo").show();
    }, 400);

    setTimeout(function(){
      $(".button-section").addClass("animated fadeInUp");
      $(".button-section").show();
    }, 1000);
  }

  loadWelcome();
  $scope.striggered = false;
  $scope.ltriggered = false;
  $scope.shouldHide = true;

  function removeWelcomeClasses(){
    $(".logo, .button-section")
    .removeClass("animated fadeInUp fadeInDown fadeOut fadeOutUp fadeOutDown");
  }

  var hideWelcome = function(){
    $(".logo, .button-section").each(function(){
      $(this).css({
        '-webkit-animation-duration': '0.2s',
        '-webkit-animation-delay': '0s',
        'animation-duration': '0.2s',
        'animation-delay': '0s'
      });
    });
    $(".logo").addClass("animated fadeOutUp");
    $(".logo").hide();
    $(".button-section").addClass("animated fadeOutDown");
    $("#welcome-start").addClass("blurred");

  }

  $scope.getStarted = function(){
    $("#signup").removeClass("animated zoomOut");
    hideWelcome();
    $("#signup").addClass("animated zoomIn");
    $("#signup").show();
    $(".go-back").removeClass("animated fadeOut");
    $(".go-back").addClass("animated fadeIn");
    $(".go-back").show();
  }

  $scope.showLogin = function(){
    $("#login").removeClass("animated zoomOut");
    hideWelcome();

    $("#login").addClass("animated zoomIn");
    $("#login").show();
    $(".go-back").removeClass("animated fadeOut");
    $(".go-back").addClass("animated fadeIn");
    $(".go-back").show();
  }

  $scope.goBack = function(){
    if($scope.striggered == true || $scope.ltriggered == true){
      $(".s-guiding-text, .s-facebook-button, .l-guiding-text, .l-facebook-button").show();
      $(".l-hidden-field, .s-hidden-field").hide();
      $scope.shouldHide = true;
      $scope.striggered = false;
      $scope.ltriggered = false;
    }
    else{
      removeWelcomeClasses();
      $(".logo").addClass("animated fadeInDown");
      $(".logo").show();
      $(".button-section").addClass("animated fadeInUp");
      $(".button-section").show();
      $("#login, #signup").addClass("animated zoomOut");
      $("#login, #signup").hide();
      $(".go-back").removeClass("animated fadeIn");
      $(".go-back").addClass("animated fadeOut");
      $(".go-back").show();
    }
  }

  $scope.striggerItem = function(){
    if($scope.striggered == false){
      $scope.striggered = true;
      $(".s-guiding-text, .s-facebook-button").hide();
      $(".s-hidden-field").addClass("animated fadeInUp");
      $(".s-hidden-field").show();
      $scope.shouldHide = false;
    }
  }

  $scope.ltriggerItem = function(){
    if($scope.ltriggered == false){
      $scope.ltriggered = true;
      $(".l-guiding-text, .l-facebook-button").hide();
      $(".l-hidden-field").addClass("animated fadeInUp");
      $(".l-hidden-field").show();
      $scope.shouldHide = false;
    }
  }
});
