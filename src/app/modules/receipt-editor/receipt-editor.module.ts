import { PipesModule } from './../pipes/pipes.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTextAreaComponent } from './components/simple-text-area/simple-text-area.component';
import { ExampleEditorComponent } from './components/example-editor/example-editor.component';
import { DoubleTextAreaComponent } from './components/double-text-area/double-text-area.component';
import { ComplexTextAreaComponent } from './components/complex-text-area/complex-text-area.component';
import { IndentAreaComponent } from './components/indent-area/indent-area.component';
import { LineAreaComponent } from './components/line-area/line-area.component';
import { TableAreaComponent } from './components/table-area/table-area.component';
import { ReceiptPreviewComponent } from './components/receipt-preview/receipt-preview.component';
import { ReceiptEditorComponent } from './components/receipt-editor/receipt-editor.component';

@NgModule({
  declarations: [
    SimpleTextAreaComponent,
    ExampleEditorComponent,
    DoubleTextAreaComponent,
    ComplexTextAreaComponent,
    IndentAreaComponent,
    LineAreaComponent,
    TableAreaComponent,
    ReceiptPreviewComponent,
    ReceiptEditorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatExpansionModule,
    PipesModule
  ],
  exports: [ReceiptEditorComponent,ReceiptPreviewComponent],
})
export class ReceiptEditorModule {}
