/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * Use phonegap feature i.e access GPS of a device
 */
function init() {
    var latitude;
    var longitude;
    var element;
    navigator.geolocation.getCurrentPosition(function(position)
    {
        // just to show how to access latitute and longitude
        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
       
    },
            function (error)
            {
                // error getting GPS coordinates
                alert('code: ' + error.code + ' with message: ' + error.message + '\n');
            },
            {enableHighAccuracy: true, maximumAge: 3000, timeout: 5000});
            
             var element = document.getElementById('geolocation');
             element.innerHTML = 'Latitude: '+ position.coords.latitude+'<br />' +'Longitude: '+ position.coords.longitude+ '<br />'

}





