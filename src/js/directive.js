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
function calculadoraDirective(){
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'template/calculadora.tpl.html',
        scope: {},
        controller: ['$scope', 'Calculadora',
            function ($scope, Calculadora){
                $scope.formula = "";
                $scope.resultado = "";
                $scope.modoEdicion = false;
                $scope.editVar = "";
                $scope.nombreVariable = "";
                $scope.variables = Calculadora.variables;
                $scope.alert = {
                            danger: [],
                            success: []
                        };

                var formulaAux = "";

                function alertClear(){
                    $scope.alert = {
                            danger: [],
                            success: []
                        };
                }

                $scope.calcular = function(){
                    if (Calculadora.calcular($scope.formula)) {
                        $scope.resultado = Calculadora.calcular($scope.formula);
                        return true;
                    }else{
                        $scope.alert.danger.push('Hay un error en la formula');
                        return false;
                    }
                    
                };

                $scope.guardar = function(){
                    alertClear();
                    if (Calculadora.existVar($scope.nombreVariable)) {
                        $scope.alert.danger.push('El nombre de la variable ya fue definido.');
                        return false;
                    }
                    if ($scope.formula.trim() === "") {
                        $scope.alert.danger.push('La formula esta vacia.');
                        return false;
                    }
                    if ($scope.nombreVariable.trim() === "") {
                        $scope.alert.danger.push('Debe establecer un nombre para la variable.');
                        return false;
                    }
                    if (!$scope.calcular()) {
                        return false;
                    }
                    if (Calculadora.addVar($scope.nombreVariable, $scope.formula)) {
                        $scope.alert.success.push("La variable se guardo correctamente.");
                    }else{
                        $scope.alert.danger.push("La variable no se guardo.");
                    }
                    
                };

                $scope.editar = function(variable){
                    if (!$scope.modoEdicion) {
                        formulaAux = $scope.formula;
                        $scope.formula = $scope.variables[variable];
                    }
                    $scope.modoEdicion = true;
                    $scope.editVar = variable;
                };

                $scope.eliminar = function(){

                };

                $scope.modoNormal = function(){
                    $scope.modoEdicion = false;
                    $scope.editVar = "";
                    $scope.formula = formulaAux;
                };

                $scope.clearAlert = function(){
                    alertClear();
                };
            }
        ]
    };
}
angular.module('calculadora').directive('calculadora', calculadoraDirective);