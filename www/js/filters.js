angular.module('spatter.filters', [])

.filter('gameFormat', function(){
  return function(game){
    return game.team2_city + " " + game.team2_name + " at " + game.team1_city + " " + game.team1_name;
  }
})

.filter('imgFormat', function(){
  return function(game){
    return "img/" + game.team1_city.replace(/\s+/g, '-').toLowerCase() + "-" + game.team1_name.replace(/\s+/g, '-').toLowerCase() + ".png";
  }
})

.filter('dateFormat', function(){
  return function(date){
    var myTimezone = "America/New_York";
    return moment(date).tz(myTimezone).format('ha z');
  }
})
