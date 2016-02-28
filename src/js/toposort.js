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

