$(document).ready(function () {
  
  $('#confirmar').slideUp();




  var rendererOptions = {
  draggable: true
  };
  var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
  var directionsService = new google.maps.DirectionsService();
  var map;

  var centro = new google.maps.LatLng(10.070964,-69.328792);

  function initialize() {

    var mapOptions = {
        zoom: 14,
        center: centro
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
        });
  }



    function todo() {
      var origen = $('#origen').val();
      var destino = $('#destino').val();
      calcRoute(origen,destino);
      computeTotalDistance(directionsDisplay.getDirections());
    }

    $('#calcular').on('click',function () {
      todo();
    });
    
  function calcRoute(origen, destino) {

    var request = {
          origin: origen +' Barquisimeto',
          destination: destino +' Barquisimeto',
          travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        }
        });
  }

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;
    document.getElementById('total').innerHTML = total + ' km';
    
    $('#origen').val(myroute.legs[0].start_address);
    $('#destino').val(myroute.legs[0].end_address);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

});
