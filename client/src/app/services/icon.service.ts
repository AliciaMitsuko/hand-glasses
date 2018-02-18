import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Accident from "../models/accident.model";

@Injectable()
export class IconService {


  gravToIcon(num: number) {
    let myNum = "" + num
    switch (parseInt(myNum)) {
      case 1: {
        return '../../assets/icons/005-care.svg';
      }
      case 2: {
        return '../../assets/icons/001-medical-2.svg';
      }
      case 3  || 4 : {
        return '../../assets/icons/003-medical.svg';
      }
      default: {
        return '../../assets/icons/nothing.svg';

      }
    }
  }

  gravToString(num: number) {
    let myNum = "" + num
    switch (parseInt(myNum)) {
      case 1: {
        return 'Indemne';
      }
      case 2: {
        return 'Tué';
      }
      case 3 : {
        return 'Blessé Leger';
      }
      case 4 : {
        return 'Hospitalisé';
      }
      default: {
        // return 'indéfini';
        return 'Indemne';
      }
    }
  }

  lumToIcon(num: number) {
    let myNum = "" + num
    switch (parseInt(myNum)) {
      case 1: {
        return '../../assets/icons/day.svg';
      }
      case 2: {
        return '../../assets/icons/evening.svg';
      }
      case 3  || 4 || 5 : {
        return '../../assets/icons/moon2.svg';
      }
      default: {
        // return 'indéfini';
        return '../../assets/icons/nothing.svg';
      }
    }
  }

  lumToString(num: number) {
    let myNum = "" + num
    switch (parseInt(myNum)) {
      case 1: {
        return 'Plein Jour';
      }
      case 2: {
        return 'Crépuscule ou Aube';
      }
      case 3 : {
        return 'Nuit sans éclairage public';
      }
      case 4 : {
        return 'Nuit avec éclairage public non allumé';
      }
      case 5 : {
        return 'Nuit avec éclairage public allumé';
      }
      default: {
        // return 'indéfini';
        return '../../assets/icons/nothing.svg';
      }
    }
  }

  atmToIcon(num: number) {
    switch (num) {
      case 1: {
        return '../../assets/icons/004-sun.svg';
      }
      case 2 || 3: {
        return '../../assets/icons/005-rain.svg';
      }
      case 4: {
        return '../../assets/icons/003-snowflake.svg';
      }
      case 5: {
        return '../../assets/icons/002-clouds.svg';
      }
      case 6: {
        return '../../assets/icons/001-wind.svg';
      }
      case 7: {
        return '../../assets/icons/004-sun.svg';
      }
      case 8: {
        return '../../assets/icons/002-clouds.svg';
      }
      default: {
        return '../../assets/icons/nothing.svg';

      }
    }
  }

  atmToString(num: number) {
    switch (num) {
      case 1: {
        return 'Normale';
      }
      case 2: {
        return 'Pluie Legère';
      }
      case 3: {
        return 'Pluie Forte';
      }
      case 4: {
        return 'Neige';
      }
      case 5: {
        return 'Brouillard - fumée';
      }
      case 6: {
        return 'Vent fort - tempête';
      }
      case 7: {
        return 'Temps éblouissant';
      }
      case 8: {
        return 'Temps couvert';
      }
      default: {
        return 'Autre';

      }
    }
  }

  surfToIcon(num: number) {
    switch(num) {
      default: {
        return '../../../assets/icons/nothing.svg'

      }
    }
  }

  surfToString(num: number) {
    switch (num) {
      case 1: {
        return 'Normale';
      }
      case 2: {
        return 'Mouillée';
      }
      case 3: {
        return 'Flaques';
      }
      case 4: {
        return 'Inondée';
      }
      case 5: {
        return 'Enneigée';
      }
      case 6: {
        return 'Boue';
      }
      case 7: {
        return 'Verglacée';
      }
      case 8: {
        return 'Corps gras - huile';
      }
      default: {
        return 'Autre';

      }
    }
  }

}
