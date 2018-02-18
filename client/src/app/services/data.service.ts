import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Accident from '../models/accident.model';

@Injectable()
export class DataService {

  // accidentList loaded in admin-page
  private accidentsListSource = new BehaviorSubject<Accident[]>([]);
  private accidentsListSourceMap = new BehaviorSubject<Accident[]>([]);
  accidentsList = this.accidentsListSource.asObservable();
  accidentsListMap = this.accidentsListSourceMap.asObservable();

  // accident loaded in the modal
  private accidentToEditSource = new BehaviorSubject<Accident>(new Accident());
  accidentToEdit = this.accidentToEditSource.asObservable();


  constructor() { }

  // accidentList loaded in admin-page
  changeAccidentList(message: Accident[]) {
    this.accidentsListSource.next(message);
  }

  changeAccidentListMap(message: Accident[]) {
      this.accidentsListSourceMap.next(message);
  }


  // accident loaded in the modal
  changeAccidentToEdit(message: Accident) {
    this.accidentToEditSource.next(message)
  }

}
