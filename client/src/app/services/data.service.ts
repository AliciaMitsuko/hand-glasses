import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Accident from '../models/accident.model';

@Injectable()
export class DataService {

  private accidentsListSource = new BehaviorSubject<Accident[]>([]);
  private accidentsListSourceMap = new BehaviorSubject<Accident[]>([]);
  accidentsList = this.accidentsListSource.asObservable();
  accidentsListMap = this.accidentsListSourceMap.asObservable();


  constructor() { }

  changeAccidentList(message: Accident[]) {
    this.accidentsListSource.next(message);
  }

  changeAccidentListMap(message: Accident[]) {
      this.accidentsListSourceMap.next(message);
  }


}
