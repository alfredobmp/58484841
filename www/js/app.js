// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.constants', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'firebase'])

.run(function($ionicPlatform, $cordovaStatusbar) {
	
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		
		if (window.StatusBar) {
			StatusBar.overlaysWebView(true);
			StatusBar.backgroundColorByHexString('#00618c');
			var isVisible = $cordovaStatusbar.isVisible();
		}

		if(window.screen) {
			//screen.lockOrientation('portrait');
		}
	});  
});

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function SortByText(x,y) {
      return ((x.text == y.text) ? 0 : ((x.text > y.text) ? 1 : -1 ));
    }