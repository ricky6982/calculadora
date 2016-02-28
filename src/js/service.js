/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$rootScope'];
function Calculadora($rootScope){
    var variables = {};

    calcular = function(variable){
        if (processFormula(variable)) {
            return $rootScope.$eval(variable);
        }else{
            return 'Error';
        }
    };

    addVar = function(nuevaVariable){

    };

    editVar = function(variable, value){

    };

    deleteVar = function(variable, value){

    };

    return {
        variables: variables,
        addVar: addVar,
        editVar: editVar,
        deleteVar: deleteVar,
        calcular: calcular,
    };
}

angular.module('calculadora').factory('Calculadora', Calculadora);