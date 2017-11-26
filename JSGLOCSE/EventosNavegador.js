//Creacion de objetos
var Proyecciones = new Array();
var ProyeccionActiva = 0;
var MarcadoresCollecion = new Array();
var Mapa = null;


$( document ).ready(function() 
{
	// Inicializamos el mapa
 	InicializarMapa();



 	// Recogemos las referencias de los elementos del DOM

 	$('#LimitarMapa').click(function()
 	{
 		DelimitarMapa();	
 	});


 	//Usuarios (6-10)
	MarcadoresCollecion.push({Horas:[], X:0, Y:0});

	Proyecciones.push({MarcadoresCollecion: [], Contador:1, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0});
	Proyecciones.push({MarcadoresCollecion: [], Contador:1, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0});
	Proyecciones.push({MarcadoresCollecion: [], Contador:1, CentrosEventuales : new Array(), XDispersion:0, YDispersion:0, XYCorrelacion:0, XCentro:0, YCentro:0, XSigma: 0, YSigma:0, XExactitud:0, YExactitud:0, FhiExactitud:0, PhiExactitud:0, R:0, Angulo:0, FhiSigma2:0, PhiSigma2:0, FhiRadio:0, PhiRadio:0});



});

