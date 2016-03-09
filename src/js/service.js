/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$parse', '$interpolate'];
function Calculadora($parse, $interpolate){
    var variables = {};
    var notificaciones = {
        success: [],
        danger: [],
        warning: [],
        info: []
    };

    function clearNotificaciones(){
        notificaciones.success = [];
        notificaciones.warning = [];
        notificaciones.danger = [];
        notificaciones.info = [];
    }

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

    function existVar(variable){
        return typeof variables[variable] !== "undefined";
    }

    function itDependsOn(variable){
        objDep = makeObjectDependency(variables);
        depends = false;
        angular.forEach(objDep, function(dependencias, item){
            if (dependencias.indexOf(variable) != -1) {
                depends = true;
            }
        });
        return depends;
    }

    calcular = function(formula){
        try{
            objDep = makeObjectDependency(variables);
            f = resolverDependencia(formula, objDep);
            resultado = $interpolate("{{ " + f + " }}")();
        }catch(e){
            return false;
        }
        return resultado;
    };

    addVar = function(variable, value){
        clearNotificaciones();
        if (typeof value === "undefined") {
            value = "";
        }
        if (existVar(variable)) {
            notificaciones.warning.push("La variable ya esta definida");
            return false;
        }

        var aux = angular.copy(variables);
        aux[variable] = value;
        if (areCorrectVariables(aux)) {
            variables[variable] = value;
            return true;
        }

        notificaciones.danger.push(cyclicDependencyIn);
        return false;
    };

    editVar = function(variable, value){
        clearNotificaciones();
        if (value.trim === "") {
            notificaciones.danger.push('La formula no esta definida correctamente.');
            return false;
        }

        var aux = angular.copy(variables);
        aux[variable] = value;
        if (areCorrectVariables(aux)) {
            variables[variable] = value;
            notificaciones.info.push('Se actualizo la formula de la variable '+variable);
            return true;
        }
        notificaciones.danger.push(cyclicDependencyIn);
        return false;
    };

    deleteVar = function(variable){
        clearNotificaciones();
        if (existVar(variable)) {
            if (!itDependsOn(variable)) {
                delete variables[variable];
            }else{
                notificaciones.warning.push('La variable ' + variable + ' no puede ser eliminada porque existen otras variables que la necesitan para realizar sus calculos.');
            }
        }
    };

    return {
        variables: variables,
        existVar: existVar,
        addVar: addVar,
        editVar: editVar,
        deleteVar: deleteVar,
        calcular: calcular,
        notificaciones: notificaciones
    };
}

angular.module('calculadora').factory('Calculadora', Calculadora);