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
var listmarker = [];
var letras = ['A','B','C','D','E','F','G','H','I','J'];

var PinConsumidores = [];
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




        // Create the search box and link it to the UI element.
        var input = document.getElementById('BusquedaLugar');
        var searchBox = new google.maps.places.SearchBox(input);

        // Bias the SearchBox results towards current map's viewport.
        Mapa.addListener('bounds_changed', function() {
          searchBox.setBounds(Mapa.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: Mapa,
              animation: google.maps.Animation.DROP,
              icon: 'https://k60.kn3.net/B/D/7/7/8/4/8FC.png',
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          Mapa.fitBounds(bounds);
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
      

        var marker = new google.maps.Marker({
          position: myLatlng,
          title: letras[Proyecciones[ProyeccionActiva].Contador]+"1",
          draggable: true,
	      icon: Proyecciones[ProyeccionActiva].url[Proyecciones[ProyeccionActiva].Contador],
          map:Mapa,
          animation: google.maps.Animation.DROP,
          visible: true
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

 function MuestraOcultaC(statu){
        //recorremos todos los markes de la lista
        for(i=0;Proyecciones[ProyeccionActiva].MarcadoresCollecion.length;i++){
                    //comparamos si el marker actual en el recorrido es visible
            if(Proyecciones[ProyeccionActiva].MarcadoresCollecion[i].Marcador == null)
            {
              Proyecciones[ProyeccionActiva].MarcadoresCollecion[i].Marcador.setMap(statu);
            }else {
              Proyecciones[ProyeccionActiva].MarcadoresCollecion[i].Marcador.setMap(statu);
            }
        }
}

function MuestraOcultaCE(statu){
       //recorremos todos los markes de la lista
       for(i=0;Proyecciones[ProyeccionActiva].CentrosEventuales.length;i++){
                   //comparamos si el marker actual en el recorrido es visible
           if(Proyecciones[ProyeccionActiva].CentrosEventuales[i].Marcador == null)
           {
             Proyecciones[ProyeccionActiva].CentrosEventuales[i].Marcador.setMap(statu);
           }else {
             Proyecciones[ProyeccionActiva].CentrosEventuales[i].Marcador.setMap(statu);
           }
       }
}

function MuestraOcultaE(statu){
       //recorremos todos los markes de la lista
       for(i=0;i<=2;i++){
                   //comparamos si el marker actual en el recorrido es visible
           if(Proyecciones[i].Elipse == null)
           {
             if(Proyecciones[i].Elipse != null){
                Proyecciones[i].Elipse.setMap(statu);
              }
             Proyecciones[i].CentroElipse.setMap(statu);
           }else {
             Proyecciones[i].Elipse.setMap(statu);
             Proyecciones[i].CentroElipse.setMap(statu)
           }
       }
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
  var TopeDerecha = Mapa.getProjection().fromLatLngToPoint(Rectangulo.getBounds().getNorthEast());
  var IzquierdaInferior = Mapa.getProjection().fromLatLngToPoint(Rectangulo.getBounds().getSouthWest());
  var Escala = Math.pow(2, Mapa.getZoom());
  var CoordenadaMundo = Mapa.getProjection().fromLatLngToPoint(latLngPunto);
  return new google.maps.Point((CoordenadaMundo.x - IzquierdaInferior.x) * Escala, (CoordenadaMundo.y - TopeDerecha.y) * Escala);
}

// Convierte una coordenada x e y a un punto en el mapa
function PuntoALatLng(Punto)
{
  var TopeDerecha = Mapa.getProjection().fromLatLngToPoint(Rectangulo.getBounds().getNorthEast());
  var IzquierdaInferior = Mapa.getProjection().fromLatLngToPoint(Rectangulo.getBounds().getSouthWest());
  var Escala = Math.pow(2, Mapa.getZoom());
  var CoordenadaMundo = new google.maps.Point(Punto.x / Escala + IzquierdaInferior.x, Punto.y / Escala + TopeDerecha.y);
  return Mapa.getProjection().fromPointToLatLng(CoordenadaMundo);
}




/* Muestra en pantalla todos los consumidores por su categoria */
function MostrarConsumidores(Coordenadas, MapaCanvas) {
    VentanaInformacion = new google.maps.InfoWindow({ content: '' });
    var Servicio = new google.maps.places.PlacesService(Mapa);
    var Tipos = ['accounting', 'airport', 'amusement_park', 'aquarium', 'art_gallery', 'atm', 'bakery', 'bank', 'bar', 'beauty_salon', 'bicycle_store', 'book_store', 'bowling_alley', 'bus_station', 'cafe', 'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'cemetery', 'church', 'city_hall', 'clothing_store', 'convenience_store', 'courthouse', 'dentist', 'department_store', 'doctor', 'electrician', 'electronics_store', 'embassy', 'fire_station', 'florist', 'funeral_home', 'furniture_store', 'gas_station', 'gym', 'hair_care', 'hardware_store', 'hindu_temple', 'home_goods_store', 'hospital', 'insurance_agency', 'jewelry_store', 'laundry', 'lawyer', 'library', 'liquor_store', 'local_government_office', 'locksmith', 'lodging', 'meal_delivery', 'meal_takeaway', 'mosque', 'movie_rental', 'movie_theater', 'moving_company', 'museum', 'night_club', 'painter', 'park', 'parking', 'pet_store', 'pharmacy', 'physiotherapist', 'plumber', 'police', 'post_office', 'real_estate_agency', 'restaurant', 'roofing_contractor', 'rv_park', 'school', 'shoe_store', 'shopping_mall', 'spa', 'stadium', 'storage', 'store', 'subway_station', 'synagogue', 'taxi_stand', 'train_station', 'transit_station', 'travel_agency', 'university', 'veterinary_care', 'zoo'];


    var PinesCategoria = ['https://k60.kn3.net/A/B/1/4/6/2/630.png', 'https://k61.kn3.net/5/1/5/F/8/B/19F.png', 'https://k60.kn3.net/D/9/7/A/5/F/A3F.png'];
    for (I = 0; I < Tipos.length; I++) {
        Servicio.nearbySearch({
            location: UltimoCentro,
            radius: ZoomMinimo * 250,
            types: [Tipos[I]]
        }, EstadoBusqueda);
    }
    function EstadoBusqueda(Resultado, Estado) {
        if (Estado === google.maps.places.PlacesServiceStatus.OK) {
            for (var I = 0; I < Resultado.length; I++) {
                CrearMarcador(Resultado[I]);
            }
        }
    }

    function CrearMarcador(Lugar) {
        switch (Lugar.types[0]) {
            // Primera Categoria
            case 'hospital':
            case 'airport':
                TipoDeIcono = PinesCategoria[0];
                Lugar.Categoria = '1';
                break;

            // Segunda categoria
            case 'local_government_office':
            case 'bank':
            case 'doctor':
            case 'fire_station':
            case 'university':
            case 'insurance_agency':
            case 'amusement_park':
                TipoDeIcono = PinesCategoria[1];
                Lugar.Categoria = '2';
                break;

            // Tercera Categoria
            default:
                TipoDeIcono = PinesCategoria[2];
                Lugar.Categoria = '3';
        }

        var LugarMarcador = new google.maps.Marker(
            {
                map: Mapa,
                icon: TipoDeIcono,
                position: Lugar.geometry.location,
                Informacion: Lugar
            });
        PinConsumidores.push({ Posicion: LugarMarcador, Tipo: Lugar.types[0] });
        google.maps.event.addListener(LugarMarcador, 'mouseover', function () {
            var CadenaHTML = '<strong style="  text-align: center;">Ubicación: </strong>' + Lugar.name + '<br><strong>Dirección: </strong>' + Lugar.vicinity + '<br><strong>Latitud: </strong>' + Lugar.geometry.location.lat() + '<br><strong>Longitud: </strong>' + Lugar.geometry.location.lng() + '<br><strong>Categoria : </strong>' + Lugar.Categoria;
            VentanaInformacion = new google.maps.InfoWindow
                ({
                    content: CadenaHTML
                });
            VentanaInformacion.open(Mapa, this);

        });

        google.maps.event.addListener(LugarMarcador, 'mouseout', function () {
            VentanaInformacion.close();
        });


    }
}



// Borra la elipse y los 24 centros de carga //
function OcultarMostrar_CentrosDeCargaEventuales(Parametro, Proyeccion_Marcador, Mapa) {
    if (Parametro == 1) {
        if (Proyecciones[Proyeccion_Marcador].CentrosEventuales != null) {
            for (var I = 0; I < Proyecciones[Proyeccion_Marcador].CentrosEventuales.length; I++) {
                Proyecciones[Proyeccion_Marcador].CentrosEventuales[I].Marcador.setMap(Mapa);
            }
        }
    }
    else if (Parametro == 2) {
        for (var I = 0; I < Proyecciones.length; I++) {
            for (var J = 0; J < Proyecciones[I].CentrosEventuales.length; J++) {
                Proyecciones[I].CentrosEventuales[J].Marcador.setMap(Mapa);
            }
        }
    }
}

function OcultarMostrar_Elipses(Parametro, ProyeccionNumero, Mapa) {
    if (Parametro == 1) {
        try { Proyecciones[ProyeccionNumero].Elipse.setMap(Mapa); Proyecciones[ProyeccionNumero].CentroElipse.setMap(Mapa); } catch (Error) { }        

    }
    else if (Parametro == 2) {
        for (var I = 0; I < Proyecciones.length; I++) {
            try { Proyecciones[I].Elipse.setMap(Mapa); Proyecciones[I].CentroElipse.setMap(Mapa); } catch (Error) { }
        }        
    }
}

function OcultarMostrar_Cargas(Parametro, ProyeccionNumero, Mapa) {
    if (Proyecciones[ProyeccionNumero].MarcadoresCollecion != null) {
        if (Parametro == 1) {
            for (var I = 0; I < Proyecciones[ProyeccionNumero].MarcadoresCollecion.length; I++) {
                Proyecciones[ProyeccionNumero].MarcadoresCollecion[I].Marcador.setMap(Mapa);
            }
        }
        else if (Parametro == 2) {
            for (var I = 0; I < Proyecciones.length; I++) {
                for (var J = 0; J < Proyecciones[I].MarcadoresCollecion.length; J++) {
                    Proyecciones[I].MarcadoresCollecion[J].Marcador.setMap(Mapa);
                }
            }
        }
    }
}

function BuscarIndice(Arreglo, Valor, Parametro) 
{    
 for (I = 0; I < Arreglo.length; I++) 
    {
      if (Arreglo[I].Titulo === Valor) 
      {
        if (Parametro == 1) 
        {
            return Arreglo[I];
        }
        else 
        {
            return I;
        }
      }
    }
    return null;
}

function SwitchActivo(SwitchId)
{
    if(($('#'+SwitchId).attr('class')).search('on') != -1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ToogleSwitch(SwitchID)
{

    $('#switch'+SwitchID).toggleClass('on');
    if(SwitchActivo('switch'+SwitchID) == false)
    {
        $('#switch'+SwitchID).toggleClass('on');
    }
}

function ToogleSwitchFalse(SwitchID)
{
    $('#switch'+SwitchID).toggleClass('on');
    if(SwitchActivo('switch'+SwitchID) == true)
    {
        $('#switch'+SwitchID).toggleClass('on');
    }
}

