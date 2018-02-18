import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Accident from "../models/accident.model";

@Injectable()
export class DataService {

  private accidentsListSource = new BehaviorSubject<Accident[]>([]);
  accidentsList = this.accidentsListSource.asObservable();


  constructor() { }

  changeAccidentList(message: Accident[]) {
    this.accidentsListSource.next(message)
  }


}
