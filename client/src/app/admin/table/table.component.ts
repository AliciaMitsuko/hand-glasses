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

  atmToIcon(num: number) {
    console.log(num)
    switch(num) {
      case 1: {
        return '../../../assets/icons/sun.svg'
      }
      case 2 || 3: {
        return '../../../assets/icons/rain.svg'
      }
      case 4: {
        return '../../../assets/icons/snowflake.svg'
      }
      case 5: {
        return '../../../assets/icons/cloud.svg'
      }
      case 6: {
        return '../../../assets/icons/wind.svg'
      }
      case 7: {
        return '../../../assets/icons/sun.svg'
      }
      case 8: {
        return '../../../assets/icons/cloud.svg'
      }
      default: {
        return '../../../assets/icons/question.svg'

      }
    }
  }

  lumToIcon(num: number) {
    switch(num) {
      case 1: {
        return '../../../assets/icons/sun.svg'
      }
      case 2: {
        return '../../../assets/icons/twilight.svg'
      }
      case 3  || 4 || 5 : {
        return '../../../assets/icons/moon.svg'
      }
      default: {
        return '../../../assets/icons/question.svg'

      }
    }
  }

  gravToIcon(num: number) {
    switch(num) {
      case 1: {
        return '../../../assets/icons/like.svg'
      }
      case 2: {
        return '../../../assets/icons/skull.svg'
      }
      case 3  || 4 : {
        return '../../../assets/icons/accident.svg'
      }
      default: {
        return '../../../assets/icons/question.svg'

      }
    }
  }

  surfToIcon(num: number) {
    switch(num) {
      default: {
        return '../../../assets/icons/question.svg'

      }
    }
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.dep.length;
  }
}
