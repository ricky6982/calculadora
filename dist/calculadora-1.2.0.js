/**
 * Calculadora con capacidad de almacenar variables.
 * @version v1.2.0
 * @link http://ricky6982.github.io/me
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, angular){

/**
 * angular-slugify -- provides slugification for AngularJS
 *
 * Copyright © 2013 Paul Smith <paulsmith@pobox.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function() {
    "use strict";

    var mod = angular.module("slugifier_rck", []);

    // Unicode (non-control) characters in the Latin-1 Supplement and Latin
    // Extended-A blocks, transliterated into ASCII characters.
    var charmap = {
        ' ': " ",
        '¡': "!",
        '¢': "c",
        '£': "lb",
        '¥': "yen",
        '¦': "|",
        '§': "SS",
        '¨': "\"",
        '©': "(c)",
        'ª': "a",
        '«': "<<",
        '¬': "not",
        '­': "-",
        '®': "(R)",
        '°': "^0",
        '±': "+/-",
        '²': "^2",
        '³': "^3",
        '´': "'",
        'µ': "u",
        '¶': "P",
        '·': ".",
        '¸': ",",
        '¹': "^1",
        'º': "o",
        '»': ">>",
        '¼': " 1/4 ",
        '½': " 1/2 ",
        '¾': " 3/4 ",
        '¿': "?",
        'À': "`A",
        'Á': "'A",
        'Â': "^A",
        'Ã': "~A",
        'Ä': '"A',
        'Å': "A",
        'Æ': "AE",
        'Ç': "C",
        'È': "`E",
        'É': "'E",
        'Ê': "^E",
        'Ë': '"E',
        'Ì': "`I",
        'Í': "'I",
        'Î': "^I",
        'Ï': '"I',
        'Ð': "D",
        'Ñ': "~N",
        'Ò': "`O",
        'Ó': "'O",
        'Ô': "^O",
        'Õ': "~O",
        'Ö': '"O',
        '×': "x",
        'Ø': "O",
        'Ù': "`U",
        'Ú': "'U",
        'Û': "^U",
        'Ü': '"U',
        'Ý': "'Y",
        'Þ': "Th",
        'ß': "ss",
        'à': "`a",
        'á': "'a",
        'â': "^a",
        'ã': "~a",
        'ä': '"a',
        'å': "a",
        'æ': "ae",
        'ç': "c",
        'è': "`e",
        'é': "'e",
        'ê': "^e",
        'ë': '"e',
        'ì': "`i",
        'í': "'i",
        'î': "^i",
        'ï': '"i',
        'ð': "d",
        'ñ': "~n",
        'ò': "`o",
        'ó': "'o",
        'ô': "^o",
        'õ': "~o",
        'ö': '"o',
        '÷': ":",
        'ø': "o",
        'ù': "`u",
        'ú': "'u",
        'û': "^u",
        'ü': '"u',
        'ý': "'y",
        'þ': "th",
        'ÿ': '"y',
        'Ā': "A",
        'ā': "a",
        'Ă': "A",
        'ă': "a",
        'Ą': "A",
        'ą': "a",
        'Ć': "'C",
        'ć': "'c",
        'Ĉ': "^C",
        'ĉ': "^c",
        'Ċ': "C",
        'ċ': "c",
        'Č': "C",
        'č': "c",
        'Ď': "D",
        'ď': "d",
        'Đ': "D",
        'đ': "d",
        'Ē': "E",
        'ē': "e",
        'Ĕ': "E",
        'ĕ': "e",
        'Ė': "E",
        'ė': "e",
        'Ę': "E",
        'ę': "e",
        'Ě': "E",
        'ě': "e",
        'Ĝ': "^G",
        'ĝ': "^g",
        'Ğ': "G",
        'ğ': "g",
        'Ġ': "G",
        'ġ': "g",
        'Ģ': "G",
        'ģ': "g",
        'Ĥ': "^H",
        'ĥ': "^h",
        'Ħ': "H",
        'ħ': "h",
        'Ĩ': "~I",
        'ĩ': "~i",
        'Ī': "I",
        'ī': "i",
        'Ĭ': "I",
        'ĭ': "i",
        'Į': "I",
        'į': "i",
        'İ': "I",
        'ı': "i",
        'Ĳ': "IJ",
        'ĳ': "ij",
        'Ĵ': "^J",
        'ĵ': "^j",
        'Ķ': "K",
        'ķ': "k",
        'Ĺ': "L",
        'ĺ': "l",
        'Ļ': "L",
        'ļ': "l",
        'Ľ': "L",
        'ľ': "l",
        'Ŀ': "L",
        'ŀ': "l",
        'Ł': "L",
        'ł': "l",
        'Ń': "'N",
        'ń': "'n",
        'Ņ': "N",
        'ņ': "n",
        'Ň': "N",
        'ň': "n",
        'ŉ': "'n",
        'Ō': "O",
        'ō': "o",
        'Ŏ': "O",
        'ŏ': "o",
        'Ő': '"O',
        'ő': '"o',
        'Œ': "OE",
        'œ': "oe",
        'Ŕ': "'R",
        'ŕ': "'r",
        'Ŗ': "R",
        'ŗ': "r",
        'Ř': "R",
        'ř': "r",
        'Ś': "'S",
        'ś': "'s",
        'Ŝ': "^S",
        'ŝ': "^s",
        'Ş': "S",
        'ş': "s",
        'Š': "S",
        'š': "s",
        'Ţ': "T",
        'ţ': "t",
        'Ť': "T",
        'ť': "t",
        'Ŧ': "T",
        'ŧ': "t",
        'Ũ': "~U",
        'ũ': "~u",
        'Ū': "U",
        'ū': "u",
        'Ŭ': "U",
        'ŭ': "u",
        'Ů': "U",
        'ů': "u",
        'Ű': '"U',
        'ű': '"u',
        'Ų': "U",
        'ų': "u",
        'Ŵ': "^W",
        'ŵ': "^w",
        'Ŷ': "^Y",
        'ŷ': "^y",
        'Ÿ': '"Y',
        'Ź': "'Z",
        'ź': "'z",
        'Ż': "Z",
        'ż': "z",
        'Ž': "Z",
        'ž': "z",
        'ſ': "s"
    };

    function _slugify(s) {
        if (!s) return "";
        var ascii = [];
        var ch, cp;
        for (var i = 0; i < s.length; i++) {
            if ((cp = s.charCodeAt(i)) < 0x180) {
                ch = String.fromCharCode(cp);
                ascii.push(charmap[ch] || ch);
            }
        }
        s = ascii.join("");
        s = s.replace(/[^\w\s-]/g, "").trim().toLowerCase();
        return s.replace(/[-\s]+/g, "_");
    }

    mod.factory("Slug", function() {
        return {
            slugify: _slugify
        };
    });

    mod.directive("slug", ["Slug", function(Slug) {
        return {
            restrict: "E",
            scope: {
                to: "=",
            },
            transclude: true,
            replace: true,
            template: "<div ng-transclude></div>",
            link: function(scope, elem, attrs) {
                if (!attrs.from) {
                    throw "must set attribute 'from'";
                }
                scope.$parent.$watch(attrs.from, function(val) {
                    scope.to = Slug.slugify(val);
                });
            }
        };
    }]);

    mod.filter("slugify", ["Slug", function(Slug) {
        return function(input) {
            return Slug.slugify(input);
        };
    }]);
})();

angular.module('calculadora.templates', ['template/calculadora.tpl.html']);

angular.module("template/calculadora.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/calculadora.tpl.html",
    "<div class=\"well well-sm\" style=\"max-width: 900px;\">\n" +
    "    <!-- Modo Normal -->\n" +
    "    <div class=\"form-group\">\n" +
    "        <label ng-hide=\"modoEdicion\">Formula:</label>\n" +
    "        <label ng-show=\"modoEdicion\">{{ editVar }}:</label>\n" +
    "        <div class=\"input-group\">\n" +
    "            <input type=\"text\" class=\"form-control input-lg\" ng-model=\"formula\" spellcheck=\"false\">\n" +
    "            <div class=\"input-group-btn\">\n" +
    "                <button class=\"btn btn-primary btn-lg\" type=\"button\" ng-click=\"calcular()\">=</button>\n" +
    "                <a class=\"btn btn-success btn-lg\" type=\"button\" data-toggle=\"collapse\" href=\"#collapseSaveFormula\">Guardar</a>\n" +
    "                <a class=\"btn btn-danger btn-lg\" type=\"button\" ng-click=\"borrarFormula()\"><i class=\"glyphicon glyphicon-erase\"></i> CE</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div style=\"height: 1px; position: relative; z-index: 2000;\">\n" +
    "        <div class=\"collapse\" id=\"collapseSaveFormula\" style=\"box-shadow: black 0px 0px 40px -10px;\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">Guardar Formula</div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Nombre de Variable</label>\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"nombreVariable\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group text-center\">\n" +
    "                        <button class=\"btn btn-primary\" data-toggle=\"collapse\" href=\"#collapseSaveFormula\" ng-click=\"guardar()\">Guardar</button>\n" +
    "                        <button class=\"btn btn-danger\" data-toggle=\"collapse\" href=\"#collapseSaveFormula\">Cancelar</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row form-group\">\n" +
    "        <!-- Teclas de Variables -->\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <legend>Variables</legend>\n" +
    "            <div ng-repeat=\"(key, value) in variables\" style=\"margin: 5px; display: inline-block;\">\n" +
    "                <div class=\"btn-group\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"insertarAFormula(key)\">{{ key }}</button>\n" +
    "                    <button type=\"button\" ng-hide=\"modoEdicion\" class=\"btn btn-info dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                        <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "                    </button>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li class=\"text-center\">Valor: {{ Calc.calcular(value) }}</li>\n" +
    "                        <li role=\"separator\" class=\"divider\"></li>\n" +
    "                        <li><a href=\"#\" ng-click=\"editar(key)\"><i class=\"glyphicon glyphicon-pencil text-primary\"></i> Editar</a></li>\n" +
    "                        <li><a href=\"#\" ng-click=\"eliminar(key)\"><i class=\"glyphicon glyphicon-trash text-danger\"></i> Eliminar</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- Teclado Numerico -->\n" +
    "        <div class=\"col-xs-6\">\n" +
    "            <div class=\"form-inline form-group text-right\">\n" +
    "                <label for=\"\">Resultado</label>\n" +
    "                <input type=\"text\" ng-model=\"resultado\" class=\"form-control text-right\" disabled>\n" +
    "            </div>\n" +
    "            <div style=\"width: 285px; display: inline-block; float: right; margin-bottom: 15px;\">\n" +
    "              <div>\n" +
    "                  <button ng-click=\"keyPress('7')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">7</button>\n" +
    "                  <button ng-click=\"keyPress('8')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">8</button>\n" +
    "                  <button ng-click=\"keyPress('9')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">9</button>\n" +
    "                  <button ng-click=\"keyPress('(')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">(</button>\n" +
    "                  <button ng-click=\"keyPress(')')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">)</button>\n" +
    "                  <button ng-click=\"borrarUltimo()\" class=\"btn btn-danger\" style=\"width: 40px; margin: 2px;\"><i class=\"glyphicon glyphicon-arrow-left\"></i></button>\n" +
    "              </div>\n" +
    "              <div>\n" +
    "                  <button ng-click=\"keyPress('4')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">4</button>\n" +
    "                  <button ng-click=\"keyPress('5')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">5</button>\n" +
    "                  <button ng-click=\"keyPress('6')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">6</button>\n" +
    "                  <button ng-click=\"keyPress('/')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">/</button>\n" +
    "                  <button ng-click=\"keyPress('*')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">*</button>\n" +
    "              </div>\n" +
    "              <div>\n" +
    "                  <button ng-click=\"keyPress('1')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">1</button>\n" +
    "                  <button ng-click=\"keyPress('2')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">2</button>\n" +
    "                  <button ng-click=\"keyPress('3')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">3</button>\n" +
    "                  <button ng-click=\"keyPress('-')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">-</button>\n" +
    "                  <button ng-click=\"keyPress('+')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">+</button>\n" +
    "              </div>\n" +
    "              <div>\n" +
    "                  <button ng-click=\"keyPress('0')\" class=\"btn btn-default\" style=\"width: 88px; margin: 2px;\">0</button>\n" +
    "                  <button ng-click=\"keyPress('.')\" class=\"btn btn-default\" style=\"width: 40px; margin: 2px;\">.</button>\n" +
    "                  <button class=\"btn btn-primary\" style=\"width: 88px; margin: 2px;\" ng-click=\"calcular()\">=</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <!-- Modo Edición -->\n" +
    "                <div class=\"col pull-right\">\n" +
    "                    <div ng-show=\"modoEdicion\">\n" +
    "                        <div>\n" +
    "                            <button class=\"btn btn-primary\" ng-click=\"update()\">Guardar cambios</button>\n" +
    "                            <button class=\"btn btn-warning\" ng-click=\"modoNormal()\">Cancelar</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- Alert Success -->\n" +
    "    <div ng-show=\"alert.success.length > 0\" class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
    "        <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "        <strong>Todo bien!</strong>\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"msj in alert.success\">{{ msj }}</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <!-- Alert Danger -->\n" +
    "    <div ng-show=\"alert.danger.length > 0\" class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
    "        <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "        <strong>Algo salio mal</strong>\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"msj in alert.danger\">{{ msj }}</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <!-- Alert Info -->\n" +
    "    <div ng-show=\"alert.info.length > 0\" class=\"alert alert-info alert-dismissible\" role=\"alert\">\n" +
    "        <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "        <strong>Información</strong>\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"msj in alert.info\">{{ msj }}</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <!-- Alert Info -->\n" +
    "    <div ng-show=\"alert.warning.length > 0\" class=\"alert alert-warning alert-dismissible\" role=\"alert\">\n" +
    "        <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "        <strong>Precaución</strong>\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"msj in alert.warning\">{{ msj }}</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
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


angular.module('calculadora', ['calculadora.templates', 'slugifier_rck']);
/**
 * Servicio de Calculadora
 */
Calculadora.$inject = ['$interpolate'];
function Calculadora($interpolate) {
    var variables = {};

    function CalcException(tipo, msj){
        this.tipo = tipo;
        this.name = msj;
    }

    /**
     * Verifica si las variables definidas en el objeto son correctas.
     * @param obj: Conjunto de valores clave-valor que representa variables y sus respectivos valores;
     * @returns {boolean}
     */
    function areCorrectVariables(obj) {
        var objDep = makeObjectDependency(obj);
        return !hasCyclicDependency(makeGraph(objDep));
    }

    /**
     * Función Recursiva para el calculo de formulas que tienen dependecia de varios niveles.
     * @param formula: string que define una expresión matematica
     * @param objDep: variables de las cuales depende la formula
     * @returns string: formula sin variables dependientes, unicamente con valores numericos y operadores matemáticos.
     */
    function resolverDependencia(formula, objDep) {
        var nuevaFormula = angular.copy(formula);
        var dependencias = getDependencies(nuevaFormula);
        if (dependencias.length > 0) {
            angular.forEach(dependencias, function (dependencia) {
                var regxp = new RegExp(dependencia, "g");
                var subDependency = " ( " + resolverDependencia(variables[dependencia], objDep) + " ) ";
                nuevaFormula = nuevaFormula.replace(regxp, subDependency);
            });
        }
        return nuevaFormula;
    }

    /**
     * @param {string} variable
     * @returns {boolean}
     */
    function existVar(variable) {
        return typeof variables[variable] !== "undefined";
    }

    /**
     * Función Privada
     * @param {string} variable
     * @returns {boolean}
     */
    function itDependsOn(variable) {
        var objDep = makeObjectDependency(variables);
        var depends = false;
        angular.forEach(objDep, function (dependencias) {
            if (dependencias.indexOf(variable) != -1) {
                depends = true;
            }
        });
        return depends;
    }

    /**
     * @param {string} formula
     * @returns {float|boolean}
     */
    function calcular(formula) {
        var resultado;
        try {
            var objDep = makeObjectDependency(variables);
            var f = resolverDependencia(formula, objDep);
            resultado = $interpolate("{{ " + f + " }}")();
        } catch (e) {
            throw new CalcException('danger', 'La formula no esta definida correctamente.');
        }
        return resultado;
    }

    /**
     * @param {string} variable
     * @param {string|number} value
     * @throws si la variable ya existe en la calculadora
     * @throws si la variable genera un error de referencia ciclica
     */
    function addVar(variable, value) {
        if (typeof value === "undefined") {
            value = "";
        }

        if (existVar(variable)) {
            console.warn('La variable ya esta definida.');
            throw new CalcException('warning', 'La variable ya esta definida');
        }

        var aux = angular.copy(variables);
        aux[variable] = value;

        if (!areCorrectVariables(aux)) {
            throw new CalcException('danger', cyclicDependencyIn);
        }

        variables[variable] = value;
    }

    /**
     * @param {string} variable
     * @param {string|number} value
     * @throws si value tiene una formula mal definida
     * @throws si value genera error de dependencia ciclica
     * @returns {boolean}
     */
    function editVar(variable, value) {
        if (value.trim() === "") {
            throw new CalcException('danger', 'La formula no esta definida correctamente.');
        }

        var aux = angular.copy(variables);
        aux[variable] = value;

        if (!areCorrectVariables(aux)) {
            throw new CalcException('danger', cyclicDependencyIn);
        }

        variables[variable] = value;
    }

    /**
     * Eliminar variable almacenada
     * @param {string} variable: nombre de la variable
     * @throws si la variable es dependencia de otras variables
     */
    function deleteVar(variable) {
        if (existVar(variable)) {
            if (itDependsOn(variable)) {
                throw new CalcException('danger', 'La variable ' + variable + ' no puede ser eliminada porque existen otras variables que la necesitan para realizar sus calculos.');
            } else {
                delete variables[variable];
            }
        }
    }

    return {
        variables: variables,
        existVar: existVar,
        addVar: addVar,
        editVar: editVar,
        deleteVar: deleteVar,
        calcular: calcular
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
function calculadoraDirective() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'template/calculadora.tpl.html',
        scope: {
            control: '='
        },
        controller: ['$scope', 'Calculadora', 'Slug',
            function ($scope, Calculadora, Slug) {
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
                    calcular: function (formula) {
                        return Calculadora.calcular(formula);
                    }
                };

                $scope.calcular = function () {
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

                $scope.guardar = function () {
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

                $scope.insertarAFormula = function (variable) {
                    $scope.formula = $scope.formula + variable;
                };

                $scope.borrarFormula = function () {
                    $scope.formula = "";
                };

                $scope.borrarUltimo = function () {
                    $scope.formula = $scope.formula.slice(0, -1);
                };

                $scope.keyPress = function (key) {
                    $scope.formula += key;
                };

                $scope.update = function () {
                    alertClear();
                    Calculadora.editVar($scope.editVar, $scope.formula);
                    $scope.alert.warning = Calculadora.notificaciones.warning;
                    $scope.alert.danger = Calculadora.notificaciones.danger;
                    $scope.alert.info = Calculadora.notificaciones.info;
                    $scope.modoNormal();
                };

                $scope.editar = function (variable) {
                    if (!$scope.modoEdicion) {
                        formulaAux = $scope.formula;
                        $scope.formula = $scope.variables[variable];
                    }
                    $scope.modoEdicion = true;
                    $scope.editVar = variable;
                    $scope.calcular();
                };

                $scope.eliminar = function (variable) {
                    alertClear();
                    Calculadora.deleteVar(variable);
                    $scope.alert.warning = $scope.alert.warning.concat(Calculadora.notificaciones.warning);
                    $scope.alert.danger = $scope.alert.danger.concat(Calculadora.notificaciones.danger);
                };

                $scope.modoNormal = function () {
                    $scope.modoEdicion = false;
                    $scope.editVar = "";
                    $scope.formula = formulaAux;
                    $scope.calcular();
                };

                $scope.clearAlert = function () {
                    alertClear();
                };
            }
        ],
        link: function (scope) {
            scope.externalControl = scope.control || {};
            scope.externalControl.toEdit = function (variable) {
                if (typeof scope.variables[variable] !== "undefined") {
                    scope.modoNormal();
                    scope.editar(variable);
                }
            };
        }
    };
}
angular.module('calculadora').directive('calculadora', calculadoraDirective);


})(window, angular);