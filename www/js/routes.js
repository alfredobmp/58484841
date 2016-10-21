//angular.module('app.routes', ['ngMockE2E'])
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, USER_ROLES, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('top');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController.meuPerfil', {
    url: '/meu_perfil',
    views: {
      'tab1': {
        templateUrl: 'templates/meuPerfil.html',
        controller: 'meuPerfilCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.logon]
    }
  })

  .state('tabsController.buscaLista', {
    url: '/buscar',
    views: {
      'tab2': {
        templateUrl: 'templates/buscaLista.html',
        controller: 'buscaListaCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.logon]
    }
  })

  .state('tabsController.amigos', {
    url: '/amigos',
    views: {
      'tab3': {
        templateUrl: 'templates/amigos.html',
        controller: 'amigosCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.logon]
    }
  })

  .state('tabsController.solicitacoes', {
    url: '/solicitacoes',
    views: {
      'tab4': {
        templateUrl: 'templates/solicitacoes.html',
        controller: 'solicitacoesCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.logon]
    }
  })

  .state('perfil', {
    url: '/perfil',
    templateUrl: 'templates/perfil.html',
    controller: 'perfilCtrl',
    data: {
      authorizedRoles: [USER_ROLES.logon]
    }
  })

  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'chatCtrl',
    data: {
      authorizedRoles: [USER_ROLES.logon]
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    cache: false,
    reload: true
  })

  .state('sobre', {
    url: '/sobre',
    templateUrl: 'templates/sobre.html',
    controller: 'sobreCtrl'
  })

  .state('criar', {
    url: '/criar',
    templateUrl: 'templates/criar.html',
    controller: 'criarCtrl',
    cache: false,
    reload: true
  })

  //$urlRouterProvider.otherwise('/login')

  
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("login");
  });

  $ionicConfigProvider.views.maxCache(0);

});