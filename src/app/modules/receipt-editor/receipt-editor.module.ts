import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTextAreaComponent } from './components/simple-text-area/simple-text-area.component';
import { ExampleEditorComponent } from './components/example-editor/example-editor.component';

@NgModule({
  declarations: [SimpleTextAreaComponent,ExampleEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  exports: [ExampleEditorComponent],
})
export class ReceiptEditorModule {}
