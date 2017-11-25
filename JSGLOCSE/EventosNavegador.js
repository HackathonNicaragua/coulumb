// Creacion de las variables a utilizar en el sistema
var Mapa = null;
var DropDownLimitarMapa = null;
// Evento de carga de la pagina 
$( document ).ready(function() 
{
	// Inicializamos el mapa
 	InicializarMapa();

 	// Recogemos las referencias de los elementos del DOM
 	DropDownLimitarMapa = document.getElementById('LimitarMapa');

 	$('#LimitarMapa').click(function()
 	{
 		DelimitarMapa();	
 	});

});