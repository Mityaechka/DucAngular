import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visible'
})
export class VisiblePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
