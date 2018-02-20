import {Component, Input, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from './map';
import 'mapbox-gl/dist/mapbox-gl.css';
import Accident from '../models/accident.model';
import {LngLat, Map} from 'mapbox-gl';
import {environment} from '../../environments/environment';
import {forEach} from '@angular/router/src/utils/collection';
import {DataService} from '../services/data.service';
import {Subscription} from 'rxjs/Subscription';
import {MapService} from '../services/map.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

    public accidentsList: Accident[];
    private subscription: Subscription;
    private geojson: any[4] = [];
    private gravityColors = ['', '#00FF00', '#FF0000', '#FFA500'];

    // The distance in km before checkin for new accident
    // This is also the standard zone distance to get accident list
    private bufferDistance = 10;
    private nearAccidentList: Accident[] = [];
    public showAlertAccident = false;

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


    constructor(private dataService: DataService,  private mapService: MapService) {
    }

    ngOnInit() {
        this.dataService.accidentsListMap.subscribe(message => { this.accidentsList = message; });

        this.subscription = this.mapService.getMessage().subscribe(message => { this.map.flyTo({center: [message.text[0], message.text[1]]}); });

        for (let _i = 1; _i < 4; _i++) {
            console.log(_i);
            this.mapService.getAllAccidentGeoJson(_i).
            subscribe(resp => {
                this.geojson[_i] = resp;
                console.log(this.geojson);
                this.showMarkers(_i);
            });
        }

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

    }

    flyTo(data: GeoJson) {
        this.map.flyTo({
            center: data.geometry.coordinates
        });
    }

    showMarkers(gravite: number) {

        this.map.addLayer({
            'id': 'accident' + gravite,
            'type': 'circle',
            'source': {
                'type': 'geojson',
                'data': this.geojson[gravite]
            },
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'circle-radius': {
                    'base': 1.75,
                    'stops': [[12, 2], [22, 180]]
                },
                'circle-color': this.gravityColors[gravite]
            }
        });

        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        /*this.map.on('click', 'accident' + gravite, function (e) {
            /*new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.name)
                .addTo(map);
            alert(e.lngLat);
            // this.mapService.sendMessage("dff");
        });*/

    }


    checkAreaForAccident() {

        if (this.calculateDistance(this.lat, this.lastLatCheck, this.lng, this.lastLngCheck) > this.bufferDistance ) {

            // If the user moved more than 10km from the last API call, then we call again to refresh our nearby accident list
            this.mapService.getAccidentWithinPerimeter(this.lat, this.lng, this.bufferDistance * 1000).
            subscribe(resp => {
                this.nearAccidentList = resp;

                // We check if we got an accident within the 50m
                // We go through the class var which contains the nearby accident and pop an alert if one is close
                for (const accident of this.nearAccidentList) {
                    if (this.calculateDistance(this.lat, accident.geojson.coordinates[1].valueOf(), this.lng, accident.geojson.coordinates[0].valueOf()) < 0.1) {
                        //alert('close');
                        this.showAlertAccident = true;
                    }
                }
            });



        } else {
            // We check if we got an accident within the 50m
            // We go through the class var which contains the nearby accident and pop an alert if one is close
            for (const accident of this.nearAccidentList) {
                if (this.calculateDistance(this.lat, accident.geojson.coordinates[1].valueOf(), this.lng, accident.geojson.coordinates[0].valueOf()) < 0.1) {
                    //alert('close');
                    this.showAlertAccident = true;
                }


            }
        }

    }

    dismissAlertAccident() {
        this.showAlertAccident = false;
    }

    calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
        const dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }
}
