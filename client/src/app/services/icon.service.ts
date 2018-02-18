import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Accident from "../models/accident.model";

@Injectable()
export class IconService {


  gravToIcon(num: number) {
    let myNum = "" + num
    switch (parseInt(myNum)) {
      case 1: {
        return '../../assets/icons/004-heart.svg';
      }
      case 2: {
        return '../../assets/icons/001-medical-2.svg';
      }
      case 3 :
      case 4 : {
        return '../../assets/icons/006-injured.svg';
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
        return '../../assets/icons/004-sun.svg';
      }
      case 2: {
        return '../../assets/icons/day.svg'; // dawn / twilight
      }
      case 3:
      case 4:
      case 5 : {
        return '../../assets/icons/evening.svg';
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
        return 'Autre';
      }
    }
  }

  atmToIcon(num: number) {
    let myNum = "" + num
    switch (parseInt(myNum)) {
      // case 1: {
      //   return '../../assets/icons/004-sun.svg';
      // }
      case 2:
      case 3: {
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
        return '../../assets/icons/sun.svg';
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
    let myNum = "" + num
    switch (parseInt(myNum)) {
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
      case 4: {
        return '../../../assets/icons/flood.svg';
      }
      case 5: {
        return '../../../assets/icons/nature.svg';
      }
      default: {
        return '../../../assets/icons/nothing.svg'

      }
    }
  }

  surfToString(num: number) {
    let myNum = "" + num
    switch (parseInt(myNum)) {
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
