import {Component, Input, OnInit} from '@angular/core';
import {AccidentService} from '../services/accident.service';
import Accident from '../models/accident.model';
import {Sort} from '@angular/material';
import {IconService} from '../services/icon.service';
import {DataService} from '../services/data.service';
import {MapService} from '../services/map.service';

@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

    public accidentsList: Accident[];

    private hasAlreadyVotedGood: Accident[] = [];
    private hasAlreadyVotedBad: Accident[] = [];

    private sortedData;

    constructor(
        private iconService: IconService, private dataService: DataService, private mapService: MapService, private accidentService: AccidentService) { }

    ngOnInit() {
        this.dataService.accidentsListMap.subscribe(message => {this.accidentsList = message; });
    }

    addGood(accident: Accident) {

        if (!this.hasAlreadyVotedGood.includes(accident)) {
            accident.good += 1;
            this.accidentService.editAccident(accident).subscribe(res => {
                this.hasAlreadyVotedGood.push(accident);
            }, err => {
            });
        }
    }

    addBad(accident: Accident) {

        if (!this.hasAlreadyVotedBad.includes(accident)) {
            accident.bad += 1;
            this.accidentService.editAccident(accident).subscribe(res => {
                this.hasAlreadyVotedBad.push(accident);
            }, err => {
            });
        }

    }

    goToMap(geojson: Array<number>) {
        console.log(geojson);

        if (geojson[0] === 0 && geojson[0] === 0) {
            // If the coordinates are equals to 0 it means that we don't know the location so we don't display it
            alert('pas de coord');
        } else {
            this.mapService.sendMessage(geojson);
        }
    }

    atmToIcon(num: number): string {
        return this.iconService.atmToIcon(num);
    }

    lumToIcon(num: number): string {
        return this.iconService.lumToIcon(num);
    }

    gravToIcon(num: number): string {
        return this.iconService.gravToIcon(num);
    }

    gravToText(num: number): string {
        const myNum = '' + num;
        switch (parseInt(myNum)) {
            case 1: {
                return 'Accident léger';
            }
            case 2: {
                return 'Accident grave';
            }
            case 3 : {
                return 'Accident léger';
            }
            case 4 : {
                return 'Accident léger';
            }
            default: {
                // return 'indéfini';
                return '';
            }
        }
    }


    sortData(sort: Sort) {
        const data = this.accidentsList.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

       /* if (sort.active === 'distance') {


            if (navigator.geolocation) {

                alert('yes');
                navigator.geolocation.getCurrentPosition(position => {
                    alert('wesh');
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    this.mapService.getAccidentWithinPerimeter(lat, lng, 1000000000000000).subscribe(resp => {

                        this.accidentsList = [];
                        //this.accidentsList = resp;
                        console.log(resp);
                        return;

                    });

                });
            } else {
                alert('no');
            }

        } else {*/
            this.accidentsList = data.sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                    case 'gravite': return this.compare(a.gravite, b.gravite, isAsc);
                    case 'lum': return this.compare(+a.contexte.lum, +b.contexte.lum, isAsc);
                    case 'atm': return this.compare(+a.contexte.atm, +b.contexte.atm, isAsc);
                    // case 'distance': return this.
                    default: return 0;
                }
            });
        // }
    }

    compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    displayAccidentInfo(accident: Accident) {
        return accident.good - accident.bad;
    }

}
