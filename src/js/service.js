/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$rootScope'];
function Calculadora($rootScope){
    var variables = {};
    var msjError;

    function areCorrectVariables(obj){
        objDep = makeObjectDependency(obj);
        if (hasCyclicDependency(makeGraph(objDep))) {
            return false;
        }

        return true;
    }

    calcular = function(variable){
        if (processFormula(variable)) {
            return $rootScope.$eval(variable);
        }else{
            return 'Error';
        }
    };

    addVar = function(variable, value){
        msjError = "";
        if (typeof value === "undefined") {
            value = "";
        }
        if (typeof variables[variable] !== "undefined") {
            msjError = "La variable ya esta definida";
            return false;
        }

        aux = angular.copy(variables);
        aux[variable] = value;
        if (areCorrectVariables(aux)) {
            variables[variable] = value;
            return true;
        }

        msjError = cyclicDependencyIn;
        console.log(msjError);
        return false;
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