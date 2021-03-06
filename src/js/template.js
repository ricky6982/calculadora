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
