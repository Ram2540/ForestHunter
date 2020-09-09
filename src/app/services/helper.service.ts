import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getConvertedNumberToKs(num: number): string {

    let res = Math.floor(num).toLocaleString().split(',').join('');
    if (num > 1000) {
      let rest = res.length % 3;
      if (rest === 0) {
        rest = 3;
      }
      let lastSymboles = res.substring(rest, 3);
      if (lastSymboles.length > 0) {
        lastSymboles = '.' + lastSymboles;
      }
      const numberOfKs = (res.length - rest) / 3;
      res = res.substring(0, rest ) + lastSymboles + 'K' + numberOfKs;
    }
    return res;
  }
}
