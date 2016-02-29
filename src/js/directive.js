/**
 * Directiva que muestra la calculadora
 */
function calculadoraDirective(){
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'template/calculadora.tpl.html',
        scope: {},
        controller: ['$scope', 'Calculadora',
            function ($scope, Calculadora){
                $scope.formula = "6*5";
                $scope.modoEdicion = false;
                $scope.editVar = "";
                $scope.variables = Calculadora.variables;

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