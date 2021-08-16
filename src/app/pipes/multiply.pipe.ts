import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiply'
})
export class MultiplyPipe implements PipeTransform {

  transform(value: number | null, arg: number): number {
    if (value) {
      return value * arg;
    }
    return arg;
  }

}
