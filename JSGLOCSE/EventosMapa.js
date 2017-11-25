// Variables del mapa //
var Mapa = null;
var Rectangulo = null;
var UltimoCentro = null;
var CondicionZoom =false;
var ZoomEscucha = false;
var ZoomBordes;
var Bordes;
var ZoomMinimo;
 // Inicializacion del mapa
 function InicializarMapa() 
 {
   
    Mapa = new google.maps.Map(document.getElementById('Mapa'), 
    {
      center: {lat: 12.1436131, lng: -86.2607103},
      zoom: 15
    });

        	
    google.maps.event.addListener(Mapa, 'center_changed', function () 
    {
        if (Rectangulo != null) {

            if ((Bordes.contains(Mapa.getBounds().getNorthEast())) == true && (Bordes.contains(Mapa.getBounds().getSouthWest()) == true)) {
                UltimoCentro = Mapa.getCenter();
            }
            else {
                Mapa.panTo(UltimoCentro);
            }
        }
    });

    // Validacion de zoom para que no se salga del extremo del rectangulo en caso de que este muy cerca del borde
	ZoomEscucha = google.maps.event.addListener(Mapa, 'zoom_changed', function (event) 
    {
        if (Mapa.getZoom() >= ZoomMinimo) 
        {
            ZoomBordes = google.maps.event.addListenerOnce(Mapa, 'bounds_changed', function (event) 
            {
                if (Rectangulo != null) 
                {
                    if (CondicionZoom == false)
                        if ((Bordes.contains(Mapa.getBounds().getNorthEast())) == false || (Bordes.contains(Mapa.getBounds().getSouthWest()) == false)) 
                        {
                            CondicionZoom = true;
                            Mapa.fitBounds(Bordes);
                            CondicionZoom = true;
                            Mapa.setZoom(ZoomMinimo);
                        }
                    CondicionZoom = false;
                }
            });
    	}
        else 
        {
            Mapa.setZoom(ZoomMinimo);
        }
    });

 }



 // Delimita el mapa impidiendo que el usuario se mueva fuera de los limites
 function DelimitarMapa()
 {
 	  Rectangulo = new google.maps.Rectangle(
 	  {
          strokeColor: '#FF0000',
          strokeOpacity: 0.4,
          strokeWeight: 6,
          fillColor: '#FF0000',
          fillOpacity: 0,
          map: Mapa,
          bounds: Mapa.getBounds()
      });

 	  Bordes = Mapa.getBounds();
 	  ZoomMinimo = Mapa.getZoom();
 	  UltimoCentro = Mapa.getCenter();
 	  google.maps.event.addListener(Rectangulo, 'rightclick', function(event) 
 	  {
            // Poner aqui metodo para poner el mapa
      });
 }

 





// Metodos para hacer operaciones de conversiones de coordenada

//Convierte un objeto de latitudlongitud a coordenada x e y
function LatLngAPunto(latLngPunto) 
{
  var TopeDerecha = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getNorthEast());
  var IzquierdaInferior = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getSouthWest());
  var Escala = Math.pow(2, Mapa.getZoom());
  var CoordenadaMundo = Mapa.getProjection().fromLatLngToPoint(LatLngPunto);
  return new google.maps.Point((CoordenadaMundo.x - IzquierdaInferior.x) * Escala, (CoordenadaMundo.y - TopeDerecha.y) * Escala);
}

// Convierte una coordenada x e y a un punto en el mapa
function PuntoALatLng(Punto) 
{
  var TopeDerecha = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getNorthEast());
  var IzquierdaInferior = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getSouthWest());
  var Escala = Math.pow(2, Mapa.getZoom());
  var CoordenadaMundo = new google.maps.Point(Punto.x / Escala + IzquierdaInferior.x, Punto.y / Escala + TopeDerecha.y);
  return Mapa.getProjection().fromPointToLatLng(CoordenadaMundo);
}


