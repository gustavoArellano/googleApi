// GEOCODER IS WHAT CONVERTS ADDRESS STRING FROM THE VALUE TO LATITUDE AND LONGITUDE COORDINATES
var geocoder;

// MAP CALLS THE GOOGLE MAPS API
var map;

function initialize() {

    // CALLS THE GEOCODER API
    geocoder = new google.maps.Geocoder();

    // FOR LATLNG I PASSED ON CALIFORNIA'S COORDINATES
    var latlng = new google.maps.LatLng(36.7783, 119.4179);

    // MAP OPTIONS
    var mapOptions = {
        zoom: 15,
        center: latlng
        }

    // CALLS THE GOOGLE MAPS API, PASS ON THE DIV ID ITS GOING TO LOAD UP ON ALONG WITH MAP OPTIONS
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
    // PASSES THE ADDRESS VALUE TO THE ADDRESS VARAIABLE
    var address = document.getElementById('address').value;

    // ADDDRESS THEN PASSED TO GEOCODER TO CONVERT ADDRESS STRING TO COORDINATES
    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == 'OK') {

            // IF ADDRESS IS VALID, MARKER WILL APPEAR  IN THE CENTER OF ADDRESS
            map.setCenter(results[0].geometry.location);

            // MARKER IS CREATED TO PIN POINT ADDRESS COORDINATES
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP
                });
            
            // CREATE A POP WINDOW WITH MESSAGE WHEN MARKER IS CLICKED ON
            var infowindow = new google.maps.InfoWindow({
                content:"<strong style='color:red;'>We meet here!!!</strong>"
                });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

            //ADDS A BOUNCE TIMER, WITHOUT THIS, IT WILL BOUNCE FOR A LONG TIME
            marker.addListener('click', toggleBounce);
            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                marker.setAnimation(null);

                } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function(){ marker.setAnimation(null); }, 750);
                }
            }

        } else {

            // IF ADDRESS IS INVALID, ERROR WILL BE DISPLAYED ON MAP
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}