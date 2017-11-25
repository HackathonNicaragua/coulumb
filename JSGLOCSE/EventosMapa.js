// Variables del mapa //
var Mapa = null; 

 // Inicializacion del mapa
 function InicializarMapa() 
 {
        Mapa = new google.maps.Map(document.getElementById('Mapa'), 
        {
          center: {lat: 12.1436131, lng: -86.2607103},
          zoom: 8
        });
 }