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

var map;
// Create a new blank array for all the listing markers.
var markers = [];


// Constructor creates a new map - only center and zoom are required.

 function initMap() {
        // Create a styles array to use with the map.
     

        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 24.697285134978586, lng: 46.685779094696045},
          zoom: 16,
          mapTypeControl: false
        });

  

        var largeInfowindow = new google.maps.InfoWindow();

        
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
       

      }
// create Location class
//**********************
//		Location
//**********************
var Location = function(data) {
    this.name = ko.observable(data.name);
    this.LatLng = ko.observable(data.LatLng);
    this.category = ko.observable(data.category);

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
var vm = new ViewModel();

// listener for view model initialization

// listener for google map initialization
google.maps.event.addDomListener(window, 'load', initMap());