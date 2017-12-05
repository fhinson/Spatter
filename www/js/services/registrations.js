angular.module('spatter.services')

.service('RegistrationsService', function($q, RegistrationsDataService, Users, $localstorage){
  return{
    signupUser: function(email, password){
      var deferred = $q.defer();
      var promise = deferred.promise;

      RegistrationsDataService.signup({user: {email:email, password:password}})
      .$promise.then(function(data){
        // store user id and auth token in localstorage
        $localstorage.setObject('userID', data.id);
        $localstorage.setObject('mobileToken', data.mobile_token);

        // get user's data and tactic and store it
        Users.get({user: $localstorage.getObject('userID'), mobile_token: $localstorage.getObject('mobileToken')})
        .$promise.then(function(data) {
          $localstorage.setObject('User', data);
          deferred.resolve('Welcome!');
        });
      }, function(err){
        deferred.reject(err.data.errors);
      })

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.factory('RegistrationsDataService', function($resource, ServerUrl){
  return data = $resource(ServerUrl + '/users.json', {format: 'json'}, {
    signup   : { method: 'POST', params: {user: '@user'}, isArray: false},
  });
});
