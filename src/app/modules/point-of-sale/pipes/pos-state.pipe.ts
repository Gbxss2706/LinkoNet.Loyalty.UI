import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posState'
})
export class PosStatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
