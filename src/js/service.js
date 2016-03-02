/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$parse', '$interpolate'];
function Calculadora($parse, $interpolate){
    var variables = {};
    var msjError;

    function areCorrectVariables(obj){
        objDep = makeObjectDependency(obj);
        if (hasCyclicDependency(makeGraph(objDep))) {
            return false;
        }

        return true;
    }

    function resolverDependencia(formula, objDep){
        var nuevaFormula = angular.copy(formula);
        dependencias = getDependencies(nuevaFormula);
        if (dependencias.length > 0) {
            angular.forEach(dependencias, function(dependencia){
                var regxp = new RegExp(dependencia, "g");
                subDependency = " ( " + resolverDependencia(variables[dependencia], objDep) + " ) ";
                nuevaFormula = nuevaFormula.replace(regxp, subDependency);
            });
        }
        return nuevaFormula;
    }

    calcular = function(formula){
        objDep = makeObjectDependency(variables);
        f = resolverDependencia(formula, objDep);
        resultado = $interpolate("{{ " + f + " }}")();
        return resultado;
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