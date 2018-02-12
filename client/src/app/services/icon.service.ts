import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Accident from "../models/accident.model";

@Injectable()
export class IconService {


  gravToIcon(num: number) {
    switch (num) {
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
        return /*'../../assets/icons/question.svg'*/;

      }
    }
  }

  lumToIcon(num: number) {
    switch (num) {
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
        return ' ';

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
        return /*'../../assets/icons/question.svg'*/;

      }
    }
  }

  surfToIcon(num: number) {
    switch(num) {
      default: {
        return '../../../assets/icons/question.svg'

      }
    }
  }

}
