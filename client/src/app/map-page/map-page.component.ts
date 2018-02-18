import {Component, Input, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from './map';
import 'mapbox-gl/dist/mapbox-gl.css';
import Accident from '../models/accident.model';
import {LngLat, Map} from 'mapbox-gl';
import {environment} from '../../environments/environment';
import {forEach} from '@angular/router/src/utils/collection';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

    public geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913]
            },
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
            }
        },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }
            }]
    };



     public accidentsList: Accident[];

    // The distance in km before checkin for new accident
    // This is also the standard zone distance to get accident list
    private bufferDistance = 10;

    // We store the last coordinates corresponding tp the last API call
    private lastLatCheck = 0;
    private lastLngCheck = 0;


    public map: Map;

    // map: mapboxgl.Map;
    // style = 'mapbox://styles/mapbox/outdoors-v9';
    private style = 'mapbox://styles/mapbox/light-v9';
    // style = 'mapbox://styles/jonahadkins/cim3kbhey0091cwm21d1dvsgo';
    private lat = 48.86;
    private lng = 2.33;
    message = '';
    // data
    source: any;
    markers: any;

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.accidentsListMap.subscribe(message => this.accidentsList = message);
        this.initializeMap();
    }

    private initializeMap() {
        /// locate the user
        if (navigator.geolocation) {

            // Go to current user location the first time we got his location
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

                this.map.flyTo({
                    center: [this.lng, this.lat]
                });


            });

            // We move his cursor when he moves
            navigator.geolocation.watchPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

                // We keep the map centered on the user
                this.map.flyTo({
                    center: [this.lng, this.lat]
                });

                // We check if he is close to an accident area
                this.checkAreaForAccident();

                // alert('position changed');

            });
        }
        this.buildMap();
    }
    buildMap() {

        mapboxgl.accessToken = environment.mapbox.accessToken;
        this.map = new Map({
            container: 'map',
            style: this.style,
            zoom: 13,
            center: [this.lng, this.lat]
        });

        /// Add map controls
        const nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'bottom-left');

        // Add geolocate control to the map.
        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        // Show user location
        //

        /// Add realtime firebase data on map load
        this.map.on('load', (event) => {

           this.showMarkers();

        });
    }

    /// Helpers
    removeMarker(marker) {
        // this.mapService.removeMarker(marker.$key)
    }

    flyTo(data: GeoJson) {
        this.map.flyTo({
            center: data.geometry.coordinates
        });
    }

    showMarkers() {
        /*this.map.addLayer({
            'id': 'population',
            'type': 'circle',
            'source': {
                type: 'vector',
                url: 'mapbox://examples.8fgz4egr'
            },
            'source-layer': 'sf2010',
            'paint': {
                // make circles larger as the user zooms from z12 to z22
                'circle-radius': {
                    'base': 1.75,
                    'stops': [[12, 2], [22, 180]]
                },
                // color circles by ethnicity, using a match expression
                // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                'circle-color': [
                    'match',
                    ['get', 'ethnicity'],
                    'White', '#fbb03b',
                    'Black', '#223b53',
                    'Hispanic', '#e55e5e',
                    'Asian', '#3bb2d0',
                    /* other */ '#ccc';
                /*]
            }
        });*/

        for (let _i = 0; _i < this.accidentsList.length; _i++) {

            console.log(this.accidentsList[_i]);

            this.map.addSource(this.accidentsList[_i].num, {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point', //this.accidentsList[_i]['geojson'].type,
                            'coordinates': [this.accidentsList[_i]['geojson'].coordinates[0]
                                , this.accidentsList[_i]['geojson'].coordinates[1]]
                        }
                    }]
                }
            });

            this.map.addLayer({
                'id': this.accidentsList[_i].num,
                'type': 'circle',
                'source': this.accidentsList[_i].num,
                'paint': {
                    'circle-radius': {
                        stops: [
                            [5, 1],
                            [15, 30]
                        ],
                        base: 2
                    },
                    'circle-color': 'red',
                    'circle-opacity': 0.6
                }
            });
        }


    }

    checkAreaForAccident() {
        if (this.calculateDistance(this.lat, this.lng, this.lastLatCheck, this.lastLngCheck) > 10 ) {
            // If the user moved more than 10km from the last API call, then we call again to refresh our nearby accident list
            // http://localhost:3000/api/dangers/?lat=43.6157&long=7.0719&distance=25
            // Then we store it as class variable
        }

        // We check if we got an accident within the 50m
        // We go through the class var which contains the nearby accident and pop an alert if one is close

    }

    calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
        const dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }
}
