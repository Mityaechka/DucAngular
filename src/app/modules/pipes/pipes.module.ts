import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yes-no.pipe';
import { VisiblePipe } from './visible.pipe';
import { AbsentPipe } from './absent.pipe';



@NgModule({
  declarations: [YesNoPipe, VisiblePipe, AbsentPipe],
  imports: [
    CommonModule
  ],
  exports:[YesNoPipe,AbsentPipe]
})
export class PipesModule { }
