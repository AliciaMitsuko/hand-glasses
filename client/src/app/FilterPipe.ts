import { Pipe, PipeTransform } from '@angular/core';
import Accident from "./models/accident.model";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term): any {
    // console.log('filter', term);

    return term
      // ? items.filter(item => item.title.indexOf(term) !== -1)
      ? items.filter(item => item.num.indexOf(term) !== -1)
      : items;
  }
}

@Pipe({
  name: 'vote',
  pure: false
})
export class VotePipe implements PipeTransform {
  transform(items: Accident[]) {

    // return items.filter(item => {
    //   console.log(item.good);
    //   item.good > term
    // })
    return items.filter(item => (item.good - item.bad) < 0);
    // return term
    //   // ? items.filter(item => item.title.indexOf(term) !== -1)
    //   ? items.filter(item => {
    //     console.log(item.good);
    //     item.good > term
    //   })
    //   : items;
  }
}

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(items: any[], sortedBy: string): any {
    console.log('sortedBy', sortedBy);

    return items.sort((a, b) => {return b[sortedBy] - a[sortedBy]});
  }
}
