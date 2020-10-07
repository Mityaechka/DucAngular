import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgVarDirective } from './ng-var.directive';



@NgModule({
  declarations: [NgVarDirective],
  imports: [
    CommonModule
  ],
  exports:[NgVarDirective]
})
export class DirectivesModule { }
