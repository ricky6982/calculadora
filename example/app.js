var app = angular.module('app', ['calculadora']);

app.controller('AppCtrl', [
    '$scope', 'Calculadora', '$timeout',
    function($scope, Calculadora, $timeout){
        Calculadora.addVar("sueldo_basico", "4567.89");
        console.log(Calculadora.variables);
        $timeout(function(){
            Calculadora.addVar("jubilacion", "4567.89");
        }, 5000);
        $timeout(function(){
            Calculadora.addVar("jubilacion", "4567.89");
        }, 10000);
        $timeout(function(){
            Calculadora.addVar("antiguedad", "sueldo_basico * 3 / 100");
            console.log(Calculadora.variables);
        }, 13000);
    }
]);