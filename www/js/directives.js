angular.module('app.directives', [])


.directive('formManager', function() {
	return {
		restrict : 'A',
		controller : function($scope) {
			if($scope.novaContaForm){
				$scope.$watch('novaContaForm.$valid', function() {
					console.log("Form validity changed. Now : " + $scope.novaContaForm.$valid);
				})
			}else if($scope.novaContaForm){
				$scope.$watch('dados.$valid', function() {
					console.log("Form validity changed. Now : " + $scope.dados.$valid);
				})
			}
		}
	}
})

.directive('range', function rangeDirective() {
    return {
        restrict: 'C',
        link: function (scope, element, attr) {
            element.bind('touchstart mousedown', function(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            });
        }
    };
 })
