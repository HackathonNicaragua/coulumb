// Variables del mapa //
var Mapa = null; 

 // Inicializacion del mapa
 function InicializarMapa() 
 {
        Mapa = new google.maps.Map(document.getElementById('Mapa'), 
        {
          center: {lat: 12.1436131, lng: -86.2607103},
          zoom: 15
        });
 }


 function DelimitarMapa()
 {
 	  var Rectangulo = new google.maps.Rectangle(
 	  {
          strokeColor: '#FF0000',
          strokeOpacity: 0.4,
          strokeWeight: 6,
          fillColor: '#FF0000',
          fillOpacity: 0,
          map: Mapa,
          bounds: Mapa.getBounds()
      });

 	   google.maps.event.addListener(Rectangulo, 'rightclick', function(event) 
 	   {
            // Poner aqui metodo para poner el mapa
       });
 }

 

function LatLngAPunto(latLngPunto) 
{
  var TopeDerecha = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getNorthEast());
  var IzquierdaInferior = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getSouthWest());
  var Escala = Math.pow(2, Mapa.getZoom());
  var CoordenadaMundo = Mapa.getProjection().fromLatLngToPoint(LatLngPunto);
  return new google.maps.Point((CoordenadaMundo.x - IzquierdaInferior.x) * Escala, (CoordenadaMundo.y - TopeDerecha.y) * Escala);
}

function PuntoALatLng(Punto) 
{
  var TopeDerecha = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getNorthEast());
  var IzquierdaInferior = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getSouthWest());
  var Escala = Math.pow(2, Mapa.getZoom());
  var CoordenadaMundo = new google.maps.Point(Punto.x / Escala + IzquierdaInferior.x, Punto.y / Escala + TopeDerecha.y);
  return Mapa.getProjection().fromPointToLatLng(CoordenadaMundo);
}


