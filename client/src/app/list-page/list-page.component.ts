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

    private sortedData;

    constructor(
        private iconService: IconService, private dataService: DataService, private mapService: MapService, private accidentService: AccidentService) { }

    ngOnInit() {
        this.dataService.accidentsListMap.subscribe(message => this.accidentsList = message);
    }

    addGood(accident: Accident) {
        accident.good += 1;
        this.accidentService.editAccident(accident).subscribe(res => {
            console.log('Update Succesful');
        }, err => {

            console.error('Update Unsuccesful');
        });
    }

    addBad(accident: Accident) {
        accident.bad += 1;
        this.accidentService.editAccident(accident).subscribe(res => {
            console.log('Update Succesful');
        }, err => {

            console.error('Update Unsuccesful');
        });
    }

    goToMap(geojson: Array<number>) {
        console.log(geojson);

        if (geojson[0] === 0 && geojson[0] === 0) {
            // If the coordinates are equals to 0 it means that we don't know the location so we don't display it
            alert("pas de coord");
        } else {
            this.mapService.sendMessage(geojson);
        }
    }

    atmToIcon(num: number) {
        return this.iconService.atmToIcon(num);
    }

    lumToIcon(num: number) {
        return this.iconService.lumToIcon(num);
    }

    gravToIcon(num: number) {
        return this.iconService.gravToIcon(num);
    }


    sortData(sort: Sort) {
        const data = this.accidentsList.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.accidentsList = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'gravite': return this.compare(a.gravite, b.gravite, isAsc);
                case 'lum': return this.compare(+a.contexte.lum, +b.contexte.lum, isAsc);
                case 'atm': return this.compare(+a.contexte.atm, +b.contexte.atm, isAsc);
                default: return 0;
            }
        });
    }

    compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    displayAccidentInfo(amount: number) {
        if (amount > 0) {
            return amount;
        }
    }

}
