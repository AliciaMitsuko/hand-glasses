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

  gravIndex: number = 0;
  atmIndex: number = 0;
  lumIndex: number = 0;
  surfIndex: number = 0;

  constructor(
        private dataService: DataService,
        private accidentService: AccidentService
    ) { }

  ngOnInit(): void {
      this.getAccidents();

   }

  getAccidents() {
    console.log("ts: getAccidents");
    this.accidentService.getAccidents()
      .subscribe(accidents => {
        console.log("ts: subscribe getAccidents");
        console.log(accidents)
        this.accidentsList = accidents
        this.dataService.changeAccidentList(accidents); // update accidentList to component which are subscribed
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
    if (this.gravIndex == grav) {
      this.stringGrav = "";
      this.gravIndex = 0;
    } else {
      this.stringGrav = "&gravite="+grav;
      this.gravIndex = grav;
    }

    this.getAccidentsParam();
  }

  getAccidentsLum(lum :number) {
    if (this.lumIndex == lum) {
      this.stringLum = "";
      this.lumIndex = 0;

    } else {
      this.stringLum = "&lum="+lum;
      this.lumIndex = lum;
    }

    this.getAccidentsParam();
  }

  getAccidentsAtm(atm :number) {
    if (this.atmIndex == atm) {
      this.stringAtm = "";
      this.atmIndex = 0;
    } else {
      this.stringAtm = "&atm="+atm;
      this.atmIndex = atm;
    }

    this.getAccidentsParam();
  }

  getAccidentsSurf(surf :number) {
    if (this.surfIndex == surf) {
      this.stringSurf = "";
      this.surfIndex = 0;
    } else {
      this.stringSurf = "&surf="+surf;
      this.surfIndex = surf;
    }

    this.getAccidentsParam();
  }

  resetFilter() {
    this.stringGrav="";
    this.stringAtm="";
    this.stringLum="";
    this.stringSurf="";

    this.gravIndex = 0;
    this.lumIndex = 0;
    this.atmIndex = 0;
    this.surfIndex = 0;

    this.getAccidents();

  }



    selectedIndex: number = 1;

  setIndex(index: number) {
   this.selectedIndex = index;
  }
}
