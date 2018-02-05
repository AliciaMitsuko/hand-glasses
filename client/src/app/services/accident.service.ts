import Accident from '../models/accident.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class AccidentService {

  api_url = 'http://localhost:3000';
  accidentUrl = `${this.api_url}/api/accidents`;

  constructor(
    private http: HttpClient
  ) { }

  generateAccidents(id: number): Observable<Accident[]>{
    return this.http.get(this.accidentUrl+'/generate/'+id)
      .map(res  => {
        return res["data"].docs as Accident[];
      })
  }

  createAccident(accident: Accident): Observable<any>{
    return this.http.post(`${this.accidentUrl}`, accident);
  }

  getAccidents(): Observable<Accident[]>{
    return this.http.get(this.accidentUrl)
    .map(res  => {
      return res["data"].docs as Accident[];
    })
  }

  editAccident(accident:Accident){
    let editUrl = `${this.accidentUrl}`
    return this.http.put(editUrl, accident);
  }

  deleteAccident(id:string):any{
    let deleteUrl = `${this.accidentUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
