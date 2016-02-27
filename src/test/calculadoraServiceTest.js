describe('Prueba del Servicio de la Calculadora', function() {

    var service;

    beforeEach(module('calculadora'));

    beforeEach(inject(function($injector){
        service = $injector.get('Calculadora');
    }));

    it('Obteniendo valores de variables del servicio', function() {
        expect(service.variables.a).toEqual(1);
        expect(service.variables.b).toEqual(2);
    });
});