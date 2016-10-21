angular.module('app.constants', [])
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  logon: 'logon_role',
  logoff: 'logoff_role'
})

.constant('ApiEndpoint', {
  url: "http://localhost:80/ola_controller"
})