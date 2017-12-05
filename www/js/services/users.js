angular.module('spatter.services')

// .factory('Users', function($http, ServerUrl, $localstorage){
//   var getUser = function(userId){
//     return $http({
//       url: ServerUrl + '/get_user',
//       method: "GET",
//       params: {user_id: userId}
//     }).then(function(response) {
//         // response
//         // console.log(response.data);
//         return response.data;
//       }, function(response) {
//         // response
//         console.log(response);
//     });
//   }

//   return{
//     getUser: function(userId){
//       return getUser(userId);
//     },
//     get: function(){
//       return $localstorage.getObject('user');
//     }
//   }
// });

// ngResource to manage http requests for user data
.factory('Users', function ($resource, ServerUrl) {
  return data = $resource(ServerUrl + '/users/:user/:path', {user: '@user', mobile_token: '@mobile_token', format: 'json'}, {
    get      : { method: 'GET', params: {path: ''}, isArray: false },
  });
});
