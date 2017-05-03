//var firebase = null;
function get(key){
	return window.localStorage.getItem(key);	
}

function set(key,value){
	 window.localStorage.setItem(key, value);
}

angular.module('app.services', ['firebase'])

.run(function($http,AuthService){ 	
	setInterval(function(){
		if(AuthService.getUserId()){		
			$http({
				method : "GET",
				url : "http://cicareis-001-site1.itempurl.com/usuario/KeepAlive?Guid="+AuthService.getUserId()
			});
		}
	},300000);
	//var config = {
	//	apiKey: "AIzaSyDirAkFtDaaACz_da2s5AH6rS9pU2liUsA",
	//	authDomain: "base-eec9f.firebaseapp.com",
	//	databaseURL: "https://base-eec9f.firebaseio.com",
	//	storageBucket: "base-eec9f.appspot.com",
	//	messagingSenderId: "774405755978"
	//};
	//firebase.initializeApp(config);		  
})
 
.service('ChatServices', function($q, $http, USER_ROLES,AuthService) {	
	
	function referenceChat(chatId){
			
	}
	
	return {
		referenceChat:referenceChat,	
	}	
})
.service('CacheServices', function($q, $http, USER_ROLES,AuthService) {	
	var prefix = AuthService.getUserId();	
	function Set(section,obj){		
		return $q(function(resolve, reject) {
			window.localStorage.setItem(prefix+section, JSON.stringify(obj));
			window.localStorage.setItem(prefix+section+"Controle", true);
		})
	}
	
	function Get(section){	
		var  control = get(prefix+section+"Controle")==="true";
		if(control){
			var obj = get(prefix+section);
			if(obj){
				return JSON.parse(obj);				
			}
		}		
		return null;			 
	}		
	
	function Resset(section){		
		set(prefix+section+"Controle",false);		
	}
	
	var xxx = 1;
	return {
		get:Get,
		set:Set,
		resset:Resset,
xxx:xxx		
	}		
}).service('BuscaServices', function($q, $http, USER_ROLES,AuthService,CacheServices) {	
	function buscaRaio(raio,lat,lgn,filerCat){
			if(!raio){
				return;
			}	
			return $q(function(resolve, reject) {
				var busca = {};
				busca.TermoBusca = "";
				busca.Index = 0;
				busca.Size = 10;
				busca.Raio = raio;
				busca.LongitudeAtual = lat;
				busca.LatitudeAtual = lgn;
				busca.CategoriaIds = filerCat;
				var result = [];				
				$http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/busca/Buscar?Guid="+AuthService.getUserId(),
					params:busca
				}).then(function mySucces(response) { 
					for(var i = 0;i < response.data.Result.length; i++){						
						if(response.data.Result[i].Foto){
							response.data.Result[i].Foto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.Result[i].Foto;
							response.data.Result[i].ThumbFoto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.Result[i].ThumbFoto;
						}
					}
					resolve(response.data.Result);
				}, function myError(response) { 
					reject('Erro.');
				}); 
			});
		}	
		
		function buscaNome(nome){
			return $q(function(resolve, reject) {	
				var busca = {};	
				busca.NomeAmigo = nome;
				$http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Amizade/ListarAmigos?Guid="+AuthService.getUserId(),
					params:busca					
				}).then(function mySucces(response) { 
					for(var i = 0;i < response.data.result.length; i++){						
						if(response.data.result[i].Foto){
							response.data.result[i].Foto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.result[i].Foto;
							response.data.result[i].ThumbFoto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.result[i].ThumbFoto;
						}
					} 
					resolve(response.data.result);
				}, function myError(response) { 
					reject('Erro.');
				}); 				
				// CacheServices.get("amigos").then(
					// function(lst){
						// if(nome.length == 0){
							// resolve(lst);
						// }				
						// var result = [];
						// for(var i =0; i < lst.length; i++){
							// if(lst[i].nome.indexOf(nome) != -1){
								// result.push(lst[i]);						
							// }
						// }
						// resolve(result);
					// },
					// function(){						
						// var lst = [
							// { avatar: 'img/avatar.svg', nome: "Fulano de Tal", distancia:12, distanciaTxt: "12 km" },
							// { avatar: 'img/avatar.svg', nome: "Siclano de Tal", distancia:22, distanciaTxt: "22 km" },
							// { avatar: 'img/avatar.svg', nome: "Anacleta de Tal", distancia:32, distanciaTxt: "32 km" },
							// { avatar: 'img/avatar.svg', nome: "Cefano de Tal", distancia:42, distanciaTxt: "42 km" },
							// { avatar: 'img/avatar.svg', nome: "Efemérides de Tal", distancia:52, distanciaTxt: "52 km" },
							// { avatar: 'img/avatar.svg', nome: "Jorge de Tal", distancia:62, distanciaTxt: "62 km" },
							// { avatar: 'img/avatar.svg', nome: "Mateus de Tal", distancia:72, distanciaTxt: "72 km" },
							// { avatar: 'img/avatar.svg', nome: "Adolfo de Tal", distancia:82, distanciaTxt: "82 km" },
							// { avatar: 'img/avatar.svg', nome: "Beltrano de Tal", distancia:92, distanciaTxt: "92 km", friends: true }
						// ];	
						// if(nome.length == 0){
							// CacheServices.set('amigos',lst);
							// resolve(lst);
						// }				
						// var result = [];
						// for(var i =0; i < lst.length; i++){
							// if(lst[i].nome.indexOf(nome) != -1){
								// result.push(lst[i]);						
							// }
						// }
						// CacheServices.set('amigos',result);
						// resolve(result);
					// }
				// );
			});
		}
		function solicitacoes(){
			return $q(function(resolve, reject) {				
				$http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Amizade/ListarSolicitacao?Guid="+AuthService.getUserId()					
				}).then(function mySucces(response) { 
					for(var i = 0;i < response.data.result.length; i++){						
						if(response.data.result[i].Foto){
							response.data.result[i].Foto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.result[i].Foto;
							response.data.result[i].ThumbFoto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.result[i].ThumbFoto;
						}
					}					
					resolve(response.data.result);
				}, function myError(response) { 
					reject('Erro.');
				});  			
			});
		}
		 
	return{
		buscaRaio:buscaRaio,
		solicitacoes:solicitacoes,
		buscaNome:buscaNome
	}			
})
.service('UsuarioServices', function($q, $http, USER_ROLES,AuthService,CacheServices) {
		function changeImage(img){
			return $q(function(resolve, reject) {
				 
				 var win = function(){};
				 var fail = function(){};
				 
				var options = new FileUploadOptions();
				options.fileKey="file";
				options.fileName=img.substr(img.lastIndexOf('/')+1);
				options.mimeType="image/jpeg";

				var params = new Object();
				params.value1 = "test";
				params.value2 = "param";

				options.params = params;
				options.chunkedMode = false;

				var ft = new FileTransfer();
				ft.upload(img, "http://cicareis-001-site1.itempurl.com/Usuario/MudarFoto?Foto="+img+"&Guid="+AuthService.getUserId(), win, fail, options);
				resolve('ok');				
				 return;
			});
		} 
		
		
		function getUsusario(cbk){
			return $q(function(resolve, reject) {
				 var obj = CacheServices.get('user');
				if(obj){ 
					resolve(JSON.parse(obj));		 
				}else{			
					$http({
						method : "GET",
						url : "http://cicareis-001-site1.itempurl.com/Usuario/Obter?Guid="+AuthService.getUserId()
					}).then(function mySucces(response) { 
						if(response.data && response.data.Foto){
							response.data.Foto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.Foto;
						}
						CacheServices.set('user',JSON.stringify(response.data));
						resolve(response.data);
					}, function myError(response) {
						reject('Erro.'); 
					});
				}
				
			});			
		}
		
		function getPerfil(id,lat,lgn){ 
			var params = {};
			params.perfilId=id;
			params.LatitudeAtual=lat;
			params.LongitudeAtual=lgn;			
			params.Guid=AuthService.getUserId();			
			return $q(function(resolve, reject) {
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Usuario/ObterPerfil",
					params:params
				}).then(function mySucces(response) { 					 
					if(response.data.Foto){						
						response.data.Foto = "http://cicareis-001-site1.itempurl.com/Images/"+response.data.Foto; 
					}					 
					resolve(response.data);
				}, function myError(response) {
					reject('Erro.');
				});
			});			
		}
			
		function changePass(email,cbk){
			return $q(function(resolve, reject) {
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Login/RessetSenha?Email="+email
				}).then(function mySucces(response) {
					 cbk && cbk(response.data);
				}, function myError(response) {
					reject('Erro.');
				});
			});			
		}	
		
		function Describe(cbk){
			return $q(function(resolve, reject) {
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Usuario/Descadastrar?Guid="+AuthService.getUserId()
				}).then(function mySucces(response) {
					 resolve(response);
				}, function myError(response) {
					reject('Erro.');
				});
			});			
		}	
		
		function save(data){			
			return $q(function(resolve, reject) {
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Usuario/Salvar?Guid="+AuthService.getUserId(),
					params:data
				}).then(function mySucces(response) {
					CacheServices.set('user',null);
					resolve(response.data);
				}, function myError(response) {
					reject('Erro.');
				});
			});			
		}
		
		function AddNew(data){			
			return $q(function(resolve, reject) {
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Usuario/AddNew",
					params:data
				}).then(function mySucces(response) { 
					resolve(response.data);
				}, function myError(response) { 
					reject(response.statusText);
				});
			});			
		}
		
		
		function add(id){			
			return $q(function(resolve, reject) {
				var params = {};
				params.idUsuarioAdicionar = id;
				params.Guid = AuthService.getUserId();
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Amizade/Add",
					params:params
				}).then(function mySucces(response) {
					resolve(response.data);
				}, function myError(response) {
					reject('Erro.');
				});
			});			
		}
		
		
		function remove(id){			
			return $q(function(resolve, reject) {
			var params = {};
			params.IdRemover = id;
			params.Guid = AuthService.getUserId();
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Amizade/Desfazer",
					params:params
				}).then(function mySucces(response) {
					resolve(response.data);
				}, function myError(response) {
					reject('Erro.');
				});
			});			
		}
		
		
		function bloquear(id,IdMotivo){			
			return $q(function(resolve, reject) {
			var params = {};
			params.IdRemover = id;
			params.IdMotivo = IdMotivo;
			params.Guid = AuthService.getUserId();
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Amizade/Desfazer",
					params:params
				}).then(function mySucces(response) {
					resolve(response.data);
				}, function myError(response) {
					reject('Erro.');
				});
			});			
		}	
		
	return {
		changeImage:changeImage,
		getUsusario:getUsusario,
		save:save,
		AddNew:AddNew,
		add:add,
		bloquear:bloquear,
		remove:remove,
		getPerfil:getPerfil,
		Describe:Describe,
		changePass:changePass		
	}
})

.service('InteresseService', function($q, $http, USER_ROLES,AuthService,CacheServices) {
		function Get(cbk){
			return $q(function(resolve, reject) { 
				var lst = CacheServices.get('interesses');
				//var lst = null;
				if(lst){
					resolve(JSON.parse(lst));
				}else{	
					$http({
						method : "GET",
						url : "http://cicareis-001-site1.itempurl.com/Interesse/listar?Guid="+AuthService.getUserId()
					}).then(function mySucces(response) {
						CacheServices.set('interesses',JSON.stringify(response.data.Result));
						resolve(response.data.Result); 
					}, function myError(response) {
						reject('Erro.');
					});
				}
			});
		}
		
		function GetSearchFilter(cbk){
			var lst = CacheServices.get('interessesFilter');
			if(lst){
				return JSON.parse(lst);
			}
			return [];
		}
		
		function SetSearchFilter(obj){
			CacheServices.set('interessesFilter',JSON.stringify(obj));
		}
		
		function associar(categoria,descricao,gosta,cbk){
			return $q(function(resolve, reject) {
				 $http({
					method : "GET",
					url : "http://cicareis-001-site1.itempurl.com/Interesse/associar?Categoria="+categoria+"&Descricao="+descricao+"&Gosta="+gosta+"&Guid="+AuthService.getUserId()
				}).then(function mySucces(response) {
					CacheServices.set('interesses',null);
					cbk && cbk(response.data); 
				}, function myError(response) {
					reject('Erro.');
				});
			});
		}		
		
	return {
		Get:Get,
		GetSearchFilter:GetSearchFilter,
		SetSearchFilter:SetSearchFilter,
		associar:associar 
		
	}
})
.service('AuthService', function($q, $http, USER_ROLES) {
    var LOCAL_TOKEN_KEY = 'USER_OLA';
    var LOCAL_TOKEN_ID = 'USER_OLA_ID';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }
	
	
	function getUserId() {
        var id = window.localStorage.getItem(LOCAL_TOKEN_ID);
        if (id) {
            return id;
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }
	
	function storeUserId(id) {
        window.localStorage.setItem(LOCAL_TOKEN_ID, id); 
    }

    function useCredentials(token) {
        username = token;
        isAuthenticated = true;
        authToken = token;
		role = USER_ROLES.logon;

        // Set the token as header for your requests!
       // $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        //$http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        window.localStorage.removeItem(LOCAL_TOKEN_ID);
    }

    var login = function(name, pw) {
        return $q(function(resolve, reject) {	
			console.log("http://cicareis-001-site1.itempurl.com/login/login?Email="+name+"&Senha="+pw);
			$http({
				method : "GET",
				url : "http://cicareis-001-site1.itempurl.com/login/login?Email="+name+"&Senha="+pw
			}).then(function mySucces(response) {
				if(response.data.token){					
					storeUserCredentials(response.data.token);
					storeUserId(response.data.id);
					resolve('Login success.');					
				}
			}, function myError(response) {
				reject('Login Failed.');
			});			 
        });
    };

    var logout = function() {
        destroyUserCredentials();
    };

    var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
        login: login,
        logout: logout,
		getUserId : getUserId,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {return isAuthenticated;},
        username: function() {return username;},
        role: function() {return role;}
    };
})
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

.factory('Api', function($http, $q, ApiEndpoint) {

  var getApiData = function() {
    var q = $q.defer();

    $http.get(ApiEndpoint.url)
    .success(function(data) {
      ////console.log('Got some data: ', data)
      q.resolve(data);
    })
    .error(function(error){
      ////console.log('Had an error')
      q.reject(error);
    })

    return q.promise;
  }
  var postApiData = function(data) {
    var q = $q.defer();

    $http.post(
        ApiEndpoint.url,
        data)
    .success(function(data) {
      //console.log('Got some data: ', data)
      q.resolve(data);
    })
    .error(function(error){
      //console.log('Had an error')
      q.reject(error);
    })

    return q.promise;
  }

  return {
    getApiData: getApiData,
    postApiData: postApiData
  };
})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});