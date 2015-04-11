/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * Use phonegap feature i.e access GPS of a device
 */
 var pyrmont;
 var cityCircleForNearest;
    var marker_nearest;
    var markerEnd; //vj
    var nearest_map;
    var infowindow_nearest = new google.maps.InfoWindow();
    var myCenter2;
    var marker_nearest_ar = [];
    var markerEndArr = []; // vj
    var circles = [];
    //google.maps.visualRefresh = true;
    var polylineOptionsActual = new google.maps.Polyline({
        strokeColor: "#8B6914",
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    var directionsDisplay1;
    var directionsService1 = new google.maps.DirectionsService();
    directionsDisplay1 = new google.maps.DirectionsRenderer({
        preserveViewport: true,
        polylineOptions: polylineOptionsActual,
        suppressMarkers: true,
    });
	var kiloDistance        = '1000'; 
var requestType         = ["atm","bank","gym","hospital","library","park","pharmacy","restaurant","school","store","bus_station","gas_station","shopping_mall","movie_theater","church","hindu_temple","mosque","place_of_worship","bakery","bar"];
 function init(){
var lat;
var long;
navigator.geolocation.getCurrentPosition(onSuccess, onError);
function onSuccess(position) {
	lat=position.coords.latitude;
	long=position.coords.longitude ;
	console.log(lat);
	initialize(lat,long);
}
// onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    } 
	
}
function initialize(lat,long) {
 
pyrmont = new google.maps.LatLng(lat,long);

 var styles = [
            {
                "stylers": [
                    {"visibility": "on"},
                    {"saturation": -40},
                    {"hue": "#F0FAFF"},
                    {"weight": 1.7}
                ]
            }
        ]

        
        console.log(pyrmont);
        var options = {
            mapTypeControlOptions: {
                mapTypeIds: ['Styled']
            },
            center: pyrmont,
            //maxZoom: 15,
            zoom: 14,
            mapTypeId: 'Styled'
        };
		
		
		// INFO BOXES
		/****************************************************************/
		
		//show info box for marker1
		var contentString_near = '<div class="info-box" style="width:200px; height:50px;"><p></p></div>';
		
		var infowindow_near = new google.maps.InfoWindow({ content: contentString_near });

        var div = document.getElementById('map-canvas');
        nearest_map = new google.maps.Map(div, options);
        var styledMapType = new google.maps.StyledMapType(styles, {name: 'Styled'});
        nearest_map.mapTypes.set('Styled', styledMapType);
        directionsDisplay1.setMap(nearest_map);
         var circleOptions = {
                    strokeColor: "#FF0040",
                    strokeOpacity: 0.9,
                    strokeWeight: 1,
                    fillColor: "#DF013A",
                    fillOpacity: 0.2,
                    map: nearest_map,
                    center: pyrmont,
                    radius: parseInt(kiloDistance),
                  };
				  
		var pinColor = "34BA46";
			var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_xpin_icon&chld=pin_star|home|" + pinColor + "|FF0000",
				new google.maps.Size(31, 44),
				new google.maps.Point(0,0),
				new google.maps.Point(10, 34));
			var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
				new google.maps.Size(40, 37),
				new google.maps.Point(0, 0),
				new google.maps.Point(12, 35));
		  var marker_near = new google.maps.Marker({
			  position: pyrmont,
			  map: nearest_map,
			  title: '',
			  icon: pinImage,
			  shadow: pinShadow  });
		
		google.maps.event.addListener(marker_near, 'click', function() {
			infowindow_near.open(nearest_map,marker_near);
		  });
                  setPlacesForNearest();
}

function setPlacesForNearest(){
        //var placeType       = document.getElementById('cmbMoreFunction').options[document.getElementById('cmbMoreFunction').selectedIndex].value;                
        //var kiloDistance    = document.getElementById('kilometers').options[document.getElementById('kilometers').selectedIndex].value;
         console.log("i am here");
        var request1 ;


        var lp=0;
        var typee;
        var service = new google.maps.places.PlacesService(nearest_map);
        var distance_from_my_location2;
        
        for (var i = 0; i < requestType.length; i++) {
            typee       =       requestType[i]; 
            request1 = {
                location: pyrmont,
                radius: parseInt(kiloDistance),
                types: [typee]
            };
            service.nearbySearch(request1, function (results, status) {
                    callback(results, status);
                    var circleOptions = {
                    strokeColor: "#F07092",
                    strokeOpacity: 0.9,
                    strokeWeight: 1,
                    fillColor: "#CFA7B3",
                    fillOpacity: 0.08,
                    map: nearest_map,
                    center: pyrmont,
                    radius: parseInt(kiloDistance)
                  };
                   cityCircleForNearest = new google.maps.Circle(circleOptions);

            });


            //service.nearbySearch(request, callback);

        }



         }                 
    function callback(results, status){
           console.log("ok"); 
        if (status == google.maps.places.PlacesServiceStatus.OK) {
              
            for (var i = 0; i < marker_nearest_ar.length; i++) {
               // markers[i].setMap(null);
            }
            
            for (var i = 0; i < circles.length; i++) {
                circles[i].setMap(null);
            }
               //console.log(results[0]); 
              var locationLat = results[0].geometry.location.lat();
              var locationLng = results[0].geometry.location.lng();
              var smallest = (calcDistance(locationLat, locationLng) / 1000).toFixed(1); 
              var keyy=0;
                for (var i = 0; i < results.length; i++) {
                place = results[i];
                var locationLat = place.geometry.location.lat();
                var locationLng = place.geometry.location.lng();
                distance_from_my_location2 = (calcDistance(locationLat, locationLng) / 1000).toFixed(1); 
                //&& place.name.toLowerCase() != typee
                if (calcDistance(results[i].geometry.location.lat(), results[i].geometry.location.lng()) <= kiloDistance  )
                { 
                    if(smallest > distance_from_my_location2 ){
                        smallest = distance_from_my_location2;
                        keyy = i;
                    }
                  //createMarkerForNearestLocation(results[i]);
                }
            }

           if(keyy>0){
              createMarkerForNearestLocation(results[keyy]);
            }else{
                createMarkerForNearestLocation(results[0]); 
            }
        }
    }                
    function createMarkerForNearestLocation(place){
        var icon;
        icon = "http://google-maps-icons.googlecode.com/files/"+place.types[0]+".png";
        /*if(checkImage(icon)){
            //alert("success");
            icon = icon;
        }else{
            //alert("errro");
            icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"; 
        }*/


        marker_nearest = new google.maps.Marker({
            position: place.geometry.location,
            icon:icon
        });



        marker_nearest.setMap(nearest_map);


        google.maps.event.addListener(marker_nearest, 'mouseover', function() {
            //alert("hi");
             var distance_from_my_location = (calcDistance(this.position.lat(), this.position.lng()) / 1000).toFixed(1); 

            var content = "<div class='infowindow_nearest-content'>" + "Place Name:" + place.name + "<br>" + "<hr>" + "Distance From Center:" + distance_from_my_location + "  " + "KM" + "</div>";
               console.log(place.name);
            //this.setAnimation(google.maps.Animation.BOUNCE);


            var start1 = pyrmont;
            var end1 = new google.maps.LatLng(this.position.lat(), this.position.lng());

            var request1 = {
                origin: start1,
                destination: end1,
                travelMode: google.maps.TravelMode.DRIVING,
            };



            directionsService1.route(request1, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay1.setDirections(response);
                }
            });
			
            infowindow_nearest.setContent(content);
            infowindow_nearest.open(nearest_map, this);
        });

        marker_nearest_ar.push(marker_nearest);
        circles.push(cityCircleForNearest);
    }
    function calcDistance(placeLat, placeLon){               
        return google.maps.geometry.spherical.computeDistanceBetween(pyrmont, new google.maps.LatLng(placeLat, placeLon));
    }
    function checkImage(src) {
                    var img = new Image();
                    img.onload = function() {
                        return true;
                    };
                    img.onerror = function() {
                      // doesn't exist or error loading
                     // alert('no image');
                      return false;
                    };

                    img.src = src; // fires off loading of image
                } 

google.maps.event.addDomListener(window, 'load', init);




