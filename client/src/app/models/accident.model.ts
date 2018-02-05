import {gravEnum} from '../../environments/environment';
import Contexte, {default as Situation} from './situation.model';

import * as GeoJSON from 'geojson';

class Accident {
    _id: string;
    // coords: GeoJSON.; // coordinates:'lat lon' type: 'point' (si lat, lon vide, complete par adr et gps)
    date: Date; // jour, mois, an, heure
    contexte: Contexte; // atm, lum, surf
    grav: gravEnum;
    dep: number;
    comm: number;

    //commentaires

    constructor(
    ){
      this.date = new Date();
      this.contexte = new Situation();
      this.grav = gravEnum.INDEMNE;
      // this.coords = new
      this.dep = 1;
      this.comm = 4;
    }
}

export default Accident;
