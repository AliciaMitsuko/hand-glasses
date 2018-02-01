import { Component, OnInit } from '@angular/core';
import {AccidentService} from "../services/accident.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private accidentService: AccidentService
  ) { }

  ngOnInit() {

  }

  generateAccidents(from: number, to:number) {
    let lineStart = 2;
    for (let index = from+lineStart; index < to+lineStart; index++) {
      this.accidentService.generateAccidents(index)
        .subscribe(accidents => {
        })

    }
  }

}
