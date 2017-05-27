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
    initApp: function(viewM) {
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
    this.category = ko.observable(data.category);

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
			// tell viewmodel to show this location
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

// *******************************
// *    INITINALIZATION          *
// *******************************
	self.initApp = function() {
		var categoryArray = [];
		var selectedCatArray = [];

		// create container for location
		self.locationList = ko.observableArray([]);

		// loop through locations array and convert to ko object
		Locations.forEach(function(location) {
			self.locationList.push(new Location(location, self));

			// loop through category for each location and add to self.selected
			location.category(function(data){
				// if current tag is not already a filter, add to self.filters
				if (categoryArray.indexOf(data) < 0) {
					categoryArray.push(category);
				}
			});// end tag loop
		});// end location loop

		// loop through tags and make filter objects from them
		categoryArray.forEach(function(category){
			selectedCatArray.push(new Filter({name: category}));
		});

		// set selected based on temporary array
		// this has performance benefits over pushing items one at a time
		self.filters = ko.observableArray(selectedCatArray);

		// array of filters currently applied
		self.currentFilters = ko.computed(function() {
			var tempCurrentFilters = [];

			// loop through filters and get all filters that are on
			ko.utils.arrayForEach(self.filters(), function(filter){
				if (filter.visiable()) tempCurrentFilters.push(filter.name());
			});

			return tempCurrentFilters;
		});

		// array of locations to be shown based on currentFilters
		 self.filteredLocations = ko.computed(function() {
			var tempLoca = ko.observableArray([]);
			var returnLocations = ko.observableArray([]);

			// apply filter
			ko.utils.arrayForEach(self.locationList(), function(location){
				var locationCat = location.category();

				// loop through all tags for a place and
				// determine if any are also a currently applied filter
				var intersections = placeTags.filter(function(tag){
					return self.currentFilters().indexOf(tag) != -1;
				});

				// if one or more tags for a place are in a filter, add it
				if (intersections.length > 0) tempLocations.push(location);
			});

			var tempSearchFilter = self.searchFilter().toLowerCase();

			// if there is no additional text to search for, return filtered locations
			if (!tempSearchFilter){
				returnLocations = tempLoca();
			}
			// if user is also searching via text box, apply text filter
			else{
				returnLocations = ko.utils.arrayFilter(tempLoca(), function(locatio) {
		        	return location.name().toLowerCase().indexOf(tempSearchFilter) !== -1;
		        });
			}

			// hide/show correct markers based on list of current locations
			self.filterMarkers(returnLocations);
			return returnLocations;

		});

		// if no markers have been shown, show them
		if (!self.hasMarkers) self.showMarkers();
		self.initialized = true;
	};


// *******************************
// *          Methods            *
// *******************************

	self.filterMarkers = function(filteredLocations) {
		ko.utils.arrayForEach(self.locationList(), function(location){
			if (filteredLocations.indexOf(location) === -1) {
				location.marker.setVisible(false);
			}
			else{
				location.marker.setVisible(true);
			}
		});
	};

	// show marker for each place
	self.showMarkers = function() {
		ko.utils.arrayForEach(self.locationList(), function(location){
			location.marker.setMap(googleMap.map);
		});

		self.hasMarkers = true;
	};


}; //end view

// *******************************
// *            SETUP            *
// *******************************

// empty view model
var viewM = new ViewModel();


// listener for view model initialization
$(document).ready(function() {
    viewM.initApp();
    ko.applyBindings(viewM);

    // resize map and reset center when window size changes
    $(window).on('resize', function() {
        google.maps.event.trigger(googleMap.map, 'resize');
        googleMap.map.setCenter(googleMap.options.center);
    });
});

// listener for google map initialization
google.maps.event.addDomListener(window, 'load', googleMap.initApp(viewM));
// *******************************
// *      ERROR Handling         *
// *******************************

function ErrorHandling(){
	alert("Google Maps has failed to load. Please check your internet connection and try again.");
}