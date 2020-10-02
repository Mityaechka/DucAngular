import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listToString',
})
export class ListToStringPipe implements PipeTransform {
  transform(value: any[], path: string): string {
    if (!value || !Array.isArray(value)) {
      return '';
    }
    let result = '';
    value.forEach((x) => (result += `\n${this.resolve(path, x)}`));
    return result;
  }

  private resolve(path, obj) {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, obj || self);
  }
}
