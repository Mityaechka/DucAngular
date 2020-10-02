import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yes-no.pipe';
import { VisiblePipe } from './visible.pipe';
import { AbsentPipe } from './absent.pipe';
import { ListToStringPipe } from './list-to-string.pipe';
import { EnumArrayPipe } from './enum-array.pipe';



@NgModule({
  declarations: [YesNoPipe, VisiblePipe, AbsentPipe, ListToStringPipe, EnumArrayPipe],
  imports: [
    CommonModule
  ],
  exports:[YesNoPipe,AbsentPipe, ListToStringPipe,EnumArrayPipe]
})
export class PipesModule { }
