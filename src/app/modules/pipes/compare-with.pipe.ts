import { resolvePath } from 'src/app/other/resolve-fn';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compareWith',
})
export class CompareWithPipe implements PipeTransform {
  transform(value: any, path: string): unknown {
    return (obj1: any, obj2: any) => {
      const data1 = resolvePath(path, obj1);
      const data2 = resolvePath(path, obj2);
      return data1 && data2 && data1 == data2;
    };
  }
}
