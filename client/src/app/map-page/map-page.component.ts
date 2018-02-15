import {Component, Input, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../map';
import 'mapbox-gl/dist/mapbox-gl.css';
import Accident from '../models/accident.model';
import {LngLat, Map} from 'mapbox-gl';
import {environment} from "../../environments/environment";

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

    @Input() accidentsList: Accident[];

    map: Map;

    // map: mapboxgl.Map;
    // style = 'mapbox://styles/mapbox/outdoors-v9';
    style = 'mapbox://styles/mapbox/light-v9';
    // style = 'mapbox://styles/jonahadkins/cim3kbhey0091cwm21d1dvsgo';
    lat = 48.86;
    lng = 2.33;
    message = '';
    // data
    source: any;
    markers: any;

    constructor() {
    }

    ngOnInit() {
        this.initializeMap();
    }

    private initializeMap() {
        /// locate the user
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

                this.map.flyTo({
                    center: [-74.50, 40]
                });

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

        this.map.addSource('source_circle_500', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-74.50, 40]
                    }
                }]
            }
        });

        this.map.addLayer({
            'id': 'circle500',
            'type': 'circle',
            'source': 'source_circle_500',
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
