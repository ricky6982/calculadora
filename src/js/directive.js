/**
 * Directiva que muestra la calculadora
 */
calculadoraDirective.$inject = ['$injector'];
function calculadoraDirective($injector){
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'template/calculadora.tpl.html',
        controller: 'calculadoraCtrl',
    };
}

angular.module('calculadora').directive('calculadora', calculadoraDirective);