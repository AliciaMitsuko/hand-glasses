import {Component, Input, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import 'mapbox-gl/dist/mapbox-gl.css';
import Accident from '../models/accident.model';
import {LngLat, Map} from 'mapbox-gl';

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
    lat = 48.86;
    lng = 2.33;
    message = '';
    // data
    source: any;
    markers: any;

    constructor(private mapService: MapService) {
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
                    center: [this.lng, this.lat]
                });

            });
        }
        this.buildMap();
    }
    buildMap() {

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
        this.map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [this.lng, this.lat]
                        },
                        'properties': {
                            'title': 'Mapbox DC',
                            'icon': 'monument'
                        }
                    }, {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-122.414, 37.776]
                        },
                        'properties': {
                            'title': 'Mapbox SF',
                            'icon': 'harbor'
                        }
                    }]
                }
            },
            'layout': {
                'icon-image': '{icon}-15',
                'text-field': '{title}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top'
            }
        });
    }
}
