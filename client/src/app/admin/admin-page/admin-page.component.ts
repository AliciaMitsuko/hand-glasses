import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import ToDo from '../../models/todo.model';
import Accident from "../../models/accident.model";
import {AccidentService} from "../../services/accident.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  accidentsList: Accident[];

  // gravite=1&atm=1&lum=5&surf=1

  stringGrav="";
  stringAtm="";
  stringLum="";
  stringSurf="";
    constructor(
        private dataService: DataService,
        private accidentService: AccidentService
    ) { }

  ngOnInit(): void {
      this.getAccidents();

   }

  getAccidents() {
    this.accidentService.getAccidents()
      .subscribe(accidents => {
        this.accidentsList = accidents
        this.dataService.changeAccidentList(accidents); // update accidentList to component which are subscribed
        console.log(accidents)
      })
  }

  getAccidentsParam() {
      let stringParam = this.stringGrav+this.stringAtm+this.stringLum+this.stringSurf;
    this.accidentService.getAccidentsParams(stringParam)
      .subscribe(accidents => {
        this.accidentsList = accidents
        this.dataService.changeAccidentList(accidents); // update accidentList to component which are subscribed
      })
  }

  getAccidentsGrav(grav :number) {
    this.stringGrav = "&gravite="+grav;

    this.getAccidentsParam();
  }

  getAccidentsLum(lum :number) {
    this.stringLum = "&lum="+lum;

    this.getAccidentsParam();
  }

  getAccidentsAtm(atm :number) {
    this.stringAtm = "&atm="+atm;

    this.getAccidentsParam();
  }

  getAccidentsSurf(surf :number) {
    this.stringSurf = "&surf="+surf;

    this.getAccidentsParam();
  }

  resetFilter() {
    this.stringGrav="";
    this.stringAtm="";
    this.stringLum="";
    this.stringSurf="";

    this.getAccidents();

  }



    selectedIndex: number = 1;

  setIndex(index: number) {
   this.selectedIndex = index;
  }
}
