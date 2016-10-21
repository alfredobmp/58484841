angular.module('app.controllers', [ 'ngCordova','firebase' ])
 
 .run(function(){
 var config = {
		apiKey: "AIzaSyDirAkFtDaaACz_da2s5AH6rS9pU2liUsA",
		authDomain: "base-eec9f.firebaseapp.com",
		databaseURL: "https://base-eec9f.firebaseio.com",
		storageBucket: "base-eec9f.appspot.com",
	};
	firebase.initializeApp(config);  
	
 
 })

.constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>',
	content: 'Carregando',
	animation: 'fade-in',
	showBackdrop: true,
	maxWidth: 200,
	showDelay: 0
})

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, $ionicSideMenuDelegate, $ionicHistory, $ionicLoading) {
	$scope.goTo = function(page) {
		$ionicSideMenuDelegate.toggleRight();
		$state.go(page);
	};

	$scope.logout = function() {
		AuthService.logout();
		var alertPopup = $ionicPopup.alert({
            title: 'Atenção!',
            template: 'Sessão expirada.'
        });
		alertPopup.then(function(res) { 
			$state.go('login'); 
			$ionicSideMenuDelegate.toggleRight();
		});
	};

	$scope.backButton = function() {
		$ionicHistory.goBack();
	};

	$scope.showBackButton = false;

	$scope.$on('$ionicView.enter', function(){
		$scope.showBackButton = false;
		switch($state.current.name){
			case 'sobre':
			case 'perfil':
			case 'chat':
			case 'criar':
				$scope.showBackButton = true;
			break;
		}
	});
	$scope.$on('$ionicView.leave', function(){
		//console.log('out');
	});
})
.controller('loginCtrl', function($scope, $state, $ionicPopup,UsuarioServices, AuthService, $ionicSideMenuDelegate, $ionicLoading) {

	$scope.data = {};

	if( AuthService.isAuthenticated() ){
		$state.go('tabsController.meuPerfil');
	}
	
	$scope.data.username = "alfredo@projectmaker.com.br";
	$scope.data.password = "123456"; 

	$scope.login = function(){
		AuthService.login($scope.data.username, $scope.data.password).then(function(authenticated) {
            $state.go('tabsController.meuPerfil');
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Dados incorretos',
                template: 'Por favor, verifique seu email e senha.'
            });
        });
	}

	$scope.$on('$ionicView.enter', function(){
		$ionicSideMenuDelegate.canDragContent(false);
	});
	$scope.$on('$ionicView.leave', function(){
		$ionicSideMenuDelegate.canDragContent(true);
	});
	$scope.data.email = "";
	$scope.esqueceuSenha = function(){
		$ionicPopup.show({
				template: '<p>Por favor, indique seu email cadastrado em sua conta para enviarmos o procedimento de renovação da senha.</p><div class="item item-input"><i class="icon ion-email positive"></i> &nbsp;&nbsp; <input type="email" name="email" placeholder="Email" ng-model="data.email" maxlength="50" ng-maxlength="50"/> ',
				title: 'Esqueceu a senha?',
				scope: $scope,
				buttons: 
					[{ 
						text: 'ENVIAR', 
						type: 'button-positive'  
					}]
			  }).then(function(){
					UsuarioServices.changePass($scope.data.email);
			  });
	}

})
   
.controller('criarCtrl', function($scope, $ionicPopup, Api, $state, $ionicModal, $ionicLoading,UsuarioServices) {
	$scope.arrSexo = ["","Masculino","Feminino"];
	$scope.data = {};
	$scope.criar = function(){
		if( $scope.novaContaForm.$valid ){			
			var alertPopup = $ionicPopup.alert({
	            title: 'Parabéns!',
	            template: 'Conta criada com sucesso.'
	        });	 		
			UsuarioServices.AddNew($scope.data).then(function(){alertPopup.then(function(res) { $state.go('login'); });});
		}else{
			var alertPopup = $ionicPopup.alert({
	            title: 'Atenção!',
	            template: 'Preencha os campos corretamente.'
	        });
			alertPopup.then(function(res) {  });
		}
	}

	$scope.modal = "";
	 $scope.data.Email = "alfredo@bmp.com.br";
	 $scope.data.Genero = 0;
	 $scope.data.Nascimento = "1987-01-15";
	 $scope.data.Nome = "Alfredo 1";
	 $scope.data.Senha = "123456";
	
	
	$ionicModal.fromTemplateUrl('templates/termos.html', {
		scope: $scope,
	}).then(function(modal) {
		$scope.modal = modal;
	});
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
})


.controller('meuPerfilCtrl', function($scope, $state, $ionicPopup, UsuarioServices,InteresseService,AuthService, $cordovaCamera, $ionicScrollDelegate, $ionicLoading) {

	//$ionicLoading.show();

	 $scope.$on('$ionicView.enter', function() {
		 
			UsuarioServices.getUsusario(function(data){ 
				$scope.data.email = data.Email;				
				$scope.data.nome = data.Nome;
				$scope.data.date = data.StrNascimento;
				$scope.data.sexo = data.Genero;
				$scope.avatar = data.Foto;
				
			});
			
			InteresseService.Get(function(data){				
				$scope.interesses = [];
				for(var i = 0; i < data.length;i++){
					var arrGosto = [];
					var arrNGosto = [];
					var objInt = { id:data[i].Guid, text:data[i].Descricao, gosto: [], naogosto: [] };
					if(data[i].InteresseFilhos && data[i].InteresseFilhos.length > 0){
						for(var j = 0; j < data[i].InteresseFilhos.length;j++){
							if(data[i].InteresseFilhos[j].Gosta){
								arrGosto.push(data[i].InteresseFilhos[j].Descricao);
							}else if (data[i].InteresseFilhos[j].Gosta ===false){
								arrNGosto.push(data[i].InteresseFilhos[j].Descricao);								
							}
						}
					}					
					objInt.gosto  = arrGosto;
					objInt.naogosto  = arrNGosto;
					$scope.interesses.push(objInt);
				}	
				$ionicLoading.hide();		
			});
			
	  })
	  
	if( !AuthService.isAuthenticated() ){
		var alertPopup = $ionicPopup.alert({
            title: 'Atenção!',
            template: 'Sessão expirada.'
        });
		alertPopup.then(function(res) { $state.go('login'); });
	}


	$scope.arrSexo = ["","Masculino","Feminino"];
	$scope.interesses = [ ];
	$scope.avatar = 'avatar.svg';
	$scope.data = {
		email: '',
		nome: '',
		date: '',
		sexo: 0,
		item:'' //essa variavel é auxiliar, não precisa ir para o banco
	};

	$scope.trocarImagem = function(){
		function setOptionsCam(srcType){
		    return {
		      quality: 100,
		     // destinationType: Camera.DestinationType.DATA_URL,
		      destinationType: Camera.DestinationType.FILE_URI,
		      sourceType: srcType,
		      allowEdit: true,
		      encodingType: Camera.EncodingType.JPEG,
		      targetWidth: 230,
		      targetHeight: 230,
		      popoverOptions: CameraPopoverOptions,
		      saveToPhotoAlbum: false,
		      mediaType: Camera.MediaType.PICTURE,
		      correctOrientation: true,
		      cameraDirection: Camera.Direction.FRONT
		    };
		}

		function displayImage(imageData) {
			//$scope.avatar = "data:image/jpeg;base64," + imageData;
			$scope.avatar = imageData;
		}

		function msg(err) { }
		$scope.camera = function () {
			$cordovaCamera.getPicture( setOptionsCam(Camera.PictureSourceType.CAMERA) ).then( displayImage, msg);
		}
		$scope.galeria = function () {
			$cordovaCamera.getPicture( setOptionsCam(Camera.PictureSourceType.PHOTOLIBRARY) ).then( displayImage, msg);
		}
		
		function usar(){
			console.log($scope.avatar);
		}

		$ionicPopup.show({
		    template: '<div class="button-bar"><button id="" class=" button button-positive icon ion-images " ng-click="galeria()"></button>  <button id="" class=" button button-positive icon ion-android-camera " ng-click="camera()"></button> </div> <img ng-src="{{avatar}}" width="230"/> ',
		    title: 'Escolha uma imagem',
		    scope: $scope,
		    buttons: 
			[{ 
				text: 'USAR', 
				type: 'button-positive' ,
				onTap: function(e) {
					UsuarioServices.changeImage($scope.avatar);
				}
			}]
			});
	}

	$scope.preferencias = function( index ){
		var box = 'gosto';
		$scope.gosto = function(){
			$("#boxNaoGosto").hide();
			$("#boxGosto").show();
			box = 'gosto';
		}

		$scope.naogosto = function(){
			$("#boxNaoGosto").show();
			$("#boxGosto").hide();
			box = 'naogosto';
		}
		$scope.excluirItem = function( _index ){
			switch(box){
				case 'gosto':
					$scope.interesses[index].gosto.splice(_index, 1);
				break;
				case 'naogosto':
					$scope.interesses[index].naogosto.splice(_index, 1);
				break;
			}
		}
		
		
		function associar(categoria,descricao,gosta){
			InteresseService.associar(categoria,descricao,gosta,function(data){
			//	console.log(data);
			})
		}
		
		$scope.salvarItem = function(  ){
			switch(box){
				case 'gosto':
					$scope.interesses[index].gosto.push( $scope.data.item );
					associar($scope.interesses[index].text,$scope.data.item,true);
				break;
				case 'naogosto':
					$scope.interesses[index].naogosto.push( $scope.data.item );
					associar($scope.interesses[index].text,$scope.data.item,false);
				break;
			}
			$scope.data.item = '';
		}
		$scope.data.item = "";
		$ionicPopup.show({
		    title: $scope.interesses[index].text,
		    template: '<p>Informe o que você gosta e não gosta sobre este assunto:</p>'+
		    '<div class="button-bar"> '+
			    '<button id="" class=" button button-positive icon ion-android-happy" ng-click="gosto()"></button>'+
			    '<button id="" class=" button button-positive icon ion-android-sad" ng-click="naogosto()"></button>'+
			'</div> <div id="boxGosto">'+
			    	'<p class="padding">Gosto</p>'+
			    	'<ion-scroll style="height:162px"> <ion-item ng-repeat="gosto in interesses['+index+'].gosto" class="item-icon-right">{{gosto}} <a class="icon positive ion-close-round" ng-click="excluirItem($index)"></a> </ion-item> </ion-scroll>'+
			    '</div> <div id="boxNaoGosto" style="display:none;">'+
			    	'<p class="padding">Não gosto</p>'+
			    	'<ion-scroll style="height:162px"> <ion-item ng-repeat="naogosto in interesses['+index+'].naogosto" class="item-icon-right">{{naogosto}} <a class="icon positive ion-close-round" ng-click="excluirItem($index)"></a> </ion-item> </ion-scroll>'+
			    '</div> <div class="item item-input item-icon-right">'+
			    	'<input type="text" ng-model="data.item" placeholder="Inserir item ..."/>'+
			    	'<a class="icon positive ion-archive" ng-click="salvarItem()"></a>'+
			    '</div>',
		    scope: $scope,
		    buttons: [ { text: 'Fechar', type: 'button-positive' } ]
		  });
	}

	$scope.salvar = function(){
		var params = {Email:$scope.data.email,Nome:$scope.data.nome,Nascimento:$scope.data.date,Genero:$scope.data.sexo}
		UsuarioServices.save(params).then(function(data){
			 var alertPopup = $ionicPopup.alert({
                title: 'Aviso.',
                template: 'Dados enviados com sucesso.'
            });
		});
	}
})
   
.controller('sobreCtrl', function($scope, $state, $ionicPopup, AuthService, $ionicLoading) {
	if( !AuthService.isAuthenticated() ){
		 
		$state.go('login');
	}

})

.controller('perfilCtrl', function($scope, $state, $ionicPopup, AuthService, $ionicLoading,UsuarioServices) {
	if( !AuthService.isAuthenticated() ){
		var alertPopup = $ionicPopup.alert({
            title: 'Atenção!',
            template: 'Sessão expirada.'
        });
		alertPopup.then(function(res) { $state.go('login'); });
	}
	
	$scope.$on('$ionicView.enter', function(){
		loadPerfil();
	});

	
	function loadPerfil(){
		var chatId = window.localStorage.getItem('chatId'); 
		var id = window.localStorage.getItem('USER_DETAIL_ID');
		var latA = window.localStorage.getItem('USER_DETAIL_latA');
		var LgtA = window.localStorage.getItem('USER_DETAIL_LgtA');
		if(id){		  
			UsuarioServices.getPerfil(id,latA,LgtA).then(function(perfil){	
				$scope.perfil.nome = perfil.Nome;
				$scope.perfil.avatar = perfil.Foto;
				$scope.perfil.added = perfil.Amigo;
				$scope.perfil.pendente = perfil.Pendente;
				$scope.perfil.old = false;
				$scope.perfil.distancia = perfil.Distancia;
				$scope.perfil.Guid = perfil.Guid;
				$scope.gosto = [];
				$scope.naogosto = [];
				for(var i = 0; i < perfil.Interesses.length;i++){
					if(perfil.Interesses[i].Gosta && perfil.Interesses[i].Gosta.length > 0){
						for(var j = 0; j < perfil.Interesses[i].Gosta.length;j++){
							$scope.gosto.push({text:perfil.Interesses[i].Gosta[j]});
						}
					}					
					if(perfil.Interesses[i].NaoGosta && perfil.Interesses[i].NaoGosta.length > 0){
						for(var j = 0; j < perfil.Interesses[i].NaoGosta.length;j++){
							$scope.naogosto.push({text:perfil.Interesses[i].NaoGosta[j]});
						}
					} 				
				}
				$scope.gosto.sort(SortByText);
				$scope.naogosto.sort(SortByText); 
			});
		}
	
	}
	$scope.perfil = {
		avatar: '',
		email: '',
		nome: '',
		date: '',
		distancia: 0,
		sexo: 0,
		interesses: []
	}
	
	$scope.old = true;
	$scope.added = true;
	$scope.pendente = false;
	$scope.abuso = {};

	$scope.motivoExclusao = [
		{ id: 1, text: 'Papo não é legal'},
		{ id: 2, text: 'Perdeu interesse'},
		{ id: 3, text: 'Conteúdo abusivo'},
		{ id: 4, text: 'Outro tipo'}
	];

	$scope.mensagem = function(){
		$state.go('chat');
	}
	$scope.report = function(){

		$ionicPopup.show({
		    template: '<p>Qual o motivo da exclusão?</p><label class="item item-select"><select ng-model="abuso.motivo" style="max-width:100%"><option ng-repeat="item in motivoExclusao" value="{{item.id}}" >{{item.text}}</option></select></label>',
		    title: 'Reportar conteúdo abusivo...',
		    scope: $scope,
		    buttons: 
			[{ 
				text: 'REPORTAR', 
				type: 'button-positive' ,
				onTap: function(e) {
					//
					if(!$scope.perfil.Guid){
						return;					
					}
					UsuarioServices.bloquear($scope.perfil.Guid,$scope.abuso.motivo).then(function(){
						$scope.perfil.added = false;
						$scope.perfil.pendente = false;			
						$ionicPopup.show({
							template: 'Contato bloqueado com sucesso!',
							scope: $scope,
							buttons: [ { text: 'FECHAR', type: 'button-positive' ,
								onTap: function(e) {
									$scope.added = false;
									$scope.pendente = false;
								}
							}]
						  });	
					});
					
					$scope.added = false;
					$scope.pendente = false;
				}
			}]
		});
	}
	
	$scope.remove = function(id){
		UsuarioServices.remove(id).then(function(){
			$scope.perfil.added = false;
			$scope.perfil.pendente = false;			
			$ionicPopup.show({
				template: 'Contato excluído com sucesso!',
				scope: $scope,
				buttons: [ { text: 'FECHAR', type: 'button-positive' ,
					onTap: function(e) {
						$scope.added = false;
						$scope.pendente = false;
					}
				}]
			  });		
		});	
	}
	
	
	
	$scope.add = function(id){		
		UsuarioServices.add(id).then(function(){
			loadPerfil();
		});	
	}
	
	$scope.view = function(){
		$ionicPopup.show({
		    template: '<img ng-src="{{perfil.avatar}}" width="230"/> ',
		    scope: $scope,
		    buttons: [ { text: 'FECHAR', type: 'button-positive' } ]
		  });
	}
})
   
.controller('buscaListaCtrl', function($scope, $state, $ionicPopup, AuthService, BuscaServices, $timeout, $ionicSideMenuDelegate, $ionicLoading, $compile, $cordovaGeolocation, $ionicLoading) {
	if( !AuthService.isAuthenticated() ){
		var alertPopup = $ionicPopup.alert({
            title: 'Atenção!',
            template: 'Sessão expirada.'
        });
		alertPopup.then(function(res) { $state.go('login'); });
	}
	$scope.searchItens = BuscaServices.buscaRaio();
	$scope.data = {
		distancia: 50
	}

	var timeoutId = null;    
    $scope.$watch('data.distancia', function()
    {    
        if(timeoutId !== null) {
            return;
        }   
        timeoutId = $timeout( function()
        {   
            $timeout.cancel(timeoutId);
            timeoutId = null; 
			$cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(function(position){
				window.localStorage.setItem('USER_DETAIL_latA',position.coords.latitude);
				window.localStorage.setItem('USER_DETAIL_LgtA',position.coords.longitude);
				BuscaServices.buscaRaio($scope.data.distancia,position.coords.latitude, position.coords.longitude).then(function(result){$scope.searchItens = result;if(map){refreshMap()}});		   
			}, function(error){
			  //console.log("Cant get a location = "+error)
			  //$ionicLoading.hide();
			});
        }, 500); 
    });
	
	
	function refreshMap(){
		
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		
		markers = [];
		for(var i = 0; i < $scope.searchItens.length;i++){
			var myLatlng = new google.maps.LatLng($scope.searchItens[i].Longitude, $scope.searchItens[i].Latitude);
			var img = $scope.searchItens[i].ThumbFoto || "img/teste.png";
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: $scope.searchItens[i].Nome,
				icon: img
			}); 			
			marker.obj = $scope.searchItens[i];
			google.maps.event.addListener(marker, 'click', function () {
				$scope.show(marker.obj);
			});
			markers.push(marker);	
		}  		
	}			
		
	$scope.searchItens = [];
    $scope.rangeDistancia = function(number) {
        return (number.distancia < $scope.data.distancia);
    }
    $scope.box = "lista";    
	$scope.buscarMapa = function(){
		$scope.box = "mapa";
		if(!$scope.map){
			initMap();
		}			
		refreshMap();
	}	
	$scope.buscarLista = function(){
		$scope.box = "lista";
	}
	$scope.map = null;	
	var map = null;
	var markers = [];
	function initMap() {
		var myLatlng = new google.maps.LatLng(window.localStorage.getItem('USER_DETAIL_latA'),window.localStorage.getItem('USER_DETAIL_LgtA'));		
		  map = new google.maps.Map(document.getElementById('map'), {
			center: myLatlng,
			zoom: 8
		});		
		$scope.map = map;
	}
	
	$scope.$on('$ionicView.enter', function(){
		//initMap(); 
		$ionicSideMenuDelegate.canDragContent(false);		
	});
	
	$scope.$on('$ionicView.leave', function(){
		$ionicSideMenuDelegate.canDragContent(true);
	});

	$scope.show = function(user){
		window.localStorage.setItem('USER_DETAIL_ID',user.Guid);
		$state.go('perfil');
	}	
})
   
.controller('amigosCtrl', function($scope, $state, $ionicPopup, AuthService, $ionicLoading,BuscaServices) {
	if( !AuthService.isAuthenticated() ){
		var alertPopup = $ionicPopup.alert({
            title: 'Atenção!',
            template: 'Sessão expirada.'
        });
		alertPopup.then(function(res) { $state.go('login'); });
	}
	$scope.friends = [];
	$scope.show = function(amigo){ 
		//console.log(amigo);
		window.localStorage.setItem('chatId', amigo.GuidAmizade)
		window.localStorage.setItem('USER_DETAIL_ID', amigo.Guid)
		$state.go('perfil');
	}	
	$scope.buscar = function(){
		BuscaServices.buscaNome($scope.data.inputSearch).then(function(result){$scope.friends = result;});
	}
    $scope.data = { inputSearch: '' };
    /*$scope.search = function(item) {
        return ( item.nome.indexOf($scope.data.inputSearch) != -1);
    }*/
	$scope.$on('$ionicView.enter', function() {
		$scope.buscar();
	});
})
   
.controller('solicitacoesCtrl', function($scope, $state, $ionicPopup, AuthService,BuscaServices, $ionicLoading) {
	if( !AuthService.isAuthenticated() ){
		var alertPopup = $ionicPopup.alert({
            title: 'Atenção!',
            template: 'Sessão expirada.'
        });
		alertPopup.then(function(res) { $state.go('login'); });
	}	
	BuscaServices.solicitacoes().then(function(firends){$scope.friends = firends;});
	$scope.show = function(amigo){	
		window.localStorage.setItem('USER_DETAIL_ID',amigo.Guid);
		$state.go('perfil');
	}
})
   
.controller('chatCtrl', function($scope, $state, $ionicPopup, AuthService, $ionicScrollDelegate, $cordovaVibration, $timeout, $ionicLoading) {

	if( !AuthService.isAuthenticated() ){
		var alertPopup = $ionicPopup.alert({
            title: 'Atenção!',
            template: 'Sessão expirada.'
        });
		alertPopup.then(function(res) { $state.go('login'); });
	}
	
	var chatId = window.localStorage.getItem('chatId');
	var receiver = window.localStorage.getItem('USER_DETAIL_ID');
	var ref = firebase.database().ref('users/'+chatId);
 
	var arrChat = [];
	var arrChatMensages = [];
	var arrChats = [];
	
	  
	var arrUpdate = [];	
	ref.on("value", function(s) {
		var arr = s.val();
		for(var i in arr){
			var o = {};
			o.id = i;
			
			
			
			if( arr[i].sender != AuthService.getUserId() && arr[i].status == 1){
				arr[i].status = 2;
				arr[i].id = o.id; 
				arrUpdate.push(arr[i]); 
			}
			
			if(arrChatMensages.indexOf(o.id) != -1){
				continue;
			}		
		 
			o.type  = arr[i].sender == AuthService.getUserId()?  "me" : "other";	
			
			var updates = {};
			
			
			o.text = arr[i].text;
			o.sender = arr[i].sender;
			o.receiver = arr[i].receiver;
			o.hour = arr[i].hour;
			o.status = arr[i].status;
			o.chatid = arr[i].chatid;
			
			if(!arrChat[o.chatid]){
				arrChat[o.chatid] = [];
			}
			
			$scope.mensagens.push(o);
			arrChatMensages.push(o.id);	 
			
		}
	});

	setInterval(function(){		
		for(var i = 0; i <arrUpdate.length; i++ ){
			console.log(arrUpdate[i]);
			//ref.update(arrUpdate[i]);
			var updates = {}; 
			updates['/users/' + arrUpdate[i].chatid + '/' + arrUpdate[i].id] = arrUpdate[i];
			firebase.database().ref().update(updates);			
		}
		arrUpdate = [];
	},2000);
	
	$scope.mensagens = [
	/* 	{ type: 'me', text:'Olá User Tester', hour:'11h00', status:2},
		{ type: 'me', text:'Olá User Tester', hour:'11h00', status:-1},
		{ type: 'me', text:'Olá User Tester', hour:'11h00', status:2},
		{ type: 'me', text:'Olá User Tester', hour:'11h00', status:2},
		{ type: 'other', text:'Teste sua mensagem', hour:'11h10', status:-1},
		{ type: 'me', text:'Como faço?', hour:'11h30', status:1},
		{ type: 'other', text:'Digite aí sua mensagem', hour:'12h00', status:-1} */
	];

	$scope.mensagem = {};

	$scope.send = function(){
		var d = new Date();
			_h = d.getHours(),
			_m = d.getMinutes()
			hour = "";
			
		if( _h <= 9 ) _h = "0"+_h;
		if( _m <= 9 ) _m = "0"+_m;
		hour = _h+"h"+_m;
		var objText = { type: 'me', text: $scope.mensagem.text, hour: hour, status:1,chatid:chatId,sender:AuthService.getUserId() ,receiver:receiver };
		//$scope.mensagens.push(objText);
		ref.push(objText);	
		$ionicScrollDelegate.scrollBottom();
		$scope.mensagem.text = "";
		//vibrar();
	}
	function vibrar(){
		//colocar para quando receber a mensagem
		$cordovaVibration.vibrate(100);
		$timeout(function(){ $cordovaVibration.vibrate(100); }, 300);
		$timeout(function(){ $cordovaVibration.vibrate(100); }, 600);
	}
})
 
 
 
 