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
                $scope.formula = " 6 * 5 ";
                $scope.resultado = "";
                $scope.modoEdicion = false;
                $scope.editVar = "";
                $scope.variables = Calculadora.variables;
                $scope.msj = {
                    danger: true,
                    success: true,
                };

                $scope.calcular = function(){
                    $scope.resultado = Calculadora.calcular($scope.formula);
                };

                $scope.guardar = function(){
                    Calculadora.addVar($scope.nombreVariable, $scope.formula);
                };

                $scope.editar = function(variable){
                    $scope.modoEdicion = true;
                    $scope.editVar = variable;
                    $scope.formula = $scope.variables[variable];
                };

                $scope.eliminar = function(){

                };

                $scope.modoNormal = function(){
                    $scope.modoEdicion = false;
                    $scope.editVar = "";
                    $scope.formula = "";
                };
            }
        ]
    };
}
angular.module('calculadora').directive('calculadora', calculadoraDirective);