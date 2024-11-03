import { Pipe, PipeTransform } from '@angular/core';
import { EnumStatePos } from '../enums/state-pos.enum';

@Pipe({
  name: 'statePipe'
})
export class StatePipePipe implements PipeTransform {

  transform(value: boolean): EnumStatePos {
    if(value){
      return EnumStatePos.Active
    }
    return EnumStatePos.Deactivated
  }

}
