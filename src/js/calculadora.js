angular.module('calculadora', ['calculadora.templates']);

/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$rootScope'];
function Calculadora($rootScope){
    var variables = {
        a: 1,
        b: 2,
        c: "b"
    };

    function replaceVariables(formula){
        
    }

    function processFormula(formula, resultado){

        return true;
    }

    calcular = function(formula){
        if (processFormula(formula)) {
            return $rootScope.$eval(formula);
        }else{
            return 'Error';
        }
    };

    return {
        variables: variables,
        calcular: calcular,
    };
}

angular.module('calculadora').factory('Calculadora', Calculadora);


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