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

}

function Dimension_Dispersion()
{
	Proyecciones[ProyeccionActiva].XSigma = Math.sqrt(Proyecciones[ProyeccionActiva].XDispersion);

	Proyecciones[ProyeccionActiva].YSigma = Math.sqrt(Proyecciones[ProyeccionActiva].YDispersion);
}

function Exactitud_Variables_Aleatorias()
{

}

function Momento_Correlacion()
{

}

function Coeficiente_Correlacion()
{

}

function Angulo_Eje_Simetria()
{

}

function Desviaciones_Medio_Cuadraticas()
{

}

function Exactitud_Nuevo_Eje()
{

}

function Radios_Elipse_Sistema()
{

}