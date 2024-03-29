import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? 'Да' : 'Нет';
  }

}

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? 'Включено' : 'Отключено';
  }

}

