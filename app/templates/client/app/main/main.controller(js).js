'use strict';

angular.module('<%= scriptAppName %>')
  .controller('MainCtrl', function ($scope, $http<% if(filters.socketio) { %>, socket<% } %>) {
    $scope.awesomeThings = [];

    $http.get('/api/things').then(
      // success function
      function(awesomeThings) {
        $scope.awesomeThings = awesomeThings.data;<% if(filters.socketio) { %>
          socket.syncUpdates('thing', $scope.awesomeThings);<% } %>
      },
      // catch error
      function(err) {
        // do something with error
        // console.log(err);
      });

    $scope.getColor = function($index) {
      var _d = ($index + 1) % 11;
      var bg = '';

      switch(_d) {
        case 1:       bg = 'red';         break;
        case 2:       bg = 'green';       break;
        case 3:       bg = 'darkBlue';    break;
        case 4:       bg = 'blue';        break;
        case 5:       bg = 'yellow';      break;
        case 6:       bg = 'pink';        break;
        case 7:       bg = 'darkBlue';    break;
        case 8:       bg = 'purple';      break;
        case 9:       bg = 'deepBlue';    break;
        case 10:      bg = 'lightPurple'; break;
        default:      bg = 'yellow';      break;
      }

      return bg;
    };

    $scope.getSpan = function($index) {
      var _d = ($index + 1) % 11;

      if (_d === 1 || _d === 5) {
        return 2;
      }
    };
<% if(filters.mongoose) { %>
    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };<% } %><% if(filters.socketio) { %>

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });<% } %>
  });
