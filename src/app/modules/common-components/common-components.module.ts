import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumpadComponent } from './numpad/numpad.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NavComponent } from './nav/nav.component';
import { NavTitleComponent } from './nav-title/nav-title.component';

@NgModule({
  declarations: [NumpadComponent, MultiSelectComponent, NavComponent, NavTitleComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule
  ],
  exports: [NumpadComponent, MultiSelectComponent, NavComponent,NavTitleComponent],
})
export class CommonComponentsModule {}
