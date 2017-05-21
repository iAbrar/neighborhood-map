'use strict';

// Create marker for the location "Model"
var initialLocation = [
{
	"name":"Nino",
	"LatLng":{lat:24.698162 ,lng:46.686809},
	"category": "Restaurant"
},
{
	"name":"Centria Mall",
	"LatLng":{lat:24.697509,lng:46.683966},
	"category": "Shopping"
},
{
	"name":"Al Faisaliah Mall",
	"LatLng":{lat:24.689536,lng:46.685833},
	"category": "Shopping"
},
{
	"name":"Café Bateel",
	"LatLng":{lat:24.699741,lng:46.690741},
	"category": "Cafe"
},
{
	"name":"Diamond Restaurant",
	"LatLng":{lat:24.699542,lng:46.692356},
	"category": "Restaurant"
},
{
	"name":"Tim Hortons",
	"LatLng":{lat:24.69866,lng:46.689851},
	"category": "Cafe"
},
{
	"name":"Bab Al-Yemen Restaurant",
	"LatLng":{lat:24.693966,lng:46.678768},
	"category": "Restaurant"
},
{
	"name":"Panorama Mall",
	"LatLng":{lat:24.692129,lng:46.670512},
	"category": "Shopping"
}
];
// create Location class
var Location = function(data){
this.name = ko.observable(data.name);
this.LatLng = ko.observable(data.LatLng);
this.category = ko.observable(data.category);
this.visible = ko.observable(true);

}
            // add markers of locations on the map
  function addMarkers(locations,map) {
    // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].LatLng;
          var title = locations[i].name;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
        console.log(locations.length);
}

// the viewModel
var ViewModel= function () {
var self =this;
 this.filterSearch = ko.observable("");

this.locationList = ko.observableArray([]);

    initialLocation.forEach(function(locationItem){
        self.locationList.push( new Location(locationItem) );
    });


//initialize map 
 var map;
       // Create a new blank array for all the listing markers.
      var markers = [];
       var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
	                    center: {
                        lat: 24.697285134978586,
                        lng: 46.685779094696045
                    },
                    zoom: 16
                });    
	
this.filteredList = ko.computed( function() {
		var filter = self.filterSearch().toLowerCase();
		if (!filter) {
			self.locationList().forEach(function(locationItem){
				locationItem.visible(true);
			});
			return self.locationList();
		} else {
			return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
				var string = locationItem.name.toLowerCase();
				var result = (string.search(filter) >= 0);
				locationItem.visible(result);
				return result;
			});
		}
	}, self);
               


  function addMarkers(locations,map) {
    // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].LatLng;
          var title = locations[i].name;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
}

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }
addMarkers(initialLocation,map);
};//end view

function loadScript(){
	ko.applyBindings(new ViewModel);

}
