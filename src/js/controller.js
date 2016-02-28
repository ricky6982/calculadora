/**
 * Definición de la Controlador de la Calculadora
 */
angular.module('calculadora')
    .controller('calculadoraCtrl', [
        '$scope', 'Calculadora',
        function($scope, Calculadora){
            $scope.formula = "6*5";
            $scope.modoEdicion = false;
            $scope.editVar = "";
            $scope.variables = Calculadora.variables;

            $scope.calcular = function(){
                $scope.resultado = Calc.calcular($scope.formula);
            };

            $scope.guardar = function(){
                Calculadora.addVar($scope.nombreVariable, $scope.formula);
            };

            $scope.editar = function(variable){
                $scope.modoEdicion = true;
                $scope.editVar = variable;
                $scope.formula = $scope.variables[variable];
            };

            $scope.modoNormal = function(){
                $scope.modoEdicion = false;
                $scope.editVar = "";
                $scope.formula = "";
            };
        }
    ])
;