
import {Injectable} from '@angular/core';
import Accident from "../models/accident.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MapService {

    private subject = new Subject <any>();
    private allAccidentsList;

    constructor(private http: HttpClient) {}

    sendMessage(message: Array<number>) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    getAccidentWithinPerimeter(lat: number, lng: number, distance: number): Observable<any> {
        return this.http.get('http://localhost:3000/api/dangers?lat=' + lat + '&long=' + lng + '&distance=' + distance)
            .map(res => {
                return res['data'];
            });
    }

    getAllAccidentGeoJson(gravite: number): Observable<any> {
        return this.http.get('http://localhost:3000/api/accidents/gravite/FeatureCollection?gravite=' + gravite)
            .map(res => {
                return res['data'];
        });
    }

}
