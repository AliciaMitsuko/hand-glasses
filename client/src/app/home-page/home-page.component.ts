import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private lastWidth: number;
  public isShowMap = true;
  public isShowList = true;

  constructor() {
  }

  ngOnInit() {
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
