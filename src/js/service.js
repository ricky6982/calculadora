/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$interpolate'];
function Calculadora($interpolate) {
    var variables = {};

    function CalcException(tipo, msj){
        this.tipo = tipo;
        this.name = msj;
    }

    /**
     * Verifica si las variables definidas en el objeto son correctas.
     * @param obj: Conjunto de valores clave-valor que representa variables y sus respectivos valores;
     * @returns {boolean}
     */
    function areCorrectVariables(obj) {
        var objDep = makeObjectDependency(obj);
        return !hasCyclicDependency(makeGraph(objDep));
    }

    /**
     * Función Recursiva para el calculo de formulas que tienen dependecia de varios niveles.
     * @param formula: string que define una expresión matematica
     * @param objDep: variables de las cuales depende la formula
     * @returns string: formula sin variables dependientes, unicamente con valores numericos y operadores matemáticos.
     */
    function resolverDependencia(formula, objDep) {
        var nuevaFormula = angular.copy(formula);
        var dependencias = getDependencies(nuevaFormula);
        if (dependencias.length > 0) {
            angular.forEach(dependencias, function (dependencia) {
                var regxp = new RegExp(dependencia, "g");
                var subDependency = " ( " + resolverDependencia(variables[dependencia], objDep) + " ) ";
                nuevaFormula = nuevaFormula.replace(regxp, subDependency);
            });
        }
        return nuevaFormula;
    }

    /**
     * @param {string} variable
     * @returns {boolean}
     */
    function existVar(variable) {
        return typeof variables[variable] !== "undefined";
    }

    /**
     * Función Privada
     * @param {string} variable
     * @returns {boolean}
     */
    function itDependsOn(variable) {
        var objDep = makeObjectDependency(variables);
        var depends = false;
        angular.forEach(objDep, function (dependencias) {
            if (dependencias.indexOf(variable) != -1) {
                depends = true;
            }
        });
        return depends;
    }

    /**
     * @param {string} formula
     * @returns {float|boolean}
     */
    function calcular(formula) {
        var resultado;
        try {
            var objDep = makeObjectDependency(variables);
            var f = resolverDependencia(formula, objDep);
            resultado = $interpolate("{{ " + f + " }}")();
        } catch (e) {
            throw new CalcException('danger', 'La formula no esta definida correctamente.');
        }
        return resultado;
    }

    /**
     * @param {string} variable
     * @param {string|number} value
     * @throws si la variable ya existe en la calculadora
     * @throws si la variable genera un error de referencia ciclica
     */
    function addVar(variable, value) {
        if (typeof value === "undefined") {
            value = "";
        }

        if (existVar(variable)) {
            console.warn('La variable ya esta definida.');
            throw new CalcException('warning', 'La variable ya esta definida');
        }

        var aux = angular.copy(variables);
        aux[variable] = value;

        if (!areCorrectVariables(aux)) {
            throw new CalcException('danger', cyclicDependencyIn);
        }

        variables[variable] = value;
    }

    /**
     * @param {string} variable
     * @param {string|number} value
     * @throws si value tiene una formula mal definida
     * @throws si value genera error de dependencia ciclica
     * @returns {boolean}
     */
    function editVar(variable, value) {
        if (value.trim() === "") {
            throw new CalcException('danger', 'La formula no esta definida correctamente.');
        }

        var aux = angular.copy(variables);
        aux[variable] = value;

        if (!areCorrectVariables(aux)) {
            throw new CalcException('danger', cyclicDependencyIn);
        }

        variables[variable] = value;
    }

    /**
     * Eliminar variable almacenada
     * @param {string} variable: nombre de la variable
     * @throws si la variable es dependencia de otras variables
     */
    function deleteVar(variable) {
        if (existVar(variable)) {
            if (itDependsOn(variable)) {
                throw new CalcException('danger', 'La variable ' + variable + ' no puede ser eliminada porque existen otras variables que la necesitan para realizar sus calculos.');
            } else {
                delete variables[variable];
            }
        }
    }

    return {
        variables: variables,
        existVar: existVar,
        addVar: addVar,
        editVar: editVar,
        deleteVar: deleteVar,
        calcular: calcular
    };
}

angular.module('calculadora').factory('Calculadora', Calculadora);