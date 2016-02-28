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
    "    <h1>Calculadora</h1>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" ng-model=\"formula\" class=\"form-control input-lg\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" ng-model=\"resultado\" class=\"form-control\">\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button>7</button><button>8</button><button>9</button><button>/</button><button>(</button> <br>\n" +
    "                <button>4</button><button>5</button><button>6</button><button>*</button><button>)</button> <br>\n" +
    "                <button>1</button><button>2</button><button>3</button><button>-</button> <br>\n" +
    "                <button>0</button><button>+</button><button ng-click=\"calcular()\">=</button>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">variables</div>\n" +
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
      throw JSON.stringify(node);
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
    formula = " " + formula + " ";
     var vectorDependencias = formula
                      .replace(/[-!$%^&*+|~=`{}\[\]:";'<>?,\/]/g, ' ')
                      .replace(/\s[0-9]+(\.[0-9]+)?\s/g,' ')
                      .replace(/\s\s+/g, ' ')
                      .split(' ')
                    ;

    vectorDependencias = $.unique(vectorDependencias.filter(Boolean));

    objDep[variable] = vectorDependencias;
  });

  return objDep;
}


angular.module('calculadora', ['calculadora.templates']);


/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$rootScope'];
function Calculadora($rootScope){
    var variables = {
        a: 1,
        b: 2,
        c: "b"
    };

    function replaceVariables(formula){
        
    }

    function processFormula(formula, resultado){

        return true;
    }

    calcular = function(formula){
        if (processFormula(formula)) {
            return $rootScope.$eval(formula);
        }else{
            return 'Error';
        }
    };

    return {
        variables: variables,
        calcular: calcular,
    };
}

angular.module('calculadora').factory('Calculadora', Calculadora);
/**
 * Directiva que muestra la calculadora
 */
calculadoraDirective.$inject = ['$injector'];
function calculadoraDirective($injector){
    var scope = {

    };

    controller.$inject = ['$scope', 'Calculadora'];
    function controller($scope, Calc){
        $scope.formula = "6*5";

        $scope.calcular = function(){
            $scope.resultado = Calc.calcular($scope.formula);
            console.log(Calc.variables.a);
        };
    }

    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'template/calculadora.tpl.html',
        scope: scope,
        controller: controller,
    };
}

angular.module('calculadora').directive('calculadora', calculadoraDirective);

})(window, angular);