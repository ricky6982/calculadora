/**
 * Directiva que muestra la calculadora
 */
calculadoraDirective.$inject = ['$injector'];
function calculadoraDirective($injector){
    var scope = {

    };

    controller.$inject = ['$scope', 'Calculadora'];
    function controller($scope, Calc){
        $scope.formula = "6*5";

        $scope.calcular = function(){
            $scope.resultado = Calc.calcular($scope.formula);
            console.log(Calc.variables.a);
        };
    }

    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'template/calculadora.tpl.html',
        scope: scope,
        controller: controller,
    };
}

angular.module('calculadora').directive('calculadora', calculadoraDirective);