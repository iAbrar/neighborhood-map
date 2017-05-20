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

}

// the viewModel
var ViewModel= function () {
var self =this;
//initialize map 
 var map;
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
	                    center: {
                        lat: 24.697285134978586,
                        lng: 46.685779094696045
                    },
                    zoom: 16
                });            
            
            //add markers
this.locationList = ko.observableArray([]);
    initialLocation.forEach(function(locationItem){
        self.locationList.push( new Location (locationItem) );
    });




}

function loadScript(){
	ko.applyBindings(new ViewModel());

}
