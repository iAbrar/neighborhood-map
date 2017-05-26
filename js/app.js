"use strict";

// Create marker for the location "Data Model"
//**********************
//		Locations
//**********************

var Locations = [{
        "name": "Nino",
        "LatLng": {
            lat: 24.698162,
            lng: 46.686809
        },
        "category": "Restaurant"
    },
    {
        "name": "Centria Mall",
        "LatLng": {
            lat: 24.697509,
            lng: 46.683966
        },
        "category": "Shopping"
    },
    {
        "name": "Al Faisaliah Mall",
        "LatLng": {
            lat: 24.689536,
            lng: 46.685833
        },
        "category": "Shopping"
    },
    {
        "name": "Café Bateel",
        "LatLng": {
            lat: 24.699741,
            lng: 46.690741
        },
        "category": "Cafe"
    },
    {
        "name": "Diamond Restaurant",
        "LatLng": {
            lat: 24.699542,
            lng: 46.692356
        },
        "category": "Restaurant"
    },
    {
        "name": "Tim Hortons",
        "LatLng": {
            lat: 24.69866,
            lng: 46.689851
        },
        "category": "Cafe"
    },
    {
        "name": "Bab Al-Yemen Restaurant",
        "LatLng": {
            lat: 24.693966,
            lng: 46.678768
        },
        "category": "Restaurant"
    },
    {
        "name": "Panorama Mall",
        "LatLng": {
            lat: 24.692129,
            lng: 46.670512
        },
        "category": "Shopping"
    }
];
//initialize map 
//**********************
//		Map
//**********************


// Constructor creates a new map - only center and zoom are required.

var googleMap = {
    map: {},

    options: {
        center: {
            lat: 24.697285134978586,
            lng: 46.685779094696045
        },
        zoom: 16
    },
    infoWindowContent: '<div> </div>',
    initMap: function(viewM) {
        googleMap.map = new google.maps.Map(document.getElementById('map'), googleMap.options);
    }
}; // end googleMap 



/*
     
        
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < Locations.length; i++) {
          // Get the position from the location array.
          var position = Locations[i].location;
          var title = Locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
         //  icon: defaultIcon,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open the large infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
        }
       
*/

// create Location class
//**********************
//		Location
//**********************
var Location = function(data) {
    this.name = ko.observable(data.name);
    this.LatLng = ko.observable(data.LatLng);
    this.selectedCategory = ko.observable(data.category);

// google map marker
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.lat, data.lng),
            title: data.name,
            animation: google.maps.Animation.DROP,
          });

           	// click handler for google maps marker
	google.maps.event.addListener(marker, 'click', (function(Location, parent) {
		return function() {
			// tell viewmodel to show this place
			parent.showPlace(Location);
		};
	}) (this, parent));
	this.marker = marker;

}; // end Location class

// create Category class
//**********************
//		Category
//**********************
var Category = function(data){
this.name= ko.observable(data.name);
this.visiable = ko.observable(true);
};

// the viewModel
//**********************
//		View Model
//**********************
var ViewModel = function() {
    var self = this;


}; //end view

// *******************************
// *            SETUP            *
// *******************************

// empty view model
var viewM = new ViewModel();

/*
// listener for view model initialization
$(document).ready(function() {
    viewM.initMap();
    ko.applyBindings(viewM);

    // resize map and reset center when window size changes
    $(window).on('resize', function() {
        google.maps.event.trigger(googleMap.map, 'resize');
        googleMap.map.setCenter(googleMap.options.center);
    });
});*/

// listener for google map initialization
google.maps.event.addDomListener(window, 'load', googleMap.initMap(viewM));
// *******************************
// *      ERROR Handling         *
// *******************************

function ErrorHandling(){
	alert("Google Maps has failed to load. Please check your internet connection and try again.");
}