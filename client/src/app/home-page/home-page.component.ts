import { Component, OnInit, ViewChild } from '@angular/core';
import Accident from "../models/accident.model";
import {AccidentService} from "../services/accident.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private lastWidth: number;
  public isShowMap = true;
  public isShowList = true;

  public accidentsList: Accident[];

  constructor(private accidentService: AccidentService,) {
  }

  ngOnInit() {
      this.accidentService.getAccidents()
          .subscribe(accidents => {
              this.accidentsList = accidents;
              console.log(accidents);
          });
  }

  onResize(event) {

    if (event.target.innerWidth >= 575 && this.lastWidth < 575) {
      this.isShowList = true;
      this.isShowMap = true;
    }

    this.lastWidth = event.target.innerWidth;


  }

  changeViewButton() {
    if (this.isShowMap === true) {
        this.isShowMap = false;
        this.isShowList = true;
    } else {
        this.isShowMap = true;
        this.isShowList = false;
    }
  }

}
