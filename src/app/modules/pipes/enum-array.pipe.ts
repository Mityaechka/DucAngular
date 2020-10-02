import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumArray',
})
export class EnumArrayPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return Object.keys(value).filter((type) => !isNaN(type as any));
  }
}
