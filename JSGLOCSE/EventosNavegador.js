//Creacion de objetos
var Proyecciones = new Array();
var ProyeccionActiva = 0;
var MarcadoresCollecion = new Array();
var Mapa = null;
var ProyeccionActiva = 0;
var MostrarProyecciones = false;

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


  $('#switchglobal').click(function (event){
    $(this).toggleClass('on');
    if(this.className == 'switch on' ){
      OcultarMostrar_CentrosDeCargaEventuales(2,null,Mapa);
      OcultarMostrar_Elipses(2,null,Mapa);
      OcultarMostrar_Cargas(2,null,Mapa);
      $(this).toggleClass('off');
    }else{
      

    }
  });


  $('#switchcarga').click(function (event)
  {

    $(this).toggleClass('on');
    if(this.className == 'switch on' ){
      MuestraOculta(Mapa);
      $(this).toggleClass('off');
      //alert("Markers Activos");
    }else{
      MuestraOculta(null);
    }
  });


  $('#switchconsumidores').click(function (event)
  {
    $(this).toggleClass('on');
    if(this.className == 'switch on' ){
      MostrarConsumidores(Mapa.getCenter(), Mapa)
      $(this).toggleClass('off');
    }else{
      MostrarConsumidores(Mapa.getCenter(), null)
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
    document.getElementById('cargasproyeccion').innerHTML = (Proyecciones[ProyeccionActiva].MarcadoresCollecion.length).toString() + " / 10";
    document.getElementById('centrosproyeccion').innerHTML = (Proyecciones[ProyeccionActiva].CentrosEventuales.length).toString() + " / 24";
    document.getElementById('Radiox').innerHTML = ((Proyecciones[ProyeccionActiva].XCentro).toFixed(2)).toString();
    document.getElementById('Radioy').innerHTML = ((Proyecciones[ProyeccionActiva].YCentro).toFixed(2)).toString();

  });



$('#VerProyeccion1').click(function()
                 {                                      
                            if(SwitchActivo('switchglobal') == false)
                            {
                               OcultarMostrar_CentrosDeCargaEventuales(1,ProyeccionActiva,null);
                               OcultarMostrar_Elipses(1 , ProyeccionActiva,null);
                               OcultarMostrar_Cargas(1,ProyeccionActiva,null);
                               ProyeccionActiva = 0;

                                                         
                                OcultarMostrar_Cargas(1,ProyeccionActiva,Mapa);
                                OcultarMostrar_CentrosDeCargaEventuales(1,ProyeccionActiva,Mapa);
                                OcultarMostrar_Elipses(1,ProyeccionActiva,Mapa);
                            }
                            else
                            {                            
                              ProyeccionActiva = 0;                                            
                              OcultarMostrar_Cargas(2,ProyeccionActiva,Mapa);
                              OcultarMostrar_CentrosDeCargaEventuales(2,ProyeccionActiva,Mapa);
                              OcultarMostrar_Elipses(2,ProyeccionActiva,Mapa);
                            }                             
                            
                            document.getElementById("botonactiva").innerHTML = 'Proyeción 1 <span class="m-l-5"><i class=" fa fa-get-pocket"></i></span>';
                            document.getElementById("sidebartexto").innerHTML = "Proyección 1";
                                       

                });



                $('#VerProyeccion2').click(function()
                 {                                      
                            if(SwitchActivo('switchglobal') == false)
                            {
                               OcultarMostrar_CentrosDeCargaEventuales(1,ProyeccionActiva,null);
                               OcultarMostrar_Elipses(1 , ProyeccionActiva,null);
                               OcultarMostrar_Cargas(1,ProyeccionActiva,null);
                               ProyeccionActiva = 1;                                                        
                               OcultarMostrar_Cargas(1,ProyeccionActiva,Mapa);
                               OcultarMostrar_CentrosDeCargaEventuales(1,ProyeccionActiva,Mapa);
                               OcultarMostrar_Elipses(1,ProyeccionActiva,Mapa);
                            }
                            else
                            {                            
                              ProyeccionActiva = 1;                                            
                              OcultarMostrar_Cargas(2,ProyeccionActiva,Mapa);
                               OcultarMostrar_CentrosDeCargaEventuales(2,ProyeccionActiva,Mapa);
                               OcultarMostrar_Elipses(2,ProyeccionActiva,Mapa);                                         
                            }                                      
                            document.getElementById("botonactiva").innerHTML = 'Proyeción 2 <span class="m-l-5"><i class=" fa fa-get-pocket"></i></span>';                            
                });



                $('#VerProyeccion3').click(function()
                 {                                      
                            if(SwitchActivo('switchglobal') == false)
                            {
                               OcultarMostrar_CentrosDeCargaEventuales(1,ProyeccionActiva,null);
                               OcultarMostrar_Elipses(1 , ProyeccionActiva,null);
                               OcultarMostrar_Cargas(1,ProyeccionActiva,null);
                               ProyeccionActiva = 2;                              
                                                          
                               OcultarMostrar_Cargas(1,ProyeccionActiva,Mapa);
                               OcultarMostrar_CentrosDeCargaEventuales(1,ProyeccionActiva,Mapa);
                               OcultarMostrar_Elipses(1,ProyeccionActiva,Mapa);
                            }
                            else
                            {                            
                              ProyeccionActiva = 2;                                            
                              OcultarMostrar_Cargas(2,ProyeccionActiva,Mapa);
                              OcultarMostrar_CentrosDeCargaEventuales(2,ProyeccionActiva,Mapa);
                              OcultarMostrar_Elipses(2,ProyeccionActiva,Mapa);                                   
                            }                          
                });


  //Usuarios (6-10)
	MarcadoresCollecion.push({Horas:[], X:0, Y:0,  Mayor:0, Menor:0, Promedio:0});

	Proyecciones.push({MarcadoresCollecion: [], Contador:0, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0,Elipse : null,ElipseDibujada : false,CentroElipse:null,url : ['https://k60.kn3.net/9/7/7/1/F/F/EC8.png',
           'https://k60.kn3.net/A/9/6/F/4/2/E48.png',
           'https://k60.kn3.net/8/3/F/5/3/E/8FD.png',
           'https://k60.kn3.net/7/0/1/8/8/1/B61.png',
           'https://k60.kn3.net/C/1/6/8/C/C/886.png',
           'https://k60.kn3.net/8/9/A/9/0/1/F2E.png',
           'https://k60.kn3.net/8/6/7/C/F/E/498.png',
           'https://k60.kn3.net/2/5/1/F/E/5/57F.png',
           'https://k60.kn3.net/3/2/C/A/2/7/EB4.png',
           'https://k60.kn3.net/4/4/5/4/7/1/DA7.png']});
	Proyecciones.push({MarcadoresCollecion: [], Contador:0, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0,Elipse : null,ElipseDibujada : false,CentroElipse:null,url:['https://k60.kn3.net/2/0/C/3/9/9/935.png',
          'https://k60.kn3.net/0/E/E/A/5/2/E60.png',
          'https://k60.kn3.net/B/4/A/1/C/E/897.png',
          'https://k60.kn3.net/0/3/4/A/0/8/818.png',
          'https://k60.kn3.net/3/8/1/9/C/F/775.png',
          'https://k60.kn3.net/1/5/2/5/8/0/3B9.png',
          'https://k60.kn3.net/5/F/0/8/C/D/EB3.png',
          'https://k60.kn3.net/7/B/D/C/B/D/10C.png',
          'https://k60.kn3.net/F/9/1/3/A/9/625.png',
          'https://k60.kn3.net/B/5/C/8/6/D/22C.png']});
	Proyecciones.push({MarcadoresCollecion: [], Contador:0, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0,Elipse : null,ElipseDibujada : false,CentroElipse:null,url : ['https://k60.kn3.net/D/1/5/E/0/C/E8D.png',
          'https://k60.kn3.net/2/B/C/E/2/E/FEC.png',
          'https://k60.kn3.net/4/D/8/8/D/1/DC3.png',
          'https://k60.kn3.net/C/0/6/A/7/6/CD2.png',
          'https://k60.kn3.net/2/5/E/7/F/B/AAA.png',
          'https://k60.kn3.net/6/3/F/0/8/4/23F.png',
          'https://k60.kn3.net/C/2/7/C/D/8/C60.png',
          'https://k60.kn3.net/D/C/0/B/8/0/0A4.png',
          'https://k60.kn3.net/1/3/4/8/8/0/92F.png',
          'https://k60.kn3.net/1/3/3/3/C/4/B96.png']
});

});


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
