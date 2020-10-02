import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthModule } from './modules/auth/auth.module';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from './components/alert/alert.component';
import { IntroComponent } from './components/intro/intro.component';
import { TillModule } from './modules/till/till.module';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from './modules/table/table.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonComponentsModule } from './modules/common-components/common-components.module';
import { PipesModule } from './modules/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmComponent } from './components/confirm/confirm.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReceiptEditorModule } from './modules/receipt-editor/receipt-editor.module';
import { MatTreeModule } from '@angular/material/tree';
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    AlertComponent,
    IntroComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    AuthModule,
    TillModule,
    MatTableModule,
    TableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    CommonComponentsModule,
    PipesModule,
    FlexLayoutModule,
    MatStepperModule,
    MaterialFileInputModule,
    NgxMatSelectSearchModule,
    MatTooltipModule,
    ReceiptEditorModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [LoadingComponent, AlertComponent, ConfirmComponent],
})
export class AppModule {}
