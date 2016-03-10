angular.module('calculadora.templates', ['template/calculadora.tpl.html']);

angular.module("template/calculadora.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/calculadora.tpl.html",
    "<div class=\"row well\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <!-- Modo Normal -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label ng-hide=\"modoEdicion\">Formula:</label>\n" +
    "            <label ng-show=\"modoEdicion\">{{ editVar }}:</label>\n" +
    "            <div class=\"input-group\">\n" +
    "              <input type=\"text\" class=\"form-control input-lg\" ng-model=\"formula\" spellcheck=\"false\">\n" +
    "              <div class=\"input-group-btn\">\n" +
    "                <button class=\"btn btn-default input-lg\" type=\"button\" ng-click=\"calcular()\">=</button>\n" +
    "                <button class=\"btn btn-default input-lg dropdown-toggle\" data-toggle=\"dropdown\" ng-hide=\"modoEdicion\">\n" +
    "                  <span class=\"caret\"></span>\n" +
    "                  <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu dropdown-menu-right\">\n" +
    "                  <li><a data-toggle=\"collapse\" href=\"#collapseSaveFormula\"><i class=\"glyphicon glyphicon-floppy-disk\"></i> Guardar Formula</a></li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div style=\"height: 1px; position: relative; z-index: 2000;\">\n" +
    "          <div class=\"collapse\" id=\"collapseSaveFormula\" style=\"box-shadow: black 0px 0px 40px -10px;\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "              <div class=\"panel-heading\">Guardar Formula</div>\n" +
    "              <div class=\"panel-body\">\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label>Nombre de Variable</label>\n" +
    "                  <input type=\"text\" class=\"form-control\" ng-model=\"nombreVariable\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group text-center\">\n" +
    "                  <button data-toggle=\"collapse\" href=\"#collapseSaveFormula\" ng-click=\"guardar()\">Guardar</button>\n" +
    "                  <button data-toggle=\"collapse\" href=\"#collapseSaveFormula\">Cancelar</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row form-group\">\n" +
    "            <!-- Teclas de Variables -->\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <legend>Variables</legend>\n" +
    "                <div ng-repeat=\"(key, value) in variables\" style=\"margin-bottom: 3px;\">\n" +
    "                    <div class=\"btn-group\">\n" +
    "                      <button type=\"button\" class=\"btn btn-info\" ng-click=\"insertarAFormula(key)\">{{ key }}</button>\n" +
    "                      <button type=\"button\" ng-hide=\"modoEdicion\" class=\"btn btn-info dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                        <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "                      </button>\n" +
    "                      <ul class=\"dropdown-menu\">\n" +
    "                        <li class=\"text-center\">Valor: {{ Calc.calcular(value) }}</li>\n" +
    "                        <li role=\"separator\" class=\"divider\"></li>\n" +
    "                        <li><a href=\"#\" ng-click=\"editar(key)\"><i class=\"glyphicon glyphicon-pencil text-primary\"></i> Editar</a></li> \n" +
    "                        <li><a href=\"#\" ng-click=\"eliminar(key)\"><i class=\"glyphicon glyphicon-trash text-danger\"></i> Eliminar</a></li> \n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- Teclado Numerico -->\n" +
    "            <div class=\"col-sm-6\">\n" +
    "              <div class=\"form-inline form-group text-right\">\n" +
    "                  <label for=\"\">Resultado</label>\n" +
    "                  <input type=\"text\" ng-model=\"resultado\" class=\"form-control text-right\" disabled>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <button>7</button><button>8</button><button>9</button><button>/</button><button>(</button> <br>\n" +
    "                <button>4</button><button>5</button><button>6</button><button>*</button><button>)</button> <br>\n" +
    "                <button>1</button><button>2</button><button>3</button><button>-</button> <br>\n" +
    "                <button>0</button><button>+</button><button ng-click=\"calcular()\">=</button>\n" +
    "              </div>\n" +
    "              <!-- Modo Edición -->\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"col\">\n" +
    "                  <div ng-show=\"modoEdicion\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <button ng-click=\"update()\">Guardar cambios</button>\n" +
    "                        <button ng-click=\"modoNormal()\">Modo Normal</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <!-- Alert Success -->\n" +
    "        <div ng-show=\"alert.success.length > 0\" class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
    "          <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "          <strong>Todo bien!</strong>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"msj in alert.success\">{{ msj }}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Alert Danger -->\n" +
    "        <div ng-show=\"alert.danger.length > 0\" class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
    "          <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "          <strong>Algo salio mal</strong>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"msj in alert.danger\">{{ msj }}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Alert Info -->\n" +
    "        <div ng-show=\"alert.info.length > 0\" class=\"alert alert-info alert-dismissible\" role=\"alert\">\n" +
    "          <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "          <strong>Información</strong>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"msj in alert.info\">{{ msj }}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Alert Info -->\n" +
    "        <div ng-show=\"alert.warning.length > 0\" class=\"alert alert-warning alert-dismissible\" role=\"alert\">\n" +
    "          <button ng-click=\"clearAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "          <strong>Precaución</strong>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"msj in alert.warning\">{{ msj }}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
