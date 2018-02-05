import { Component, OnInit } from '@angular/core';
import {AccidentService} from '../services/accident.service';
import Accident from '../models/accident.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

    public accidentsList: Accident[];

  constructor(private accidentService: AccidentService) { }

  ngOnInit() {
      this.accidentService.getAccidents()
          .subscribe(accidents => {
              this.accidentsList = accidents
              console.log(accidents);
          });
  }

    gravToIcon(num: number) {
        switch(num) {
            case 1: {
                return '../../assets/icons/like.svg';
            }
            case 2: {
                return '../../assets/icons/skull.svg';
            }
            case 3  || 4 : {
                return '../../assets/icons/accident.svg';
            }
            default: {
                return '../../assets/icons/question.svg';

            }
        }
    }

}
