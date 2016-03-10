describe('Prueba del Servicio de la Calculadora', function() {

    var calc;

    beforeEach(module('calculadora'));

    beforeEach(inject(function($injector){
        calc = $injector.get('Calculadora');
    }));

    it('Agregando variables a la calculadora', function() {
        calc.addVar("sueldo_basico", "4657.89");
        calc.addVar("a", "b");
        calc.addVar("b", "c");
        expect(Object.keys(calc.variables).length).toEqual(3);
        expect(calc.addVar("c", "a")).toBe(false);
        expect(Object.keys(calc.variables).length).toEqual(3);
    });

    it('Prueba de calculo de formulas que esta en dependencia con otras variables', function() {
        // Ejemplo: 
        //     variables: {
        //          'A': '45.54',
        //          'B': 'A + 2',
        //          'C': 'B * A'
        //     }
        //   Se realizan las pruebas para buscar el resultado de la formula 'B * A'
        calc.addVar("A", "45.54");
        calc.addVar("B", "A+2");
        calc.addVar("C", "B*A");
        resultado = calc.calcular(calc.variables.C);
        expect(parseFloat(resultado)).toEqual((45.54+2)*(45.54));
        resultado = calc.calcular('A+B+C');
        expect(parseFloat(resultado)).toEqual(45.54+(45.54+2)+((45.54+2)*45.54));
    });

    it('Editando variables de la calculadora', function() {
        calc.addVar("A", "45.54");
        calc.editVar("A", "123.456");
        // TODO: Mejorar la funcionalidad de edición para no permitir agregar formulas
        // con dependencias que no existen dentro de las variables. 
        // calc.editVar("A", "123.456+f");
        expect(Object.keys(calc.variables).length).toEqual(1);
        expect(calc.variables.A).toEqual("123.456");
    });

    it('Eliminando variables de la calculadora', function() {
        calc.addVar('A', '456');
        calc.addVar('B', 'A+123');
        calc.deleteVar('A');
        expect(Object.keys(calc.variables).length).toEqual(2);
        calc.deleteVar('B');
        calc.deleteVar('A');
        expect(Object.keys(calc.variables).length).toEqual(0);
    });

});