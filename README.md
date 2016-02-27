Calculadora con variables
=========================

Requerimientos de la calculadora
 - Setear variables -> no permite variables con nombres repetidos
 - Evaluar formular -> Boton Calcular
 - una formula se almacena en una variable

La calculadora tendra un contexto en el cual se almacenan todas las variables y formulas (tambien variables), de tal modo que se pueden utilizar las formulas creadas para crear otra formula.
 - Problema: Que pasa si se elimina la formula y esta esta siendo utilizada por otra formula?

 Al abrir la calculadora estará asociada a una formula si o si, es decir, la calculadora edita una variable guardada en su contexto:
    calc.variables = [
        "sueldo_basico": {
            "formula": "4567.50"
            "resultado": 4567.50 -> ???
        },
        "jubilacion": {
            "formula": "sueldo_basico * 3/100"
            "resultado": 137.025 -> ???
        }
    ]

Declaración de Servicio en Angular
----------------------------------

El servicio permitira inicializar las variables, por ejemplo en un caso de edición, cuando el usuario ya almaceno los datos en una DB. 

Almacenará todas las variables para realizar los diferentes calculos en diferentes formulas. 

Cada formular podra abrir la calculadora y editar su valor para realizar el calculo. 
    
    Operaciones:
        - Crear Nueva Variable almacenada en:
            valor = {
                "sueldo_basico": 123.45,
                "jubilacion": "(123.45) * 8/100 * valor.jubilacion",
                "prueba": "valor.prueba2",
                "prueba2": "valor.jubilacion"
            }
        - Cambiar nombre de variable:
            "sueldo_basico" --> "aguinaldo"
            1- Verificar que la nueva variable no este definida, en caso de que este definida informa que no se puede cambiar el nombre
            2- Si el nuevo nombre no esta definido, crear la nueva variable con el valor de la variable original.
            3- Sustituir el nombre en todas las cadenas que encuentren el mismo nombre.
            4- Eliminar la variable original
        - Eliminar variable:
            1- Buscar referencias a la variable
            2- Si hay referencias no eliminar la variable
            3- Si No hay referencias eliminar la variable
        - Guardar Formula:
            1- Normalizar la formula para futuros cambios
                ej: agregar encerrar a cada variable entre ()

PROBLEMAS DETECTADOS
    Referencias Circulares


Directiva Calculadora
---------------------
    Muestra la calculadora con los botones numericos y operaciones, un listado con las variables disponibles para operar, un campo para editar la formula y un campo para ver el resultado.

Directiva Campo con boton para abrir la calculadora
---------------------------------------------------
    Muestra un campo input numerico, con un boton para abrir la calculadora y editar la formula, el campo numerico es el valor de la formula al iniciar. 
    El campo numerico tendra dos estados:
      - Editable cuando la formula solo tiene un valor numerico
      - No Editable cuando la formula es compuesta
