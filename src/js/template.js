angular.module('calculadora.templates', ['template/calculadora.tpl.html']);

angular.module("template/calculadora.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/calculadora.tpl.html",
    "<div class=\"row well\">\n" +
    "    <h1>Calculadora</h1>\n" +
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
    "    </div>\n" +
    "</div>");
}]);
