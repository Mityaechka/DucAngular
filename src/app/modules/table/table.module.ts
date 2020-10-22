import { PipesModule } from './../pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {
  MatSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterComponent } from './filter/filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatBadgeModule} from '@angular/material/badge';
import { SortComponent } from './sort/sort.component';
@NgModule({
  declarations: [TableComponent, FilterComponent, SortComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
    MatInputModule,
    PipesModule,
    MatBadgeModule
  ],
  exports: [TableComponent, FilterComponent, SortComponent],
})
export class TableModule {}
