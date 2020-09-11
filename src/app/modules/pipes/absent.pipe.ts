import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absent'
})
export class AbsentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value : 'Отсуствует';
  }

}
