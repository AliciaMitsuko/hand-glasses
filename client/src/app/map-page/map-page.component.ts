import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/outdoors-v9';
    lat = 48.86;
    lng = 2.33;
    message = '';
    // data
    source: any;
    markers: any;
    constructor(private mapService: MapService) {
    }
    ngOnInit() {
        //this.markers = this.mapService.getMarkers()
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

        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 13,
            center: [this.lng, this.lat]
        });

        /// Add map controls
        const nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'bottom-left');

        //// Add Marker on Click
        this.map.on('click', (event) => {
            const coordinates = [event.lngLat.lng, event.lngLat.lat];
            const newMarker   = new GeoJson(coordinates, { message: this.message });
            //this.mapService.createMarker(newMarker)
        });

        /// Add realtime firebase data on map load
        this.map.on('load', (event) => {
            /// register source
            this.map.addSource('firebase', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });
            /// get source
            this.source = this.map.getSource('firebase');
            /// subscribe to realtime database and set data source
            /*this.markers.subscribe(markers => {
                let data = new FeatureCollection(markers)
                this.source.setData(data)
            })*/
            /// create map layers with realtime data
            this.map.addLayer({
                id: 'firebase',
                source: 'firebase',
                type: 'symbol',
                layout: {
                    'text-field': '{message}',
                    'text-size': 24,
                    'text-transform': 'uppercase',
                    'icon-image': 'rocket-15',
                    'text-offset': [0, 1.5]
                },
                paint: {
                    'text-color': '#f16624',
                    'text-halo-color': '#fff',
                    'text-halo-width': 2
                }
            });
        });
    }
    /// Helpers
    removeMarker(marker) {
        //this.mapService.removeMarker(marker.$key)
    }
    flyTo(data: GeoJson) {
        this.map.flyTo({
            center: data.geometry.coordinates
        });
    }
}
