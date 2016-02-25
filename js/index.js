function Map(latlng) {
    var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var Map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    //Add an overlay to the map of current lat/lng
    var marker = new google.maps.Marker({
        position: latlng,
        map: Map,
        title: "Greetings!"
    });
}


$( document ).on( "pageshow", "#map-page", function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //onDeviceReady();



});
function onDeviceReady() {
    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e){
        max_height();
    });
    max_height();
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            Map(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            Map(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        Map(defaultLatLng);  // No geolocation support, show default map
    }
}
function max_height(){
    var h = $('div[data-role="header"]').outerHeight(true);
    var f = $('div[data-role="footer"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="main"]');
    var c_h = c.height();
    var c_oh = c.outerHeight(true);
    var c_new = w - h - f - c_oh + c_h;
    var total = h + f + c_oh;
    if(c_h<c.get(0).scrollHeight){
        c.height(c.get(0).scrollHeight);
    }else{
        c.height(c_new);
    }
}

//$(document).on('pageshow', '#index', function (e, data) {
//
//    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
//    if ( navigator.geolocation ) {
//        function success(pos) {
//            // Location found, show map with these coordinates
//            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//        }
//        function fail(error) {
//            drawMap(defaultLatLng);  // Failed to find location, show default map
//        }
//        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
//        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
//    } else {
//        drawMap(defaultLatLng);  // No geolocation support, show default map
//    }
//    function drawMap(latlng) {
//        var myOptions = {
//            zoom: 10,
//            center: latlng,
//            mapTypeId: google.maps.MapTypeId.ROADMAP
//        };
//        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
//        // Add an overlay to the map of current lat/lng
//        //var marker = new google.maps.Marker({
//        //    position: latlng,
//        //    map: map,
//        //    title: "Greetings!"
//        //});
//    }
//
//    //setTimeout(function () {
//    //    // This is the minimum zoom level that we'll allow
//    //    var minZoomLevel = 12;
//    //
//    //    var map = new google.maps.Map(document.getElementById('map_canvas'), {
//    //        zoom: minZoomLevel,
//    //        center: new google.maps.LatLng(38.50, -90.50),
//    //        mapTypeId: google.maps.MapTypeId.ROADMAP
//    //    });
//    //}, 100);
//});