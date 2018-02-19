import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {AccidentService} from "../../services/accident.service";
import Accident from "../../models/accident.model";
import {DataService} from "../../services/data.service";
import {IconService} from "../../services/icon.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "num";
  public sortOrder = "asc";

  accidentsListBad: Accident[];
  accidentsList: Accident[];

  constructor(
    private dataService: DataService,
    private accidentService: AccidentService,
    private iconService: IconService
  ) {
  }

  ngOnInit(): void {
    this.dataService.accidentsList.subscribe(message => this.accidentsList = message)

    // todo: faire une requete moins lourde
    this.accidentService.getAccidentsThreshold('-3')
      .subscribe(accidents => {
        this.accidentsListBad = accidents
      })
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

  surfToIcon(num: number) {
    return this.iconService.surfToIcon(num);
  }

  setAccidentToEdit(accident: Accident) {
    this.dataService.changeAccidentToEdit(accident);
  }

  setChecked(accident: Accident) {
    accident['checked'] = true;
  }

  public sortByWordLength = (a: any) => {
    return a.dep.length;
  }
}
