function Centros_Eventuales(Parametro,ProyeccionActiva)
{
	if(Proyecciones[ProyeccionActiva].ElipseDibujada)
	{
		OcultarCentrosEventuales(1 , null);
	}

	Proyecciones[ProyeccionActiva].CentrosEventuales = new Array();
	
	if(Proyecciones[ProyeccionActiva].Elipse != null)
	{
		Proyecciones[ProyeccionActiva].Elipse.setMap(null);	 
	}


	for (var I = 0; I <= 23; I++)
	{

		XTemp = 0;
		YTemp = 0;
		Suma = 0;

		for (var J = 0; J <= (Proyecciones[ProyeccionActiva].MarcadoresCollecion.length)-1; J++) 
		{

			XTemp = XTemp + (Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Horas[I] * Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].X);

			YTemp = YTemp + (Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Horas[I] * Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Y);
		
			Suma = Suma + (Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Horas[I]);
		}
		 var marker = new google.maps.Marker(
		 {
          position: PuntoALatLng({x:XTemp / Suma,y:YTemp/Suma}),
          title: (I+1).toString(),
          draggable: false,
          icon: URLCentroEventual((I+1).toString()),
          map:Mapa,
          animation: google.maps.Animation.DROP
        });

		Proyecciones[ProyeccionActiva].CentrosEventuales.push({X :XTemp / Suma ,Y : YTemp/Suma , Marcador : marker }) ;  
	}

	Proyecciones[ProyeccionActiva].XCentro = 0;
	Proyecciones[ProyeccionActiva].YCentro = 0;

	for (var I = 0; I <= 23; I++)
	{
		Proyecciones[ProyeccionActiva].XCentro = Proyecciones[ProyeccionActiva].XCentro + Proyecciones[ProyeccionActiva].CentrosEventuales[I].X;

		Proyecciones[ProyeccionActiva].YCentro = Proyecciones[ProyeccionActiva].YCentro + Proyecciones[ProyeccionActiva].CentrosEventuales[I].Y;
	}

	//Centro de la Elipse
	Proyecciones[ProyeccionActiva].XCentro = Proyecciones[ProyeccionActiva].XCentro / 24; 
	Proyecciones[ProyeccionActiva].YCentro = Proyecciones[ProyeccionActiva].YCentro / 24;

	Dispersion();
	
}

function Dispersion()
{
	Proyecciones[ProyeccionActiva].XDispersion = 0;
	Proyecciones[ProyeccionActiva].YDispersion = 0;
	
	for (var I = 0; I <= 23; I++)
	{

		Proyecciones[ProyeccionActiva].XDispersion = Proyecciones[ProyeccionActiva].XDispersion + Math.pow((Proyecciones[ProyeccionActiva].CentrosEventuales[I].X - Proyecciones[ProyeccionActiva].XCentro),2);

		Proyecciones[ProyeccionActiva].YDispersion = Proyecciones[ProyeccionActiva].YDispersion + Math.pow((Proyecciones[ProyeccionActiva].CentrosEventuales[I].Y - Proyecciones[ProyeccionActiva].YCentro),2);
	}

	Proyecciones[ProyeccionActiva].XDispersion = Proyecciones[ProyeccionActiva].XDispersion / 23;

	Proyecciones[ProyeccionActiva].YDispersion = Proyecciones[ProyeccionActiva].YDispersion / 23;

	Dimension_Dispersion();
}

function Dimension_Dispersion()
{
	Proyecciones[ProyeccionActiva].XSigma = Math.sqrt(Proyecciones[ProyeccionActiva].XDispersion);

	Proyecciones[ProyeccionActiva].YSigma = Math.sqrt(Proyecciones[ProyeccionActiva].YDispersion);

	Exactitud_Variables_Aleatorias();
}

function Exactitud_Variables_Aleatorias()
{
	Proyecciones[ProyeccionActiva].XExactitud = (1 / (Proyecciones[ProyeccionActiva].XSigma * Math.sqrt(2) ) );

	Proyecciones[ProyeccionActiva].YExactitud = (1 / (Proyecciones[ProyeccionActiva].YSigma * Math.sqrt(2) ) );	

	Momento_Correlacion();
}

function Momento_Correlacion()
{
	Proyecciones[ProyeccionActiva].XYCorrelacion = 0;

	for (var I = 0; I <= 23; I++)
	{
		Proyecciones[ProyeccionActiva].XYCorrelacion = Proyecciones[ProyeccionActiva].XYCorrelacion + ( (Proyecciones[ProyeccionActiva].CentrosEventuales[I].X - Proyecciones[ProyeccionActiva].XCentro) * (Proyecciones[ProyeccionActiva].CentrosEventuales[I].Y - Proyecciones[ProyeccionActiva].YCentro) );
	}		

	Proyecciones[ProyeccionActiva].XYCorrelacion = (Proyecciones[ProyeccionActiva].XYCorrelacion / 23);

	Coeficiente_Correlacion();
}

function Coeficiente_Correlacion()
{
	Proyecciones[ProyeccionActiva].R = ( Proyecciones[ProyeccionActiva].XYCorrelacion / (Proyecciones[ProyeccionActiva].XSigma * Proyecciones[ProyeccionActiva].YSigma) );	

	Angulo_Eje_Simetria();
}

function Angulo_Eje_Simetria()
{
	Proyecciones[ProyeccionActiva].Angulo = ( (0.5) * (Math.atan( ( (2*Proyecciones[ProyeccionActiva].XYCorrelacion) / (Proyecciones[ProyeccionActiva].XDispersion - Proyecciones[ProyeccionActiva].YDispersion) ) ) ) );

	Desviaciones_Medio_Cuadraticas();
}

function Desviaciones_Medio_Cuadraticas()
{
	Proyecciones[ProyeccionActiva].FhiSigma2 = ( ( Math.pow(Proyecciones[ProyeccionActiva].XSigma, 2) * Math.pow(Math.cos(Proyecciones[ProyeccionActiva].Angulo), 2) ) + ( Proyecciones[ProyeccionActiva].R * Proyecciones[ProyeccionActiva].XSigma * Proyecciones[ProyeccionActiva].YSigma * Math.sin(2*Proyecciones[ProyeccionActiva].Angulo)  ) + ( Math.pow(Proyecciones[ProyeccionActiva].YSigma, 2) * Math.pow(Math.sin(Proyecciones[ProyeccionActiva].Angulo), 2) ) );

	Proyecciones[ProyeccionActiva].PhiSigma2 = ( ( Math.pow(Proyecciones[ProyeccionActiva].XSigma, 2) * Math.pow(Math.sin(Proyecciones[ProyeccionActiva].Angulo), 2) ) + ( Proyecciones[ProyeccionActiva].R * Proyecciones[ProyeccionActiva].XSigma * Proyecciones[ProyeccionActiva].YSigma * Math.sin(2*Proyecciones[ProyeccionActiva].Angulo)  ) + ( Math.pow(Proyecciones[ProyeccionActiva].YSigma, 2) * Math.pow(Math.cos(Proyecciones[ProyeccionActiva].Angulo), 2) ) );

	Exactitud_Nuevo_Eje();
}	

function Exactitud_Nuevo_Eje()
{
	Proyecciones[ProyeccionActiva].FhiExactitud = (1 / ( Math.sqrt(2) * Math.sqrt( Proyecciones[ProyeccionActiva].FhiSigma2 ) ) );

	Proyecciones[ProyeccionActiva].PhiExactitud = (1 / ( Math.sqrt(2) * Math.sqrt( Proyecciones[ProyeccionActiva].PhiSigma2 ) ) ); 

	Radios_Elipse_Sistema();
}

function Radios_Elipse_Sistema()
{
	Proyecciones[ProyeccionActiva].FhiRadio = Math.sqrt(3) / (Proyecciones[ProyeccionActiva].FhiExactitud);

	Proyecciones[ProyeccionActiva].PhiRadio = Math.sqrt(3) / (Proyecciones[ProyeccionActiva].PhiExactitud); 

	Puntos_Elipse();
}

function Puntos_Elipse()
{
	Proyecciones[ProyeccionActiva].Puntos_X = new Array();

	Proyecciones[ProyeccionActiva].Puntos_Y = new Array();

	Periodo = new Array();

	var Coordenadas = [];
	for (var I = Math.PI * -1; I <= Math.PI; I = I + 0.01)
	{
		Periodo.push(I);	
	}

	for (var I = 0; I <= Periodo.length; I++) 
	{
		Proyecciones[ProyeccionActiva].Puntos_X[I] = Proyecciones[ProyeccionActiva].FhiRadio * Math.sin(Periodo[I]);
		
		Proyecciones[ProyeccionActiva].Puntos_Y[I] = Proyecciones[ProyeccionActiva].PhiRadio * Math.cos(Periodo[I]);

		Proyecciones[ProyeccionActiva].Puntos_X[I] = ( Proyecciones[ProyeccionActiva].Puntos_X[I] * Math.cos(Proyecciones[ProyeccionActiva].Angulo) ) - ( Proyecciones[ProyeccionActiva].Puntos_Y[I] * Math.sin(Proyecciones[ProyeccionActiva].Angulo) );

		Proyecciones[ProyeccionActiva].Puntos_Y[I] = ( Proyecciones[ProyeccionActiva].Puntos_Y[I] * Math.cos(Proyecciones[ProyeccionActiva].Angulo) ) - ( Proyecciones[ProyeccionActiva].Puntos_X[I] * Math.sin(Proyecciones[ProyeccionActiva].Angulo) );
	 
		Proyecciones[ProyeccionActiva].Puntos_X[I] = Proyecciones[ProyeccionActiva].Puntos_X[I] + Proyecciones[ProyeccionActiva].XCentro;

		Proyecciones[ProyeccionActiva].Puntos_Y[I] = Proyecciones[ProyeccionActiva].Puntos_Y[I] + Proyecciones[ProyeccionActiva].YCentro;
	}


	for (var I = 0; I <= Proyecciones[ProyeccionActiva].Puntos_X.length - 1; I++) 
	{
		Coordenadas.push(PuntoALatLng({x: Proyecciones[ProyeccionActiva].Puntos_X[I], y:Proyecciones[ProyeccionActiva].Puntos_Y[I]}));	
	}

/*
	 var Coordenadas = PuntoALatLng({
          x: Proyecciones[ProyeccionActiva].Puntos_X,
          y: Proyecciones[ProyeccionActiva].Puntos_Y
        });

*/
	

	Proyecciones[ProyeccionActiva].Elipse = new google.maps.Polygon({
          paths: Coordenadas,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: Mapa
        });


	Proyecciones[ProyeccionActiva].ElipseDibujada = true;
}





function Medidas_Variacion()
{
	for (var J = 0; J <= (Proyecciones[ProyeccionActiva].MarcadoresCollecion.length) -1; J++) 
	{
		for (var I = 0; I <= 23; I++) 
		{
			Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Promedio = Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Promedio + Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Horas[I];
		}

		Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Promedio = (Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Promedio / 24);
	
		Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Mayor = Math.max.apply(Math, Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Horas);

		Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Menor = Math.min.apply(Math, Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Horas);
	}
}

function URLCentroEventual(CentrosEventual)
{
	var URLImagen;
    switch (CentrosEventual) {
    case "1":
        URLImagen = "https://k61.kn3.net/D/9/F/2/D/2/EBD.png";
        break;

    case "2":
    	URLImagen = "https://k61.kn3.net/A/7/7/6/F/2/886.png";
    	break;

    case "3":
    	URLImagen = "https://k60.kn3.net/A/A/0/2/F/5/3F4.png";
    	break;

    case "4":
    	URLImagen = "https://k61.kn3.net/6/9/5/C/9/9/52E.png";
    	break;

    case "5":
    	URLImagen = "https://k61.kn3.net/A/5/5/0/4/A/7D7.png";
    	break;	

    case "6":
    	URLImagen = "https://k61.kn3.net/A/E/B/0/7/C/D5A.png";
    	break;

    case "7":
    	URLImagen = "https://k61.kn3.net/5/3/A/C/0/C/4F0.png";
    	break;

    case "8":
    	URLImagen = "https://k60.kn3.net/A/3/B/5/E/1/CB7.png";
    	break;

    case "9":
    	URLImagen = "https://k60.kn3.net/D/E/6/3/E/5/B4D.png";
    	break;

    case "10":
    	URLImagen = "https://k61.kn3.net/D/4/5/B/B/B/326.png";
    	break;

    case "11":
    	URLImagen = "https://k61.kn3.net/8/A/7/2/F/6/279.png";
    	break;

    case "12":
    	URLImagen = "https://k60.kn3.net/5/C/1/E/2/C/D41.png";
    	break;

    case "13":
    	URLImagen = "https://k61.kn3.net/2/8/7/D/F/8/F6D.png";
    	break;

    case "14":
    	URLImagen = "https://k61.kn3.net/8/E/3/6/8/C/D11.png";
    	break;

    case "15":
    	URLImagen = "https://k61.kn3.net/9/2/F/D/1/D/B9B.png";
    	break;
    
    case "16":
    	URLImagen = "https://k61.kn3.net/E/4/5/9/D/1/0EF.png";
    	break;

    case "17":
    	URLImagen = "https://k61.kn3.net/2/1/3/4/5/A/214.png";
    	break;

    case "18":
    	URLImagen = "https://k61.kn3.net/2/9/7/8/E/7/DF7.png";
    	break;

    case "19":
    	URLImagen = "https://k60.kn3.net/8/F/9/F/9/8/74D.png";
    	break;

    case "20":
    	URLImagen = "https://k61.kn3.net/C/B/D/6/C/D/A3D.png";
    	break;

    case "21":
    	URLImagen = "https://k61.kn3.net/1/9/F/7/A/7/24E.png";
    	break;

    case "22":
    	URLImagen = "https://k61.kn3.net/4/D/F/7/B/4/DD1.png";
    	break;

    case "23":
    	URLImagen = "https://k60.kn3.net/F/9/5/F/C/6/B8B.png";
    	break;

    case "24":
    	URLImagen = "https://k60.kn3.net/F/9/5/F/C/6/B8B.png";
    	break;
    }

    return URLImagen;
}

function URLCentroElipse(Centro) 
{
    Centro = Centro.toString();
    switch (Centro) {
        case "0":
            URLImagen = "https://k60.kn3.net/3/2/E/E/D/7/B0E.png";
            break;
        case "1":
            URLImagen = "https://k60.kn3.net/B/4/6/8/5/2/809.png";
            break;

        case "2":
            URLImagen = "https://k60.kn3.net/6/5/6/8/B/1/D23.png";
            break;

        case "3":
            URLImagen = "https://k60.kn3.net/E/6/9/7/6/1/E3A.png";
            break;
    }
    return URLImagen;
}


function OcultarCentrosEventuales(Parametro , Mapa)
{
   if(Parametro == 1)
   {
   		for (var i = 0; i < 24; i++) 
   		{
   			Proyecciones[ProyeccionActiva].CentrosEventuales[i].Marcador.setMap(Mapa);
   		} 
   }
   else
   {

   }
}