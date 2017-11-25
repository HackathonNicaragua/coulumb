function Centros_Eventuales(Parametro,ProyeccionActiva)
{
	XTemp = 0;
	YTemp = 0;

	for (var I = 0; I <= 23; I++)
	{
		for (var J = 0; J <= (Proyecciones[ProyeccionActiva].MarcadorCollecion.length)-1; J++) 
		{

			XTemp = XTemp + (Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Horas[I] * Proyecciones[ProyeccionActiva].MarcadorCollecion[J].X);

			YTemp = YTemp + (Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Horas[I] * Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Y);
		
			Suma = Suma + (Proyecciones[ProyeccionActiva].MarcadorCollecion[J].Horas[I]);
		}

		Proyecciones[ProyeccionActiva].CentrosEventuales[I].X= XTemp/Suma;  
		
		Proyecciones[ProyeccionActiva].CentrosEventuales[I].Y= YTemp/Suma;  
	}


	
}

function Dispersion()
{

}

function Dimension_Dispersion()
{

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