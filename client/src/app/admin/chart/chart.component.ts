import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import Accident from "../../models/accident.model";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  accidentsList: Accident[];

  // private atmCount:number[];
  private gravCount:{data: number[], label: string}[];
  private gravCountNormLeg:{data: number[], label: string}[];
  private lumCount:number[];

  constructor(
    private dataService: DataService,
  ) {
    this.lumCount = [0,0,0];
  }

  ngOnInit() {
    this.lumCount = [0,0,0];

    this.dataService.accidentsList.subscribe(message => {
      this.accidentsList = message;
      this.updateLumCount(message);
      this.updateGravParAtmNormLeg(message);
      this.updateGravParAtm(message);

    })
  }

  updateGravParAtmNormLeg(accidents: Accident[]) {
    let indemneCount = [0,0,0]
    let mortCount = [0,0,0]
    let hopitalCount = [0,0,0]
    for (let a of accidents) {
      if (a.gravite == 1) {
        if (a.contexte.atm <= 2) {
          indemneCount[a.contexte.atm-1]++;
        }
      } else if (a.gravite == 2) {
        if (a.contexte.atm <= 2) {
          mortCount[a.contexte.atm-1]++;
        }
      } else if (a.gravite > 2) { // 3 || 4
        if (a.contexte.atm <= 2) {
          hopitalCount[a.contexte.atm-1]++;
        }
      }
    }

    this.gravCountNormLeg = [
      {data: indemneCount, label: 'Indemne'},
      {data: mortCount, label: 'Tué'},
      {data: hopitalCount, label: 'Blessé'}]

    this.barChartData = this.gravCountNormLeg;
  }

    // pas très scalable
  updateGravParAtm(accidents: Accident[]) {
    let indemneCount = [0,0,0,0,0,0]
    let mortCount = [0,0,0,0,0,0]
    let hopitalCount = [0,0,0,0,0,0]

    for (let a of accidents) {
      if (a.gravite == 1) {
        if (2 < a.contexte.atm && a.contexte.atm <= 8) {
          indemneCount[a.contexte.atm-3]++;
        }
      } else if (a.gravite == 2) {
        if (2 < a.contexte.atm && a.contexte.atm <= 8) {
          mortCount[a.contexte.atm-3]++;
        }
      } else if (a.gravite > 2) { // 3 || 4
        if (2 < a.contexte.atm && a.contexte.atm <= 8) {
          hopitalCount[a.contexte.atm-3]++;
        }
      }
    }

    this.gravCount = [
      {data: indemneCount, label: 'Indemne'},
      {data: mortCount, label: 'Tué'},
      {data: hopitalCount, label: 'Blessé'}]

    this.radarChartData = this.gravCount;
    console.log(this.radarChartData);

  }

  updateLumCount(accidents: Accident[]) {
    this.lumCount = [0,0,0]

    for (let a of accidents) {
      switch(a.contexte.lum) {
        case 1: {
          this.lumCount[0]++;
          break;
        }
        case 2: {
          this.lumCount[1]++;
          break;
        }
        case 3 || 4 || 5 : {
          this.lumCount[2]++;
          break;
        }
      }
    }

    this.lineChartData = [
      {data: this.lumCount, label: 'Luminosité'}
    ];

    this.doughnutChartData = this.lumCount;
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'},
    {data: [1,2, 3, 9, 100, 27, 40], label: 'Series D'}
  ];
  public lineChartLabels:Array<any> = ['Plein jour', 'Crép./Aube', 'Nuit'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Plein jour', 'Crépuscule/Aube', 'Nuit'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // Radar
  public radarChartLabels:string[] = [/*'Normale','Pluie légère',*/ 'Pluie forte', 'Neige', 'Brouillard', 'Vent', 'Temps éblouissant', 'Temps couvert'];

  public radarChartData:any = [];
  public radarChartType:string = 'radar';

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Cond. normale', 'Pluie legère'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [];
}
