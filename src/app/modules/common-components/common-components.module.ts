import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumpadComponent } from './numpad/numpad.component';



@NgModule({
  declarations: [NumpadComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [NumpadComponent]
})
export class CommonComponentsModule { }
