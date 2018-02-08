import { Component, OnInit } from '@angular/core';
import {AccidentService} from '../services/accident.service';
import Accident from '../models/accident.model';
import {Sort} from '@angular/material';

@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

    public accidentsList: Accident[];
    private sortedData;

    constructor(private accidentService: AccidentService) { }

    ngOnInit() {
        this.accidentService.getAccidents()
            .subscribe(accidents => {
                this.accidentsList = accidents;
                console.log(accidents);
            });
    }


    gravToIcon(num: number) {
        switch (num) {
            case 1: {
                return '../../assets/icons/005-care.svg';
            }
            case 2: {
                return '../../assets/icons/001-medical-2.svg';
            }
            case 3  || 4 : {
                return '../../assets/icons/003-medical.svg';
            }
            default: {
                return /*'../../assets/icons/question.svg'*/;

            }
        }
    }

    lumToIcon(num: number) {
        switch (num) {
            case 1: {
                return '../../assets/icons/day.svg';
            }
            case 2: {
                return '../../assets/icons/evening.svg';
            }
            case 3  || 4 || 5 : {
                return '../../assets/icons/moon2.svg';
            }
            default: {
                // return 'indéfini';
                return ' ';

            }
        }
    }

    atmToIcon(num: number) {
        switch (num) {
            case 1: {
                return '../../assets/icons/004-sun.svg';
            }
            case 2 || 3: {
                return '../../assets/icons/005-rain.svg';
            }
            case 4: {
                return '../../assets/icons/003-snowflake.svg';
            }
            case 5: {
                return '../../assets/icons/002-clouds.svg';
            }
            case 6: {
                return '../../assets/icons/001-wind.svg';
            }
            case 7: {
                return '../../assets/icons/004-sun.svg';
            }
            case 8: {
                return '../../assets/icons/002-clouds.svg';
            }
            default: {
                return '../../assets/icons/question.svg';

            }
        }
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
