describe('Prueba del Servicio de la Calculadora', function () {

    var calc;

    beforeEach(module('calculadora'));

    beforeEach(inject(function ($injector) {
        calc = $injector.get('Calculadora');
    }));

    it('Verificar si existe una variable definida en la calculadora.', function () {
        calc.addVar('a', '10');
        expect(calc.existVar('a')).toBeTruthy();
    });

    it('Una variable que no existe en la calculadora debe devolver falso.', function () {
        expect(calc.existVar('a')).toBeFalsy();
    });

    it('Calculo de formulas que esta en dependencia con variables', function () {
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

        var resultado;
        resultado = calc.calcular(calc.variables.C);
        expect(parseFloat(resultado)).toEqual((45.54 + 2) * (45.54));
        resultado = calc.calcular('A+B+C');
        expect(parseFloat(resultado)).toEqual(45.54 + (45.54 + 2) + ((45.54 + 2) * 45.54));
    });

    it('Calculo de Formula incorrecta debe lanzar excepción.', function () {
        calc.addVar('A', '100');
        expect(function () {
            calc.calcular('(A + A');
        }).toThrow();
    });

    it('Agregar variables a la calculadora', function () {
        calc.addVar("sueldo_basico", "4657.89");
        calc.addVar("a", "b");
        calc.addVar("b", "c");
        expect(Object.keys(calc.variables).length).toEqual(3);
    });

    it('Agregar variable que genera redundancia ciclica debe lanzar excepcion', function () {
        calc.addVar('a', 'b');
        calc.addVar('b', 'c');
        expect(Object.keys(calc.variables).length).toEqual(2);
        expect(function () {
            calc.addVar('c', 'a');
        }).toThrow();
        expect(Object.keys(calc.variables).length).toEqual(2);
    });

    it('Agregar variable duplicada debe lanzar excepcion', function () {
        calc.addVar('a', '100');
        expect(function () {
            calc.addVar('a', '200');
        }).toThrow();
        expect(Object.keys(calc.variables).length).toEqual(1);
    });

    it('Editar variable de la calculadora', function () {
        calc.addVar("A", "45.54");
        calc.editVar("A", "123.456");

        expect(Object.keys(calc.variables).length).toEqual(1);
        expect(calc.variables.A).toEqual("123.456");
    });

    it('Editar el valor de variable con un valor vacio deberia arrojar excepción', function () {
        calc.addVar("A", "10.10");
        expect(function () {
            calc.editVar('A', '');
        }).toThrow();
    });

    it('Editar variable con un valor que genera redundancia tecnica deberia arrojar excepción', function () {
        calc.addVar('A', '1');
        expect(function () {
            calc.editVar('A', 'A');
        }).toThrow();
    });

    it('Eliminar variables de la calculadora', function () {
        calc.addVar('A', '456');
        calc.addVar('B', 'A+123');
        calc.deleteVar('B');
        expect(Object.keys(calc.variables).length).toEqual(1);
        calc.deleteVar('A');
        expect(Object.keys(calc.variables).length).toEqual(0);
    });

    it('Eliminar variable que esta en dependencia de otras deberia lanzar excepción', function () {
        calc.addVar('A', '456');
        calc.addVar('B', 'A+123');
        expect(function () {
            calc.deleteVar('A');
        }).toThrow();
    });
});