function initMap() {
  var map;

  /*var chernihiv = new google.maps.LatLng(51.4938438,31.2999212)*/
  var chernihiv = {lat:51.4938438, lng: 31.2999212},
      poltava = {lat: 49.5687001, lng: 34.5835126},
      kyiv = {lat: 50.4492763, lng: 30.5143413},
      odesa = {lat: 46.4836438, lng: 30.7373918};

  map = new google.maps.Map(document.getElementById('map'), {
    center: chernihiv,
    zoom: 15,
    scrollwheel: false, //Отключить масштабирование на скролл
    mapTypeControl: false //Убрать элементы выбора типа карты
  });

  var infowindow = new google.maps.InfoWindow({
    content: "Beetroot Academy"
  });

  var image = {
    url: 'img/favicon.png', 
    scaledSize : new google.maps.Size(22, 22)
  };

  var marker_che = new google.maps.Marker({
    position: chernihiv,
    map: map,
    icon: image
  });

  var marker_poltava = new google.maps.Marker({
    position: poltava,
    map: map,
    icon: image
  });

  var marker_kyiv = new google.maps.Marker({
    position: kyiv,
    map: map,
    icon: image
  });

  var marker_odesa = new google.maps.Marker({
    position: odesa,
    map: map,
    icon: image
  });

  infowindow.open(map, marker_che);

  marker_che.addListener('click', function() {
    infowindow.open(map, marker_che);
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter()
    google.maps.event.trigger(map, "resize")
    map.setCenter(center)
  })

  $('select').on('change', function(){
    var val = $(this).val();   
    var pos = eval(val);
    //console.log(pos);
    map.panTo(pos);
  });


  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );

  var request = {
    origin: chernihiv,
    destination: poltava,
    travelMode: google.maps.TravelMode.WALKING
  }

  directionsService.route(request, function(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(result);
    console.log(result);
    var routes = result.routes;
    var leg = routes[0].legs;
    var lenght = leg[0].distance.text;
    var duration = leg[0].duration.text;
   }})
}

$(document).ready(function(){
  initMap();
});     
