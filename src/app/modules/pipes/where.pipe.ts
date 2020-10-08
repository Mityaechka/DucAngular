import { Pipe, PipeTransform } from '@angular/core';
import { resolvePath } from 'src/app/other/resolve-fn';

@Pipe({
  name: 'where',
})
export class WherePipe implements PipeTransform {
  transform(
    array: any[],
    ...args: {
      path: string;
      value: any;
      condition: 'less' | 'more' | 'equal' | 'less or equal' | 'more or equal';
    }[]
  ): any[] {
    return array.filter((x) => {
      return args.every((u) => {
        const value = resolvePath(u.path, x);
        switch (u.condition) {
          case 'less':
            return value < u.value;
          case 'more':
            return value > u.value;
          case 'equal':
            return value === u.value;
          case 'less or equal':
            return value <= u.value;
          case 'more or equal':
            return value > u.value;
        }
      });
    });
  }
}
