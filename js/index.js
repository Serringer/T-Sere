$(document).on("pageshow", "#map-page", function () {
    var defaultLatLng = new google.maps.LatLng(55.3811409, 10.408918200000016);  // Default to Hollywood, CA when no geolocation support
    localStorage.setItem('geoLocLat', defaultLatLng.lat());
    localStorage.setItem('geoLocLon', defaultLatLng.lng());

    var default_geo = 0;
    if (navigator.geolocation) {
        function success(pos) {
            // Location found, show map with these coordinates
            var geo = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            localStorage.setItem('geoLocLat', geo.lat());
            localStorage.setItem('geoLocLon', geo.lng());
            drawMap(geo);
        }

        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }

        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {
            maximumAge: 500000,
            enableHighAccuracy: true,
            timeout: 6000
        });
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }


    function drawMap(latlng) {
        var dataset = localStorage.getItem('dataset');
        localStorage.removeItem('dataset');
        var myOptions = {
            zoom: 12,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        //Add an overlay to the map of current lat/lng
        if (dataset) {
            map.data.loadGeoJson(link[dataset].url);
        }

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10
            },
            title: "Du er her!"
        });
    }
});

var locations = {
    0: {'city': 'Odense', 'lat': '55.4038', 'lng': '10.4024'},
    1: {'city': 'Kolding', 'lat': '55.496', 'lng': '9.4731'},
    2: {'city': 'Esbjerg', 'lat': '55.4765', 'lng': '8.4594'},
    3: {'city': 'Aarhus', 'lat': '56.1629', 'lng': '10.2039'},
    4: {'city': 'Fredericia', 'lat': '55.5703', 'lng': '9.7466'},
    5: {'city': 'Aalborg', 'lat': '57.0488', 'lng': '9.9217'}
};

$(document).on("pagecreate", "#api", function () {

    var select = $('#weather');
    $.each(locations, function (value, obj) {
        select.append(
            $('<option></option>').val(value).html(obj.city)
        );
    });

    select.change(function () {
        renderVejr(locations[select.val()].lat, locations[select.val()].lng);
    });

    renderVejr();

    function renderVejr(late, long) {
        var api_url = "http://api.openweathermap.org/data/2.5/weather?appid=44db6a862fba0b067b1930da0d769e98&units=metric";
        var lat = (late) ? late : localStorage.getItem('geoLocLat');
        var lng = (long) ? long : localStorage.getItem('geoLocLon');
        var weather_local = api_url + "&lat=" + lat + "&lon=" + lng;
        console.log(weather_local);
        console.log(lat);
        console.log(lng);
        $.get(weather_local, function (data) {
            console.log(data);
            $('#omraade').empty().append('Område: ' + data.name);
            $('#temperatur').empty().append('temperatur: ' + data.main.temp + '&#8451;');
            $('#vejrbeskrivelse').empty().append('vejrbeskrivelse: ' + data.weather[0].description);
        });

    };

});

var link = {
    0: {'title': '', 'url': ''},
    1: {
        'title': 'Svømmehaller og badelande',
        'url': 'http://www.odensedataplatform.dk/dataset/9507b866-579f-4021-83b1-7b11140c9b86/resource/06964266-fb60-44fc-9e68-0d3fe5a9cb28/download/svoemmehallerogvandlande.json'
    },
    2: {
        'title': 'Skulpturer',
        'url': 'http://www.odensedataplatform.dk/dataset/27d3f3e4-d95a-4205-acab-d8d1c6255019/resource/f3cc5bce-a4ed-40e5-8a7f-110751dfe287/download/skulpturer.json'
    },
    3: {
        'title': 'Shelters og overnatningsmuligheder',
        'url': 'http://www.odensedataplatform.dk/dataset/c0f247e9-aa16-488c-afcb-6cc69abcdd95/resource/6093dd1c-0f83-4264-8666-404a6ba90902/download/shelters.json'
    }
};

$(document).on("pagecreate", "#odense", function () {
    localStorage.removeItem('dataset');

    var select = $('#dataset');
    $.each(link, function (value, obj) {
        select.append(
            $('<option></option>').val(value).html(obj.title)
        );
    });

    select.change(function () {
        localStorage.setItem('dataset', select.val());
        location.href = 'index.html';
    });

});