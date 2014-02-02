var app = angular.module('beginnersTutorialApp', ['ariIframe', 'ngNewsletter']);

app.run(['$rootScope', function($rootScope) {
  $rootScope.aPersonsname = "Ari Lerner";
}]);

app.directive('inThisSeries', [function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      prev: '@',
      next: '@',
      description: '@'
    },
    template: '<div class="related">' +
                '<div class="previous">' +
                  '<a ng-show="prev" href="{{ previousLink }}">Previous in series</a>' +
                  '<div ng-hide="prev" class="prev-empty">&nbsp;</div>' +
                '</div>' +
                '<div class="description">' +
                  '<span>{{ description }}</span>' +
                '</div>' +
                '<div ng-show="next" class="next">' +
                  '<a href="{{ nextLink }}">Next in series</a>' +
                  '<div ng-hide="next" class="empty">&nbsp;</div>' +
                '</div>' +
              '</div>',
    link: function(scope, el, attrs) {
      scope.previousLink = attrs.prev;
      scope.nextLink = attrs.next;
    }
  }
}]);

app.directive('ngLiveResult', ['$parse', '$filter', function($parse, $filter) {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="code_with_result">' +
              '<input type="text" ng-model="ngModel" placeholder="{{ ngPlaceholder }}" />' +
              '<pre class="syntax-highlight result">= {{ result }}</pre></div>' +
              '</div>',
    link: function(scope, el, attrs) {
      scope.$watch('ngModel', function(v) {
        if (v === undefined) {
          scope.ngModel = '2 + 1';
        } else {
          try {
            scope.result = $parse(v)(scope);
          } catch (err) {}
        }
      });
    }
  }
}]);

app.controller('PlayerController1', ['$scope', function($scope) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = '/media/npr.mp4';
  $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply($scope.stop());
  });
}]);

app.controller('DemoController1', ['$scope', function($scope) {
  $scope.person = {
    name: 'Ari Lerner'
  };

  $scope.testExpression = "2 + 1";

  $scope.sayHello = function() {
    alert("hello!");
  };

  var updateClock = function() {
      $scope.clock = new Date();
    };
    var timer = setInterval(function() {
      $scope.$apply(updateClock);
    }, 1000);
    updateClock();
}]);

app.controller('SimpleAddingController', ['$scope', function($scope) {
  $scope.count = 1;
  $scope.add = function(amount) { $scope.count += amount; };
  $scope.subtract = function(amount) { $scope.count -= amount; };
}]);

app.controller('SimpleAjaxController', ['$scope', '$http', function($scope, $http) {
  $scope.beers = [];

  $scope.makeRequest = function() {
    $http({
      method: 'JSONP',
      url: 'http://api.openbeerdatabase.com/v1/beers.json?callback=JSON_CALLBACK'
    }).success(function(data, status, headers, config) {
      $scope.beers = data;
    }).error(function(data, status, headers, config) {
    });
  }
}]);

app.controller('ParentController', ['$scope', function($scope) {
    $scope.person = {greeted: false};
}]);

app.controller('ChildController', ['$scope', function($scope) {
  $scope.sayHello = function() {
    $scope.person.greeted = true;
  };
  $scope.reset = function() { $scope.person.greeted = false; }
}]);

app.controller('LoopController', ['$scope', function($scope) {
  $scope.items = [
    { name: 'Ari'},
    { name: 'Q'},
    { name: 'Sean'},
    { name: 'Anand'}
  ];

  $scope.people = {
    'Ari': 'orange',
    'Q': 'blue',
    'Sean': 'green'
  };
}]);

app
  .factory('githubService1', ['$http', function($http) {
    var doRequest = function(username, path) {
      return $http({
        method: 'JSONP',
        url: 'https://api.github.com/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
      });
    }

    return {
      events: function(user) { return doRequest(user, 'events'); }
    };
  }]);

app
  .factory('githubService2', ['$http', function($http) {
    var _username;

    var doRequest = function(path) {
      return $http({
        method: 'JSONP',
        url: 'https://api.github.com/users/' + _username + '/' + path + '?callback=JSON_CALLBACK'
      });
    }

    return {
      events: function() { return doRequest('events'); },
      setUsername: function(username) { _username = username; }
    };
  }]);

app.controller('ServicesDemoController', ['$scope', '$timeout', 'githubService1', 'githubService2',
    function($scope, $timeout, githubService1, githubService2) {

    var timeout;
    $scope.$watch('username', function(newVal) {
      if (newVal) {
        if (timeout) $timeout.cancel(timeout);
        timeout = $timeout(function() {
          githubService2.setUsername(newVal);
          githubService2.events()
          .success(function(data, status) {
            $scope.events = data.data;
          });
        }, 350);
      }
    });

    $scope.fetchEvents = function() {
      $scope.auserEvents = null;
      githubService1.events($scope.username)
        .success(function(data, status, headers) {
          $scope.auserEvents = data.data;
        });
    }
}]);

var nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('DemoPlayerController', ['$scope', '$http', function($scope, $http) {
  $scope.apiKey = '';
  // Hidden our previous section's content
  // construct our http request
  $scope.$watch('apiKey', function(v) {
    if (v) {
      $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + $scope.apiKey + '&callback=JSON_CALLBACK'
      }).success(function(data, status) {
        // We have a list of the stories in data.list.story
        if (data.list) {
          $scope.programs = data.list.story;
        } else {
          $scope.errorMessage = "Please enter a registered API key. You can register for one at <a target='_blank' href='http://www.npr.org/templates/reg/'>http://www.npr.org/templates/reg/</a>";
        }
      }).error(function(data, status) {
        // Some error occurred
      });
    } else {
      $scope.programs = null;
    }
  });
}]);
app.factory('audio', ['$document', function($document) {
  var audio = $document[0].createElement('audio');
  audio.type="audio/mpeg"
  audio.id = "audio";
  return audio;
}]);
app.factory('player', ['audio', '$rootScope', function(audio, $rootScope) {
  var player = {

    current: null,
    progress: 0,
    playing: false,

    play: function(program) {
      if (player.playing) 
        player.stop();

      var url = program.audio[0].format.mp4.$text;
      player.current = program;
      audio.src = url;
      audio.play();
      player.playing = true;
      console.log("player", audio);
    },
    stop: function() {
      if (player.playing) {
        audio.pause();
        player.playing = false;
        player.current = null;
      }
    },
    currentTime: function() {
      return audio.currentTime;
    },
    currentDuration: function() {
      return parseInt(audio.duration);
    }
  };
  audio.addEventListener('timeupdate', function(evt) {
    $rootScope.$apply(function() {
      player.progress = player.currentTime();
      player.progress_percent = (player.progress / player.currentDuration()) * 100;
    });
  });
  audio.addEventListener('ended', function() {
    $rootScope.$apply(player.stop());
  });
  audio.addEventListener('canplay', function() {
    $rootScope.$apply(function() {
      player.ready = true;
    });
  });
  return player;
}]);

app.factory('nprService', ['$http', function($http) {
  var doRequest = function(apiKey) {
    return $http({
      method: 'JSONP',
      url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    });
  }

  return {
    programs: function(apiKey) { return doRequest(apiKey); }
  };
}]);

app.controller('DemoPlayerController1', ['$scope', 'player', 
  function($scope, player) {
    $scope.program = {
      audio: [{
        format: {
          mp4: {
            $text: '/media/npr.mp4'
          }
        }
      }]
    }
    $scope.player = player;
}]);

var apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('DemoPlayerController2', 
  ['$scope', 'player', 'nprService',
  function($scope, player, nprService) {
    $scope.player = player;
    $scope.demoing = false;
    $scope.kickOffDemo = function() {
      if (!$scope.demoing) {
        $scope.demoing = true;
        nprService.programs(apiKey)
        .success(function(data, status) {
          $scope.programs = data.list.story;
        }).error(function(data, status) {
          $scope.programs = [];
        });

        $scope.$watch('player.current', function(newVal) {
          if (newVal) {
            $scope.related = [];
            angular.forEach(newVal.relatedLink, function(link) {
              $scope.related.push({link: link.link[0].$text, caption: link.caption.$text});
            });
          }
        });
      }
    }
    $scope.stopDemo = function() {
      $scope.player.stop();
      $scope.demoing = false;
    }
}]);

app.filter('capitalize', function() {
  return function(input) {
    if (input) 
      return input[0].toUpperCase() + input.slice(1);
  }
});

app.controller('LastController', 
  ['$scope', function($scope) {
    $scope.name = "Ari Lerner";
    $scope.today = new Date();

    $scope.todayFilter = function(expr) {
      return $filter('date')($scope.today, expr);
    }

    $scope.isCapitalized = function(str) { return str[0] == str[0].toUpperCase(); }
  }]);
