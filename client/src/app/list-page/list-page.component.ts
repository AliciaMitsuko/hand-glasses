import { Component, OnInit } from '@angular/core';
import {AccidentService} from '../services/accident.service';
import Accident from '../models/accident.model';
import {Sort} from '@angular/material';
import {IconService} from "../services/icon.service";

@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

    public accidentsList: Accident[];
    private sortedData;

    constructor(
      private accidentService: AccidentService,
      private iconService: IconService) { }

    ngOnInit() {
        this.accidentService.getAccidents()
            .subscribe(accidents => {
                this.accidentsList = accidents;
                console.log(accidents);
            });
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

}
