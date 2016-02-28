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