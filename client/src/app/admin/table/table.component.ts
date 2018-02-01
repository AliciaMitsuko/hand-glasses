import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {AccidentService} from "../../services/accident.service";
import Accident from "../../models/accident.model";

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

  accidentsList: Accident[];

  constructor(
    private accidentService: AccidentService
  ) {
  }

  ngOnInit(): void {
    // this.http.get("app/demo/data.json")
    //   .subscribe((data)=> {
    //     setTimeout(()=> {
    //       this.data = data.json();
    //     }, 1000);
    //   });

    /* todo: have to load it only one time */
    this.accidentService.getAccidents()
      .subscribe(accidents => {
        this.accidentsList = accidents
        console.log(accidents)
      })

  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.dep.length;
  }
}
