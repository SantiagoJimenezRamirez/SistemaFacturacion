import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberFormatterService {

  constructor() { }

  formatNumber(value: number): string {
    return value.toLocaleString();
  }
}
