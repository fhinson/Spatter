angular.module('spatter.services')

// handles session login, facebook login, and logout
.service('SessionsService', function($q, SessionDataService, $localstorage, Users /*NotificationsService*/) {
  return {
    loginUser: function(email, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      SessionDataService.login({user: {email:email, password:password}})
      .$promise.then(function(data) {
        // store user id and auth token in localstorage
        $localstorage.setObject('userID', data.id);
        $localstorage.setObject('mobileToken', data.mobile_token);

        Users.get({user: $localstorage.getObject('userID'), mobile_token: $localstorage.getObject('mobileToken')})
        .$promise.then(function(data) {
          $localstorage.setObject('User', data);
          deferred.resolve('Welcome!');
        });
      }, function(err){
        deferred.reject('Invalid Username or Password');
      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    },

    // clear userID, mobileToken, and User data
    logoutUser: function(){
      $localstorage.removeObject('userID');
      $localstorage.removeObject('mobileToken');
      $localstorage.removeObject('User');
    },

    isLoggedIn: function(){
      return ((typeof ($localstorage.getObject('userID')) == 'number')
            && $.isEmptyObject($localstorage.getObject('mobileToken')) == false
            && $.isEmptyObject($localstorage.getObject('User')) == false);
    }
  }
})

// handles getting and posting necessary session data
.factory('SessionDataService', function($resource, ServerUrl){
  return data = $resource(ServerUrl + '/users/sign_in.json', {format: 'json'}, {
    login : { method: 'POST', params: {user: '@user'}, isArray: false},
  });
});
