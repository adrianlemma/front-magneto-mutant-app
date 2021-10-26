****** README: front-magneto-mutant-app *******

Front-End desarrollado con HTML, CSS, Javascript, PHP para facilitar las pruebas de la API

Repositorio de GitHub:
	https://github.com/adrianlemma/front-magneto-mutant-app

*URL: https://front-magneto-mutant-app.herokuapp.com/
	Desplegado sobre Heroku tambien, a fin de tener todo el contenido junto

--------------------------------------------------------------------------------------------------------------------
	
Funciones:
	Por medio de la API, se pueden agregar nuevos registros y consultar los estados actuales

--------------------------------------------------------------------------------------------------------------------

Validacones:
	Se repiten las validaciones de la API en cuanto a la validez de un ADN (matriz cuadrada de, minimo, 4x4)
	La duplicidad de registros, clasificación y consulta de estados se realiza a travez de la API

--------------------------------------------------------------------------------------------------------------------

Modo de uso:
	La idea es que el usuario ingrese uno a uno, los strings que componen la matriz del ADN, por esto
	El largo del primer string ingresado, se tomará como dimencion de la matriz (NxN) por lo que cada 
	String ingresado, debe ser de la misma longitud que el anterior, y cuando se complete la matriz, 
	Se grisará el botón "Add" y se habilitará el boton "Send".
	Luego de enviar los datos con "Send" y despues de ver un mensaje con el resultado de la operacion, 
	La aplicación volverá a su estado inicial.
	La función de Stats puede invocarse en cualquier momento independientemente del ingreso de datos y 
	NO afectará la carga de datos en curso.

--------------------------------------------------------------------------------------------------------------------

Nota:
	Se puede ver que hay 2 archivos Index (uno en HTML y el otro en PHP) esto es porque el sistema de Heroku, 
	No interpreta HTML directamente, por esto, el index.php solo sirve para cargar el index.html
	Se realizaron todas las funciones en un solo archivo de Javascript ya que esta aplicación, esta pensada
	Solo para complementar al servicio rest.