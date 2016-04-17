/**
 * Directiva que muestra la calculadora
 * ====================================
 *
 * Fn Calcular: resuelve la formula establecida en la variable $scope.formula
 *              teniendo en cuenta las dependencias definidas en el servicio Calculadora.
 *
 * Fn Guardar:  Guarda una formula en el servicio Calculadora siempre que no presente un conflicto
 *              como ser una referencia ciclica. 
 * 
 */
function calculadoraDirective() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'template/calculadora.tpl.html',
        scope: {
            control: '='
        },
        controller: ['$scope', 'Calculadora', 'Slug',
            function($scope, Calculadora, Slug) {
                $scope.formula = "";
                $scope.resultado = "";
                $scope.modoEdicion = false;
                $scope.editVar = "";
                $scope.nombreVariable = "";
                $scope.variables = Calculadora.variables;
                $scope.alert = {
                    info: [],
                    danger: [],
                    success: [],
                    warning: []
                };

                var formulaAux = "";

                function alertClear() {
                    $scope.alert = {
                        info: [],
                        danger: [],
                        success: [],
                        warning: []
                    };
                }

                $scope.Calc = {
                    calcular: function(formula) {
                        return Calculadora.calcular(formula);
                    }
                };

                $scope.calcular = function() {
                    if ($scope.formula.trim() === "") {
                        $scope.resultado = "";
                        return true;
                    }
                    if (Calculadora.calcular($scope.formula)) {
                        $scope.resultado = Calculadora.calcular($scope.formula);
                        return true;
                    } else {
                        $scope.alert.warning.push('La formula no esta bien definida.');
                        $scope.resultado = "";
                        return false;
                    }

                };

                $scope.guardar = function() {
                    alertClear();
                    $scope.nombreVariable = Slug.slugify($scope.nombreVariable);
                    if (Calculadora.existVar($scope.nombreVariable)) {
                        $scope.alert.danger.push('El nombre de la variable ya fue definido.');
                        return false;
                    }
                    if ($scope.formula.trim() === "") {
                        $scope.alert.danger.push('La formula esta vacia.');
                        $scope.resultado = "";
                        return false;
                    }
                    if ($scope.nombreVariable.trim() === "") {
                        $scope.alert.warning.push('Debe establecer un nombre para la variable.');
                        return false;
                    }
                    if (!$scope.calcular()) {
                        return false;
                    }
                    if (Calculadora.addVar($scope.nombreVariable, $scope.formula)) {
                        $scope.alert.success.push("La variable se guardo correctamente.");
                        $scope.nombreVariable = "";
                    } else {
                        $scope.alert.danger.push("La variable no se guardo.");
                        $scope.alert.danger = $scope.alert.danger.concat(Calculadora.notificaciones.danger).concat(Calculadora.notificaciones.warning);
                    }
                };

                $scope.insertarAFormula = function(variable) {
                    $scope.formula = $scope.formula + variable;
                };

                $scope.borrarFormula = function(){
                    $scope.formula = "";
                };

                $scope.borrarUltimo = function(){
                    $scope.formula = $scope.formula.slice(0, -1);
                };

                $scope.keyPress = function(key){
                    $scope.formula += key;
                };

                $scope.update = function() {
                    alertClear();
                    Calculadora.editVar($scope.editVar, $scope.formula);
                    $scope.alert.warning = Calculadora.notificaciones.warning;
                    $scope.alert.danger = Calculadora.notificaciones.danger;
                    $scope.alert.info = Calculadora.notificaciones.info;
                    $scope.modoNormal();
                };

                $scope.editar = function(variable) {
                    if (!$scope.modoEdicion) {
                        formulaAux = $scope.formula;
                        $scope.formula = $scope.variables[variable];
                    }
                    $scope.modoEdicion = true;
                    $scope.editVar = variable;
                    $scope.calcular();
                };

                $scope.eliminar = function(variable) {
                    alertClear();
                    Calculadora.deleteVar(variable);
                    $scope.alert.warning = $scope.alert.warning.concat(Calculadora.notificaciones.warning);
                    $scope.alert.danger = $scope.alert.danger.concat(Calculadora.notificaciones.danger);
                };

                $scope.modoNormal = function() {
                    $scope.modoEdicion = false;
                    $scope.editVar = "";
                    $scope.formula = formulaAux;
                    $scope.calcular();
                };

                $scope.clearAlert = function() {
                    alertClear();
                };
            }
        ],
        link: function(scope, elem, attrs){
            scope.externalControl = scope.control || {};
            scope.externalControl.toEdit = function(variable){
                if (typeof scope.variables[variable] !== "undefined") {
                    scope.modoNormal();
                    scope.editar(variable);
                }
            };
        }
    };
}
angular.module('calculadora').directive('calculadora', calculadoraDirective);
