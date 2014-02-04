$("pre.highlight").each(function(idx, el) {
  var html = $(el).html();

  var newElement = $("<pre ng-non-bindable class='highlight codeexample'>" +
                      html + 
                    "</pre>");
  $(el).replaceWith(newElement);
});
$(".code_with_result").each(function(idx, el) {
  var code    = $(this).find("pre"),
      res     = $("<pre class='highlight result'></pre"),
      width   = $(el).width();

  res.html(code.html());
  code.addClass('highlight');
  code.addClass('question');
  $(el).append(res);
});
angular.module('ngScrub', [])
.config(['$provide', function($provide) {
  // var debug = {
  //   watchers: {},
  //   scopes: {},
  //   models: {},
  //   deps: []
  // };

  // idea from batarang
  // $provide.decorator('$rootScope', function ($delegate) {
  //   console.log($delegate);
  //   return $delegate;
  // });
}])
.factory('esprima', [function() {
  console.log("YES");
}])

.directive('ngScrub', ['esprima', function(esprima) {
  var contextVars = {
    listeners: {},
    watchers: []
  };

  return {
    replace: true,
    priority: 0,
    scope: {},
    controller: [
      '$rootScope', '$rootElement', '$compile', '$scope', 
      '$element', '$attrs', '$parse', 
      function($rootScope, $rootElement, $compile,
                $scope, $element, $attrs, $parse) {
      // console.log($element.html());
      // var el = document.createElement( 'div' );
      // el.className = 'ngScrubbed';
      // el.innerHTML = $element.html();
      // var watchers = $scope.$$watchers;
      // if (watchers) {
      //   for (var i = 0; i < watchers.length; i++) {
      //     var watcher = watchers[i];
      //   };
      // }

      // for (var i = 0; i < $(el).children().length; i++) {
      //   var child = $(el).children()[i],
      //       parsed = $compile(child)($scope);
      //   console.log(i, parsed);
      // };
    }],
    compile: function(tElement, tAttrs, transclude) {

      return function(scope, ele, attrs, ctrl) {}
    }
  };

}]);
(function() {
  var AngularInspector;

  AngularInspector = (function() {
    function AngularInspector(scope, ele) {
      this.scope = scope;
      this.ele = ele;
      this.createCodeMirror();
    }

    AngularInspector.prototype.createCodeMirror = function() {
      var attrs, editor, scope, ta, taControllerFn, taScope;
      editor = $(this.ele).find("section");
      ta = angular.element("<textarea>Hi</textarea>");
      taScope = this.scope.$new();
      taControllerFn = ["$scope", function($scope) {}];
      scope = this.scope;
      attrs = this.attrs;
      return scope.codemirror = CodeMirror(function(elt) {
        editor[0].appendChild(elt, ta);
        return {
          value: "hi",
          mode: attrs.mode || "htmlmixed",
          lineNumbers: true,
          lineWrapping: true,
          tabSize: attrs.tabSize || 2,
          theme: attrs.theme || "3024-day"
        };
      });
    };

    return AngularInspector;

  })();

  angular.module("ngLiveCode", []).factory("panes", [
    "$rootScope", "$location", function($rootScope, $location) {
      var currentPane, defaultPane, panes;
      panes = {};
      currentPane = void 0;
      defaultPane = {
        title: "Unnamed pane",
        "class": "pane",
        link: angular.noop,
        template: "<span></span>"
      };
      return {
        add: function(pane) {
          var id, key;
          id = pane.id || pane.title;
          for (key in defaultPane) {
            if (!pane.hasOwnProperty(key)) {
              pane[key] = defaultPane[key];
            }
          }
          return panes[id] = pane;
        },
        show: function(paneId) {
          console.log(paneId);
          return panes[paneId].template;
        },
        all: function() {
          return panes;
        }
      };
    }
  ]).run([
    "panes", function(panes) {
      panes.add({
        id: "html",
        title: "html",
        template: "<h1>HTML</h1>"
      });
      return panes.add({
        id: "js",
        title: "javascript",
        template: "<h2>Js</h2>"
      });
    }
  ]).directive("ariIframe", [
    function() {
      return {
        link: function(scope, ele, attrs, ctrl) {}
      };
    }
  ]).directive("ngLiveCode", [
    "$controller", "$window", "$compile", "panes", function($controller, $window, $compile, panes) {
      var closeFrametemplate, frameTemplate, liveScope;
      liveScope = void 0;
      frameTemplate = "<!DOCTYPE html><html><head><script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js\"></script></head><body ng-app>";
      closeFrametemplate = "</body></html>";
      return {
        restrict: "A",
        transclude: true,
        replace: true,
        templateUrl: "/liveEditor",
        scope: {
          title: "@",
          theme: "@",
          tabSize: "@",
          mode: "@"
        },
        controller: [
          "$scope", "$interpolate", "$compile", function($scope, $interpolate, $compile) {
            $scope.showPanel = function(panelId) {
              return $scope.__pane = panelId;
            };
            return $scope.parse = function(code) {
              var err, res;
              try {
                res = $interpolate(code)($scope);
                return res;
              } catch (_error) {
                err = _error;
                return code;
              }
            };
          }
        ],
        compile: function(iEle, iAttr, transclude) {
          var codemirror, doc, iframe, insp;
          console.log("HI HI HI");
          iframe = $(iEle).find("iframe");
          doc = iframe[0].contentWindow.document;
          codemirror = void 0;
          insp = void 0;
          return function(scope, ele, attrs, ctrl) {
            return insp = new AngularInspector(scope, ele);
          };
        }
      };
    }
  ]);

}).call(this);
angular.module('ngLiveCode', [])
.factory('panes', ['$rootScope', '$location', 
    function($rootScope, $location) {
      var panes = {},
          currentPane;

      var defaultPane = {
        'title': 'Unnamed pane',
        'class': 'pane',
        'link': angular.noop,
        'template': '<span></span>',
      };

      return {
        add: function(pane) {
          var id = pane.id || pane.title;
          for (key in defaultPane) {
            if (!pane.hasOwnProperty(key)) {
              pane[key] = defaultPane[key];
            }
          }
          panes[id] = pane;
        },
        show: function(paneId) {
          console.log(paneId);
          return panes[paneId].template;
        },
        all: function() { return panes; }
      }    
}])
.run(['panes', function(panes) {
  panes.add({
    'id': 'html',
    'title': 'html',
    'template': '<h1>HTML</h1>'
  });

  panes.add({
    'id': 'js',
    'title': 'javascript',
    'template': '<h2>Js</h2>'
  });
}])
.directive('ariIframe', [function() {
  return {
    link: function(scope, ele, attrs, ctrl) {
      // scope.name = "ariIframe";
      // console.log(scope.$parent);
    }
  }
}])
.directive('ngLiveCode', ['$controller', '$window', '$compile', 'panes', 
    function($controller, $window, $compile, panes) {
  var liveScope;
  var frameTemplate = '<!DOCTYPE html><html><head><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js"></script></head><body ng-app>';
  var closeFrametemplate = '</body></html>';

  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    // template: '<div class="livecode">\n<textarea ng-model="_live_code" class="editor">\n</textarea>\n<div class="result" ng-bind="_live_result"></div>\n</div>',
    templateUrl: '/liveEditor',
    scope: {
      title: '@',
      theme: '@',
      tabSize: '@',
      mode: '@'
    },
    controller: ['$scope', '$interpolate', '$compile',
      function($scope, $interpolate, $compile) {
        $scope.showPanel = function(panelId) {
          $scope.__pane = panelId;
        };
        $scope.parse = function(code) {
        try {
           var res = $interpolate(code)($scope);
           return res;
        } catch (err) {
          return code;
        }
      }
    }],
    compile: function(iEle, iAttr, transclude) {
      var iframe = $(iEle).find('iframe'),
          doc = iframe[0].contentWindow.document,
          editor = $(iEle).find('section');

      var codemirror, insp;

      return function(scope, ele, attrs, ctrl) {
        insp = new $window.AngularInspector(scope, ele, attrs, ctrl)
        // scope.panes = panes.all();
        // scope.__pane = 'html';
        // scope.__panelHtml = '';

        //       // Create the textarea
        // var ta = angular.element('<textarea>Hi</textarea>');
        // var taScope = scope.$new();
        // var taControllerFn = ['$scope', function($scope) {
        // }];
        // var taController = $controller(taControllerFn, {$scope: taScope});
        // // $(ele).append(ta);
        // ta.children().data('$ngControllerController', taController);

        // transclude(scope.$parent, function(clone) {
        //   scope.codemirror = CodeMirror(function(elt) {
        //     editor[0].appendChild(elt, ta);
        //   }, {
        //     value: clone.text()
        //     , mode: (attrs.mode || 'htmlmixed')
        //     , lineNumbers: true
        //     , lineWrapping: true
        //     , tabSize: (attrs.tabSize || 2)
        //     , theme: (attrs.theme || '3024-day')
        //   });
        // });

        // // console.log("dir", scope.$parent, );
        // scope.codemirror.on("change", function(cm, changed) {
        //   var html = frameTemplate + 
        //                 scope.parse(cm.getValue()) + 
        //                 closeFrametemplate;

        //   doc.open();
        //   doc.write(html);
        //   doc.close();
        // });
        // scope.$watch('__pane', function(v) {
        //   scope.__panelHtml = panes.show(v);
        // });
      }
    }
  }
}]);

angular.module('ariIframe', [])
.directive('ariIframe', ['$compile', function ($compile) {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {},
    template: '<div><iframe class="iFrame"></iframe></div>',
    compile: function(iEle, iAttr, transclude) {
      var iframe = $(iEle).find('iframe'),
          doc = iframe[0].contentWindow.document,
          app = iAttr.app;

      var createpage = function() {
        return '<html><head><title>\
          ' + (iAttr.title || "demo") + '</title>\
          <link href="/css/iframe.css" media="screen" rel="stylesheet" type="text/css" />\
          <link href="http://fonts.googleapis.com/css?family=Roboto:400italic,700italic,400,700|Open+Sans:r,i,b,bi|Bitter:r,i,b" media="screen" rel="stylesheet" type="text/css" />\
          <script type="text/javascript" src="/js/vendor/angular/angular.js"></script>\
          <script type="text/javascript" src="/js/vendor/angular-route/angular-route.js"></script>\
          <style type="text/css">body{ padding: 0; }</style>\
          </head><body>';
        }
      return {
        pre: function(scope, ele, attrs) {
          transclude(scope.$parent, function(clone) {
            var wrap = document.createElement('div');
            $(wrap).append(createpage());
            $(wrap).append(clone);
            $(wrap).append('</body></html>');
            if (app) {
              $(wrap).append('<script type="text/javascript">\
                angular.element(document).ready(function () {\
                  console.log("GOG OG OGO");\
                  alert("Ready");\
                  angular.bootstrap(angular.element(\
                  document.getElementById("app")), ["'+app+'"]);\
                });\
              </script>');
            }
            doc.open(); 
            doc.write( $(wrap).html() );
            doc.close();
          });
        }
      }
    }
  }
}]);
/*






*/

$(document).foundation();

var app = angular.module('blogApp', ['ngNewsletter']);
angular.module('ngBookApp', []);

angular.module('ngNewsletter', [])
.directive('ngBook', [function() {
  return {
    restrict: 'EA',
    template: "<section id='sample_chapter' ng-app='signupApp'>    <div class='content'>      <h3 class='title'>Download a free sample of the ng-book: The Complete Book on AngularJS</h3> <span class='image'><img src='/images/book/flatbook-beginners-smaller.png' alt='book' /></span><div class='desc'>It's free, so just enter your email address and the PDF will be sent directly to your inbox.</div>    </div>    <div class='form' ng-init='signedup=false' ng-show='!signuped'>      <form action='http://willcodeforfoo.us6.list-manage.com/subscribe/post?u=86d6f14c7cc955128485e3b8e&amp;id=7bbfaae868' method='post' id='mc-embedded-subscribe-form' name='ngBookSignup' class='validate' target='_blank' novalidate>        <div class='mc-field-group'>          <input ng-class='{error: ngBookSignup.first_name.$dirty && ngBookSignup.first_name.$invalid}' type='text' ng-minlength=1 ng-model='ngBookSignup.first_name' value='' name='FNAME' class='first_name' id='mce-FNAME' placeholder='Your first name' required>        </div>        <div class='mc-field-group'>          <input type='email' ng-model='ngBookSignup.email' ng-class='{error: ngBookSignup.email.$dirty && ngBookSignup.email.$invalid}' value='' name='EMAIL' placeholder='Your email address' class='required email' id='mce-EMAIL' ng-minlength=3 />        </div>        <div id='mce-responses' class='clear'>          <div class='response' id='mce-error-response' style='display:none'></div>          <div class='response' id='mce-success-response' style='display:none'></div>        </div>        <div class='clear'><input type='submit' value='Send me a free chapter' name='subscribe' id='ngBookSignupSubmit' ng-disabled='ngBookSignup.$invalid' class='button postfix' ng-click='signedup=true'></div>      </form>      <div ng-show='signedup'>      <p>Sweet! We are glad to hear you're interested in learning AngularJS. Enjoy the free chapter. We put a lot of work into building the book series, so we hope you like it!      Talk soon</p>      </div>      <div class='desc'>        We won't ever send you spam! You can unsubscribe at any time.      </div>    </div>  </div></section>\
    "
  }
}]);

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
;
