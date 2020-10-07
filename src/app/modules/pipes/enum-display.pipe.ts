import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumDisplay'
})
export class EnumDisplayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
