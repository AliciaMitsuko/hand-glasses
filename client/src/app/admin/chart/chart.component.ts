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

  private atmCount:number[];
  private gravCount:{data: number[], label: string};
  private lumCount:number[];

  constructor(
    private dataService: DataService,
  ) {
    this.lumCount = [0,0,0];
  }

  ngOnInit() {
    this.lumCount = [0,0,0];

    this.dataService.accidentsList.subscribe(message => {
      this.accidentsList = message
      this.updateLumCount(this.accidentsList);

    })


  }

  updateGravParAtm(accidents: Accident[]) {


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
      {data: this.lumCount, label: 'Series D'}
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
  public lineChartLabels:Array<any> = ['Plein jour', 'Crépuscule/Aube', 'Nuit'];
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

  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }

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
  public radarChartLabels:string[] = ['Normale', 'Pluie', 'Neige', 'Brouillard', 'Vent', 'Temps éblouissant', 'Temps couvert'];

  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Blessé leger'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Hospitalisé'},
    {data: [28, 8, 4, 9, 96, 27, 100], label: 'Mort'}
  ];
  public radarChartType:string = 'radar';

}
