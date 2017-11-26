var ArreglosGrafica = new Array();

function Datos_Graficas(Proyecciones, ProyeccionActiva)
{
	//Nombre temporal de canvas, asignacion de nombre, una vez esté terminada la interfaz
	$("#GraficaA").empty();	
	$("#GraficaB").empty();	
	$("#GraficaC").empty();	
	$("#GraficaD").empty();	
	$("#GraficaE").empty();	
	$("#GraficaF").empty();	
	$("#GraficaG").empty();	
	$("#GraficaH").empty();	
	$("#GraficaI").empty();	
	$("#GraficaJ").empty();	
	
	Consumidores(Proyecciones, ProyeccionActual);
}

function Consumidores(Proyecciones, ProyeccionActiva)
{
	var Horas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	 //Realizacion de Graficos de Barras por Consumidor
    for (var J = 0; J <= (Proyecciones[ProyeccionActiva].MarcadoresCollecion.length) - 1; J++) {
        ArreglosGrafica.push(Graficando_Consumidores(Proyecciones, ProyeccionActiva, J));
    }

}

function Graficando_Consumidores(Proyecciones, ProyeccionActiva, J)
{
	var ctx = document.getElementById('Grafica' + (Alfabeto[J]).toString()).getContext('2d');
    var Grafica = {
        type: 'roundedBar',
        data:
        {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            datasets:
            [
                {
                    label: 'Potencias',
                    backgroundColor: [
                        '#626EEF',
                        '#FF5757',
                        '#4BC0C0',
                        '#6C5070',
                        '#3E3E3E',
                        '#FFDD67',
                        '#626EEF',
                        '#FF5757',
                        '#4BC0C0',
                        '#6C5070',
                        '#3E3E3E',
                        '#FFDD67',
                        '#C2C4D1',
                        '#5EB0DE',
                        '#C2C4D1',
                        '#5EB0DE',
                        '#C2C4D1',
                        '#5EB0DE',
                        '#626EEF',
                        '#FF5757',
                        '#4BC0C0',
                        '#6C5070',
                        '#3E3E3E',
                        '#FFDD67',
                    ],
                    borderColor:
                    [
                        '#626EEF',
                        '#FF5757',
                        '#4BC0C0',
                        '#6C5070',
                        '#3E3E3E',
                        '#FFDD67',
                        '#626EEF',
                        '#FF5757',
                        '#4BC0C0',
                        '#6C5070',
                        '#3E3E3E',
                        '#FFDD67',
                        '#C2C4D1',
                        '#5EB0DE',
                        '#C2C4D1',
                        '#5EB0DE',
                        '#C2C4D1',
                        '#5EB0DE',
                        '#626EEF',
                        '#FF5757',
                        '#4BC0C0',
                        '#6C5070',
                        '#3E3E3E',
                        '#FFDD67',
                    ],
                    borderWidth: 1,
                    data: Proyecciones[ProyeccionActiva].MarcadoresCollecion[J].Horas,
                }
            ]
        },
        options:
        {
            barRoundness: 0.5,
            animation: { duration: 0, },

            title:
            {
                display: true,
                fontSize: 30               
            },
            scales:
            {
                yAxes:
                [{
                    scaleLabel:
                    {
                        display: true,
                        fontSize: 15,
                        labelString: "Consumo Potencia x100KVA"
                    },

                    ticks:
                    {
                        maxTicksLimit: 5,
                        beginAtZero: true
                    }
                }],
                xAxes:
                [{
                    scaleLabel:
                    {
                        display: true,
                        labelString: "Horas (1 - 24)",
                        fontSize: 15
                    },
                    gridLines:
                    {
                        display: true
                    }
                }]
            },
            legend:
            {
                display: true,
                position: "bottom",
                fontFamily: ""
            }
        }
    }
    var chart = new Chart(ctx, Grafica);
    return chart;
}