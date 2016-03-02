describe('Prueba de funciones de la libreria Toposort', function() {
    it('Verificación de Referencia ciclicas', function() {
        var graph = [
            ['a', 'b'],
            ['b', 'c'],
            ['c', 'e'],
            ['e', 'g']
        ];

        expect(hasCyclicDependency(graph)).toBe(false);
        expect(cyclicDependencyIn).toBe('');

        graph.push(['e', 'a']);
        expect(hasCyclicDependency(graph)).toBe(true);
        expect(cyclicDependencyIn).toEqual('Referencia ciclica en "e"');
    });

    it('Conversion de Objeto a Array - funcion makeGraph()', function() {
        var obj = {
            a: ['b', 'c', 'd'],
            b: ['e'],
        };

        var arrayEsperado = [
            ['b','a'],
            ['c','a'],
            ['d','a'],
            ['e','b'],
        ];

        expect(makeGraph(obj)).toContain(arrayEsperado[0]);
        expect(makeGraph(obj)).toContain(arrayEsperado[1]);
        expect(makeGraph(obj)).toContain(arrayEsperado[2]);
        expect(makeGraph(obj)).toContain(arrayEsperado[3]);

        expect(hasCyclicDependency(makeGraph(obj))).toBe(false);
    });

    it('Extracción de variables para armar el Objeto con las dependencias', function() {
        var variables = {
            sueldo_basico: "4 + 648",
            jubilacion: "sueldo_basico * 3 / 100",
            antiguedad: "sueldo_basico * 8 / 100",
            redondeo: "489.54654",
            otro: "sueldo_basico + jubilacion * 4564.5400 + antiguedad * redondeo"
        };

        objDep = makeObjectDependency(variables);
        expect(objDep.sueldo_basico).toEqual([]);
        expect(objDep.jubilacion).toEqual(["sueldo_basico"]);
        expect(objDep.antiguedad).toEqual(["sueldo_basico"]);
        expect(objDep.otro).toEqual(["sueldo_basico", "jubilacion", "antiguedad", "redondeo"]);

        graph = makeGraph(objDep);
        expect(hasCyclicDependency(graph)).toBe(false);
    });

    // TODO: Implementar las pruebas para la funcion getDependencies();
    xit('Obtener las dependencias que tiene una formula', function() {
        
    });
});