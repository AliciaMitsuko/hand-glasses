import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../services/data.service";

import {current} from "codelyzer/util/syntaxKind";
import Accident from "../../models/accident.model";
import {AccidentService} from "../../services/accident.service";
import {Observable} from "rxjs/Observable";
import {IconService} from "../../services/icon.service";
import {environment} from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {LngLat, Map} from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  idModal: number;

  message:string;
  countAtm:Observable<number[]>;
  countLum:Observable<number[]>;
  countSurf:Observable<number[]>;
  countGrav:Observable<number[]>;

  boolMarker = true;

  accidentToEdit: Accident;
  accidentsList: Accident[];

  private lat = 48.8566;
  private lng = 2.3522;
  public map: Map;
  private style = 'mapbox://styles/mapbox/light-v9';

  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private iconService: IconService,
    private accidentService: AccidentService
) {
    this.idModal = 0;
    this.countGrav = Observable.range(1, 4).toArray();
    this.countAtm = Observable.range(1, 9).toArray();
    this.countLum = Observable.range(1, 5).toArray();
    this.countSurf = Observable.range(1, 9).toArray();
  }

  ngOnInit(): void {

    this.buildMap();

    this.dataService.accidentToEdit.subscribe(message => {
      this.accidentToEdit = message
      if (message['geojson'] != undefined) {
        this.lng = message['geojson'].coordinates[0].valueOf();
        this.lat = message['geojson'].coordinates[1].valueOf();


        this.map.on('load', (event) => {
          if (this.boolMarker) {
            this.showMarker();
            this.boolMarker = false; // temporaty fixe
          }

          this.map.flyTo({
            center: [this.lng, this.lat]
          });
        });

      }
    });
    this.dataService.accidentsList.subscribe(message => this.accidentsList = message) // moche :(

  }

  buildMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new Map({
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [this.lng, this.lat]
    });
    this.boolMarker = true;


    /*this.map.on('load', (event) => {
      this.showMarker();

      this.map.flyTo({
        center: [this.lng, this.lat]
      });
    });*/


    /// Add map controls
    // const nav = new mapboxgl.NavigationControl();
    // this.map.addControl(nav, 'bottom-left');

    // Add geolocate control to the map.
    // this.map.addControl(new mapboxgl.GeolocateControl({
    //   positionOptions: {
    //     enableHighAccuracy: true
    //   },
    //   trackUserLocation: true
    // }));
  }

  showMarker() {

    this.map.addLayer({
      'id': this.accidentToEdit._id,
      'type': 'circle',
      'source': {
        'type': 'geojson',
        'data': {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [this.lng, this.lat]
            }
          }]
        }
      }
    });


  }

  close() {
    this.activeModal.close();
  }

  editAccident(accident: Accident) {
    this.accidentService.editAccident(accident).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editAccident(accident)
      console.error('Update Unsuccesful')
    })

    this.activeModal.close();
  }


  deleteAccident(accident: Accident) {

    // je ne sais pas pourquoi il retourne une erreur... mais ca supprime bien
    this.accidentService.deleteAccident(accident._id).subscribe(res => {

      // this.accidentsList.splice(this.accidentsList.indexOf(accident), 1);
      // this.dataService.changeAccidentList(this.accidentsList);
      //
      // this.activeModal.close();
    })
    this.accidentsList.splice(this.accidentsList.indexOf(accident), 1);
    this.dataService.changeAccidentList(this.accidentsList);

    this.activeModal.close();
  }

  atmToString(num: number) {return this.iconService.atmToString(num);}
  lumToString(num: number) {return this.iconService.lumToString(num);}
  surfToString(num: number) {return this.iconService.surfToString(num);}
  gravToString(num: number) {return this.iconService.gravToString(num);}

}
