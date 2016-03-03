/**
 * Calculadora con capacidad de almacenar variables.
 * @version v1.0.0
 * @link http://ricky6982.github.io/me
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, angular){

angular.module('calculadora.templates', ['template/calculadora.tpl.html']);

angular.module("template/calculadora.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/calculadora.tpl.html",
    "<div class=\"row well\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div ng-hide=\"modoEdicion\">\n" +
    "          <!-- Modo Edición -->\n" +
    "          <div class=\"form-group\">\n" +
    "              <input type=\"text\" ng-model=\"formula\" class=\"form-control input-lg\">\n" +
    "          </div>\n" +
    "          <div class=\"form-inline form-group\">\n" +
    "              <label for=\"\">Nombre de la variable</label>\n" +
    "              <input type=\"text\" ng-model=\"nombreVariable\" class=\"form-control\">\n" +
    "              <button ng-click=\"guardar()\">Guardar</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"modoEdicion\">\n" +
    "          <!-- Modo Normal -->\n" +
    "          <div class=\"form-inline form-group\">\n" +
    "              <label for=\"\">{{ editVar }}</label>\n" +
    "              <input type=\"text\" ng-model=\"formula\" class=\"form-control input-lg\" disabled>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "              <button>Guardar cambios</button>\n" +
    "              <button ng-click=\"modoNormal()\">Modo Normal</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-inline form-group\">\n" +
    "            <label for=\"\">Resultado</label>\n" +
    "            <input type=\"text\" ng-model=\"resultado\" class=\"form-control\" disabled>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <!-- Teclado Numerico -->\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button>7</button><button>8</button><button>9</button><button>/</button><button>(</button> <br>\n" +
    "                <button>4</button><button>5</button><button>6</button><button>*</button><button>)</button> <br>\n" +
    "                <button>1</button><button>2</button><button>3</button><button>-</button> <br>\n" +
    "                <button>0</button><button>+</button><button ng-click=\"calcular()\">=</button>\n" +
    "            </div>\n" +
    "            <!-- Teclas de Variables -->\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <legend>Variables</legend>\n" +
    "                <div ng-repeat=\"(key, value) in variables\">\n" +
    "                    <button>{{ key }}</button>\n" +
    "                    <button ng-click=\"editar(key)\"><i class=\"glyphicon glyphicon-pencil\"></i></button>\n" +
    "                    <button ng-click=\"eliminar(key)\"><i class=\"glyphicon glyphicon-trash\"></i></button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"msj.success\" class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
    "          <button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "          <strong>Warning!</strong> Better check yourself, you're not looking too good.\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"msj.danger\" class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
    "          <button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "          <strong>Warning!</strong> Better check yourself, you're not looking too good.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

/**
 * Origin by marcelklehr: https://github.com/marcelklehr/toposort by marcelklehr
 * 
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */
function toposort(nodes, edges) {
  var cursor = nodes.length;
  var sorted = new Array(cursor);
  var visited = {};
  var i = cursor;
  var cyclicDependency;

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, []);
  }

  return sorted;

  function visit(node, i, predecessors) {
    var outgoing;
    var preds;
    var child;

    if (predecessors.indexOf(node) >= 0) {
      throw 'Referencia ciclica en '+JSON.stringify(node);
    }

    if (visited[i]) return;
    visited[i] = true;

    // outgoing edges
    outgoing = edges.filter(function(edge) {
      return edge[0] === node;
    });

    i = outgoing.length;
    if (i) {
      preds = predecessors.concat(node);
      do {
        child = outgoing[--i][1];
        visit(child, nodes.indexOf(child), preds);
      } while (i);
    }

    sorted[--cursor] = node;
  }
}

function uniqueNodes(arr){
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i];
    if (res.indexOf(edge[0]) < 0) res.push(edge[0]);
    if (res.indexOf(edge[1]) < 0) res.push(edge[1]);
  }
  return res;
}

function hasCyclicDependency(dependencias){
  try{
    toposort(uniqueNodes(dependencias), dependencias );
    cyclicDependencyIn = "";
    return false;
  }catch(e){
    cyclicDependencyIn = e;
    return true;
  }
}

// Función que transforma un Objeto de definición de variables
// a un graph para procesar sus dependencias ciclicas.
//  
//  El siguiente objeto
//  
//    Obj: {
//      a: [b],
//      b: [],
//      c: [a, b],
//      d: [c]
//    }
//  se transforma en:
//  
//    Array: [
//      [b,a],
//      [b],
//      [a,c],
//      [b,c],
//      [c,d]
//    ]
function makeGraph(obj){
  var result = [];
  angular.forEach(obj, function(item, key){
    angular.forEach(item, function(dependency){
      result.push([dependency, key]);
    });
  });

  return result;
}

/**
 * Obtiene un vector con las dependencias que se encuentran en una formula (string)
 * 
 * @param  string formula 
 * @return array  Array con las dependencias encontradas
 */
function getDependencies(formula){
    formula = " " + formula + " ";
    var vectorDependencias = formula
                      .replace(/[-!$%^&*+|~=`{}()\[\]:";'<>?,\/]/g, '  ')
                      .replace(/\s[0-9]+(\.[0-9]+)?\s/g,'  ')
                      .replace(/\s\s+/g, '  ')
                      .split(' ')
                    ;
    vectorDependencias = $.unique(vectorDependencias.filter(Boolean));
    return vectorDependencias;
}

//  Función que extrae las dependencias de cada variable declarada
//    Ejemplo: 
//      variables = {
//          a: "b + 4 + c",
//          b: "45",
//          c: "12",
//          d: "a + b * 4 * c"
//      }
//    Resultado:
//      objDependency = {
//          a: ['b', 'c'],
//          b: [],
//          c: [],
//          d: ['a', 'b', 'c']
//      }
function makeObjectDependency(obj)
{
  var objDep = {};
  angular.forEach(obj, function(formula, variable){
    objDep[variable] = getDependencies(formula);
  });

  return objDep;
}


angular.module('calculadora', ['calculadora.templates']);


/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$parse', '$interpolate'];
function Calculadora($parse, $interpolate){
    var variables = {};
    var msjError;

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

    calcular = function(formula){
        objDep = makeObjectDependency(variables);
        f = resolverDependencia(formula, objDep);
        resultado = $interpolate("{{ " + f + " }}")();
        return resultado;
    };

    addVar = function(variable, value){
        msjError = "";
        if (typeof value === "undefined") {
            value = "";
        }
        if (typeof variables[variable] !== "undefined") {
            msjError = "La variable ya esta definida";
            return false;
        }

        aux = angular.copy(variables);
        aux[variable] = value;
        if (areCorrectVariables(aux)) {
            variables[variable] = value;
            return true;
        }

        msjError = cyclicDependencyIn;
        console.log(msjError);
        return false;
    };

    editVar = function(variable, value){

    };

    deleteVar = function(variable, value){

    };

    return {
        variables: variables,
        addVar: addVar,
        editVar: editVar,
        deleteVar: deleteVar,
        calcular: calcular,
    };
}

angular.module('calculadora').factory('Calculadora', Calculadora);
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

})(window, angular);