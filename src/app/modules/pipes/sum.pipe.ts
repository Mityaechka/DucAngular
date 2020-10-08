import { Pipe, PipeTransform } from '@angular/core';
import { resolvePath } from 'src/app/other/resolve-fn';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(value: any[], path: string, initial?: any): unknown {
    let result;
    if (!value || value.length === 0) {
      return initial;
    }
    value.reduce((prev, curr) => (result += resolvePath(path, curr)));
    return result;
  }
}
