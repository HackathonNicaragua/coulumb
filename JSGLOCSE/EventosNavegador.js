//Creacion de objetos
var Proyecciones = new Array();
var ProyeccionActiva = 0;
var MarcadoresCollecion = new Array();
var Mapa = null;
var ProyeccionActiva = 0;


$( document ).ready(function()
{
	// Inicializamos el mapa
 	InicializarMapa();



 	// Recogemos las referencias de los elementos del DOM

 	$('#LimitarMapa').click(function()
 	{
 		DelimitarMapa(0);
 	});


 	$('#DeslimitarMapa').click(function()
 	{
 		if(Proyecciones[ProyeccionActiva].MarcadoresCollecion.length  > 0)
 		{
 			 $.Notification.autoHideNotify('error', 'top right', 'No se puede quitar la restriccion del mapa porque ya hay consumidores');                                                ;
 		}
 		else
		{
			 DelimitarMapa(1);
		}
 	});



  $('#containermapa').mousedown(function (event )
  {
    if(event.which = 3)
    {
      var posX = $(this).offset().left,
          posY = $(this).offset().top;
      posicionx = (event.pageX - posX);
      posiciony = (event.pageY - posY);
    }

  })

  $('#ContenedorEmergente').mouseleave(function (event) {
    $('#ContenedorEmergente').hide(500);
  });

  $('#Cat1CentroEventual').click(function (event )
  {
      Indice(referencia.title).Categoria = 1;
  })

  $('#Cat2CentroEventual').click(function (event )
  {
    Indice(referencia.title).Categoria = 2;
  })

  $('#Cat3CentroEventual').click(function (event )
  {
    Indice(referencia.title).Categoria = 3;
  })

  $('#Procesar').click(function(event)
  {
  		PotenciasAleatorias();
  		Centros_Eventuales(1,ProyeccionActiva);
  });

  $('#switchcarga').click(function (event) {

    $(this).toggleClass('on');
    if(this.className == 'switch on' ){
      MuestraOcultaC(Mapa);
      $(this).toggleClass('off');
    }else{
      MuestraOcultaC(null);
    }
  });

  $('#switchcentroseventuales').click(function (event){
    $(this).toggleClass('on');
    if(this.className == 'switch on' ){
      MuestraOcultaCE(Mapa);
      $(this).toggleClass('off');
    }else{
      MuestraOcultaCE(null);
    }
  });

  $('#switchelipse').click(function (event){
    $(this).toggleClass('on');
    if(this.className == 'switch on' ){
      MuestraOcultaE(Mapa);
      $(this).toggleClass('off');
    }else{
      MuestraOcultaE(null);
    }
  });

  $('#graficamontaña').click(function(event)
  {
        if(Proyecciones[0].ElipseDibujada)
        {
           Graficando_Hill(Proyecciones[0].XPoint,Proyecciones[0].YPoint,Proyecciones[0].XSigma,Proyecciones[0].YSigma,Proyecciones[0].r,Proyecciones[0].Puntos_X,Proyecciones[0].Puntos_Y, Proyecciones[0].FhiRadio, Proyecciones[0].PhiRadio,1);
        }
        if(Proyecciones[1].ElipseDibujada)
        {
           Graficando_Hill(Proyecciones[1].XPoint,Proyecciones[1].YPoint,Proyecciones[1].XSigma,Proyecciones[1].YSigma,Proyecciones[1].r,Proyecciones[1].Puntos_X,Proyecciones[1].Puntos_Y, Proyecciones[1].FhiRadio, Proyecciones[1].PhiRadio,2);
        }
        if(Proyecciones[2].ElipseDibujada)
        {
           Graficando_Hill(Proyecciones[2].XPoint,Proyecciones[2].YPoint,Proyecciones[2].XSigma,Proyecciones[2].YSigma,Proyecciones[2].r,Proyecciones[2].Puntos_X,Proyecciones[2].Puntos_Y, Proyecciones[2].FhiRadio, Proyecciones[2].PhiRadio,3);
        }
  });

  $('#graficaconsumidores').click(function(event)
  {
    Datos_Graficas(Proyecciones, ProyeccionActiva);
  });

$('#sb_googlemaps').click(function(event)
  {
    document.getElementById('containermapa').style.display = 'block';
    document.getElementById('containergraficas').style.display = 'none';
    document.getElementById('containerreportes').style.display = 'none';
  });

  $('#sb_graficas').click(function(event)
  {
    document.getElementById('containermapa').style.display = 'none';
    document.getElementById('containergraficas').style.display = 'block';
    document.getElementById('containerreportes').style.display = 'none';
  });

  $('#sb_reportes').click(function(event)
  {
    document.getElementById('containermapa').style.display = 'none';
    document.getElementById('containergraficas').style.display = 'none';
    document.getElementById('containerreportes').style.display = 'block';
  });


  //Usuarios (6-10)
	MarcadoresCollecion.push({Horas:[], X:0, Y:0,  Mayor:0, Menor:0, Promedio:0});

	Proyecciones.push({MarcadoresCollecion: [], Contador:0, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0,Elipse : null,ElipseDibujada : false,CentroElipse:null});
	Proyecciones.push({MarcadoresCollecion: [], Contador:0, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0,Elipse : null,ElipseDibujada : false,CentroElipse:null});
	Proyecciones.push({MarcadoresCollecion: [], Contador:0, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0,Elipse : null,ElipseDibujada : false,CentroElipse:null});

});
