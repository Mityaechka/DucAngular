import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yes-no.pipe';
import { VisiblePipe } from './visible.pipe';
import { AbsentPipe } from './absent.pipe';
import { ListToStringPipe } from './list-to-string.pipe';
import { EnumArrayPipe } from './enum-array.pipe';
import { EnumDisplayPipe } from './enum-display.pipe';



@NgModule({
  declarations: [YesNoPipe, VisiblePipe, AbsentPipe, ListToStringPipe, EnumArrayPipe, EnumDisplayPipe],
  imports: [
    CommonModule
  ],
  exports:[YesNoPipe,AbsentPipe, ListToStringPipe,EnumArrayPipe]
})
export class PipesModule { }
