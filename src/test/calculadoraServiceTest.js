describe('Prueba del Servicio de la Calculadora', function() {

    var service;

    beforeEach(module('calculadora'));

    beforeEach(inject(function($injector){
        service = $injector.get('Calculadora');
    }));

    it('Agregando variables a la calculadora', function() {
        
    });

    it('Editando variables de la calculadora', function() {
        
    });

    it('Eliminando variables de la calculadora', function() {
        
    });

});