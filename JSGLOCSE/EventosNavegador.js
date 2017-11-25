// Creacion de las variables a utilizar en el sistema
var Mapa = null;
var NE = null;
var NW = null;
var SE = null;
var SW = null; 

// Evento de carga de la pagina 
$( document ).ready(function() 
{
	// Inicializamos el mapa
 	InicializarMapa();

 	// Puntos Cardinales
    NE = Mapa.getBounds().getNorthEast();
	SW = Mapa.getBounds().getSouthWest();		
	NW = new google.maps.LatLng(NE.lat(),SW.lng());		
	SE = new google.maps.LatLng(SW.lat(),NE.lng()); 



 	// Recogemos las referencias de los elementos del DOM

 	$('#LimitarMapa').click(function()
 	{
 		DelimitarMapa();	
 	});

});