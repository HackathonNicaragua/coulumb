function Centros_Eventuales(Parametro,ProyeccionActiva)
{

	for (var I = 0; I <= 23; I++)
	{

		XTemp = 0;
		YTemp = 0;
		Suma = 0;

		for (var J = 0; J <= (Proyecciones[ProyeccionActiva].MarcadorCollecion.length)-1; J++) 
		{

			XTemp = XTemp + (Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Horas[I] * Proyecciones[ProyeccionActiva].MarcadorCollecion[J].X);

			YTemp = YTemp + (Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Horas[I] * Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Y);
		
			Suma = Suma + (Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Horas[I]);
		}

		Proyecciones[ProyeccionActiva].CentrosEventuales[I].X= XTemp/Suma;  

		Proyecciones[ProyeccionActiva].CentrosEventuales[I].Y= YTemp/Suma;  
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
	Proyecciones[ProyeccionActiva].Angulo = ( (0.5) * (Math.atan( ( (2*Proyecciones[ProyeccionActiva].XYCorrelacion) / (XDispersion - YDispersion) ) ) ) );

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
}

function Puntos_Elipse()
{
	Proyecciones[ProyeccionActiva].Puntos_X = new Array();

	Proyecciones[ProyeccionActiva].Puntos_Y = new Array();

	Periodo = new Array();

	for (var I = Math.PI * -1; I <= Math.PI -1; I = I + 0.001)
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

}
