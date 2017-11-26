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
  });




  //Usuarios (6-10)
	MarcadoresCollecion.push({Horas:[], X:0, Y:0,  Mayor:0, Menor:0, Promedio:0});

	Proyecciones.push({MarcadoresCollecion: [], Contador:1, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0});
	Proyecciones.push({MarcadoresCollecion: [], Contador:1, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0});
	Proyecciones.push({MarcadoresCollecion: [], Contador:1, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0});

});
