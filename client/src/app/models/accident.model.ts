
import Contexte, {default as Situation} from './situation.model';

import {
    BBox,
    Feature, FeatureCollection, GeometryCollection, LineString,
    MultiLineString, MultiPoint, MultiPolygon, Point, Polygon, GeometryObject
} from 'geojson';

class Accident {
    _id: string;
    // coords: {longitude: number, latitude: number};
    coords: {
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], default: [0, 0]}
    };  // coordinates:'lat lon' type: 'point' (si lat, lon vide, complete par adr et gps)

    date: Date; // jour, mois, an, heure
    contexte: Contexte; // atm, lum, surf
    gravite: number;
    dep: number;
    com: number;
    num: number;
    good: number;
    bad: number;

    constructor() {
      this.date = new Date();
      this.contexte = new Situation();
      this.gravite = 1;
      /*this.coords.latitude = 0;
      this.coords.longitude = 0;*/
      this.dep = 1;
      this.com = 4;
    }
}

export default Accident;
