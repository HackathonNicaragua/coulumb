// Variables del mapa //
var Mapa = null;
var Rectangulo = null;
var UltimoCentro = null;
var CondicionZoom =false;
var ZoomEscucha = false;
var ZoomBordes;
var Bordes;
var ZoomMinimo;
var referencia = null;
var letras = ['A','B','C','D','E','F','G','H','I','J'];
var numpin = 0;
var url1 = ['https://k60.kn3.net/9/7/7/1/F/F/EC8.png',
           'https://k60.kn3.net/A/9/6/F/4/2/E48.png',
           'https://k60.kn3.net/8/3/F/5/3/E/8FD.png',
           'https://k60.kn3.net/7/0/1/8/8/1/B61.png',
           'https://k60.kn3.net/C/1/6/8/C/C/886.png',
           'https://k60.kn3.net/8/9/A/9/0/1/F2E.png',
           'https://k60.kn3.net/8/6/7/C/F/E/498.png',
           'https://k60.kn3.net/2/5/1/F/E/5/57F.png',
           'https://k60.kn3.net/3/2/C/A/2/7/EB4.png',
           'https://k60.kn3.net/4/4/5/4/7/1/DA7.png']
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
 function DelimitarMapa(Parametro)
 {
 	if(Parametro == 0)
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
	           
	            if(Proyecciones[ProyeccionActiva].Contador < 10)
	            {
	              AnadirMarcador();
	              Proyecciones[ProyeccionActiva].Contador++;	            }
	      });

	}
	else
	{
		 Rectangulo.setMap(null);
		 Rectangulo = null;
	}
 }

 function AnadirMarcador()
 {
        var myLatlng = PuntoALatLng({
          x: posicionx,
          y: posiciony
        });

        var image = {
          url: url1[Proyecciones[ProyeccionActiva].Contador]
        };

        var marker = new google.maps.Marker({
          position: myLatlng,
          title: letras[Proyecciones[ProyeccionActiva].Contador]+"1",
          draggable: true,
          icon: image.url,
          map:Mapa,
          animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', function() 
        {
          OperacionesTabla(3,Indice(marker.title).Horas);
          $('#ContenedorEmergente').show(500);
          document.getElementById('ctitulo').innerHTML = 'Consumidor '+ marker.title;
          document.getElementById('ContenedorEmergente').style.left = posicionx + 'px';
          document.getElementById('ContenedorEmergente').style.top = posiciony + 'px';
          document.getElementById('clatitud').value = marker.getPosition().lat();
          document.getElementById('clongitud').value = marker.getPosition().lng();
          var posicion =  LatLngAPunto(marker.getPosition());
          document.getElementById('ccoordenadas').value = posicion.x + ", " + posicion.y;

          if(Indice(marker.title).Categoria == 1 ){
            document.getElementById('Cat1CentroEventual').checked = true;
          }else if(Indice(marker.title).Categoria == 2 ){
            document.getElementById('Cat2CentroEventual').checked = true;
          }else if(Indice(marker.title).Categoria == 3 ){
            document.getElementById('Cat3CentroEventual').checked = true;
          }
          referencia = marker;


        });

        google.maps.event.addListener(marker,'drag',function()
        {
        		if(Proyecciones[ProyeccionActiva].ElipseDibujada = true)
        		{
        			var referencia = Indice(marker.title);
        			referencia.X = LatLngAPunto(marker.getPosition()).x;
        			referencia.Y = LatLngAPunto(marker.getPosition()).y;
        			Centros_Eventuales(1,ProyeccionActiva);
        		};
        });
        Proyecciones[ProyeccionActiva].MarcadoresCollecion.push({Marcador : marker , Titulo : marker.title,Horas : OperacionesTabla(2, null) , X:posicionx, Y:posiciony, Categoria: 1});
 }


function OperacionesTabla(Caso, Arreglo) 
{
    var Potencias = []
    /*Lectura de las potencias */
    if (Caso == 1) {
        for (var I = 0; I <= 23; I++) {
            Potencias[I] = document.getElementById('tablapotencias').rows[1].cells[I].innerHTML;
        }
        return Potencias;
    }
    /*Reinicia las potencias */
    else if (Caso == 2) {
        for (var I = 0; I <= 23; I++) {
            Potencias.push('0');
        }
        return Potencias;
    }
    else {
        /*Actualiza las tablas de potencia */
        for (var I = 0; I <= 23; I++) {

            document.getElementById('tablapotencias').rows[1].cells[I].innerHTML = Arreglo[I];
        }
    }
}

 function Indice(title)
 {
   var referencia;
   for (var i = 0; i < Proyecciones[ProyeccionActiva].MarcadoresCollecion.length; i++)
   {
     if(Proyecciones[ProyeccionActiva].MarcadoresCollecion[i].Titulo == title)
     {
        referencia = Proyecciones[ProyeccionActiva].MarcadoresCollecion[i];
        break;
     }
   }
   return referencia;
 }


// Potencias aleatorias

function PotenciasAleatorias()
{
	for (var I = 0; I < Proyecciones[ProyeccionActiva].MarcadoresCollecion.length; I++) 
	{
		for (var J = 0; J <= 23; J++) 
		{
			Proyecciones[ProyeccionActiva].MarcadoresCollecion[I].Horas[J] = Math.floor((Math.random() * 100) + 1);
		}
	}
}

// Metodos para hacer operaciones de conversiones de coordenada

//Convierte un objeto de latitudlongitud a coordenada x e y
function LatLngAPunto(latLngPunto)
{
  var TopeDerecha = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getNorthEast());
  var IzquierdaInferior = Mapa.getProjection().fromLatLngToPoint(Mapa.getBounds().getSouthWest());
  var Escala = Math.pow(2, Mapa.getZoom());
  var CoordenadaMundo = Mapa.getProjection().fromLatLngToPoint(latLngPunto);
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

