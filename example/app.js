var app = angular.module('app', ['calculadora']);

app.controller('AppCtrl', [
    '$scope', 'Calculadora', '$timeout',
    function($scope, Calculadora, $timeout){
        Calculadora.addVar("sueldo_basico", "500");
        Calculadora.addVar("jubilacion", "400.68 + sueldo_basico * sueldo_basico + antiguedad ");
        Calculadora.addVar("antiguedad", "sueldo_basico * 3 / 100");
        
        $scope.variablesCalc = Calculadora.variables;

        $scope.directiveControl = {};

        $scope.editar = function(){
            $scope.directiveControl.toEdit($scope.var_edit);
        };

        $scope.calcular = function(formula){
            resultado = Calculadora.calcular(formula);
            return resultado;
        };
    }
]);