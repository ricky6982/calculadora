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
