$( document ).ready(function()
{

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

  

}
