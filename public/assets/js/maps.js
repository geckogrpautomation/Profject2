function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:0,
  };



  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    // load natural event data from nasa into google maps
    map.data.loadGeoJson(
      "https://eonet.sci.gsfc.nasa.gov/api/v3/events/geojson");
      

       var infowindow = new google.maps.InfoWindow();
  
  // When the user clicks, open an infowindow
    map.data.addListener('click', function(event) {
    var myHTML = event.feature.getProperty("id") + `<br>`+ event.feature.getProperty("title") + `<br>` + event.feature.getProperty("date") +`<br>` + event.feature.getProperty("link");
    infowindow.setContent("<div style='width:200px; color:black'>"+myHTML+"</div>");
    // position the infowindow on the marker
    infowindow.setPosition(event.feature.getGeometry().get());
    // anchor the infowindow on the marker
    infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
    infowindow.open(map);
  });
  
  }
  