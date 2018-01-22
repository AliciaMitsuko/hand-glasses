import Localization from "./localization.model";
import {statutAccidentEnum} from '../../environments/environment';

class Accident {
    _id:string;
    location: Localization;
    statut: statutAccidentEnum;
    nbAccident: number;
    date: Date;

    constructor(
    ){
        this.location = new Localization();
        this.nbAccident = 0,
        this.statut = statutAccidentEnum.MEDIUM,
        this.date = new Date()
    }
}

export default Accident;
