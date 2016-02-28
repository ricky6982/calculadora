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

    it('Editando variables de la calculadora', function() {
        
    });

    it('Eliminando variables de la calculadora', function() {
        
    });

});