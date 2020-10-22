import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsActivePipe, YesNoPipe } from './yes-no.pipe';
import { VisiblePipe } from './visible.pipe';
import { AbsentPipe } from './absent.pipe';
import { ListToStringPipe } from './list-to-string.pipe';
import { EnumArrayPipe } from './enum-array.pipe';
import { EnumDisplayPipe } from './enum-display.pipe';
import { SumPipe } from './sum.pipe';
import { WherePipe } from './where.pipe';
import { CompareWithPipe } from './compare-with.pipe';

@NgModule({
  declarations: [
    YesNoPipe,
    VisiblePipe,
    AbsentPipe,
    ListToStringPipe,
    EnumArrayPipe,
    EnumDisplayPipe,
    SumPipe,
    WherePipe,
    IsActivePipe,
    CompareWithPipe
  ],
  imports: [CommonModule],
  exports: [
    YesNoPipe,
    AbsentPipe,
    ListToStringPipe,
    EnumArrayPipe,
    SumPipe,
    WherePipe,
    IsActivePipe,
    CompareWithPipe,
  ],
})
export class PipesModule {}
