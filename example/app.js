var app = angular.module('app', ['calculadora']);

app.controller('AppCtrl', [
    '$scope', 'Calculadora', '$timeout',
    function($scope, Calculadora, $timeout){
        Calculadora.addVar("sueldo_basico", "200");
        Calculadora.addVar("jubilacion", "sueldo_basico + 55");
        Calculadora.addVar("antiguedad", "jubilacion * 3 / 100");
        
        $scope.calcular = function(){
            resultado = Calculadora.calcular('antiguedad');
            console.log(resultado);
        };
    }
]);