import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicamentoModalComponent } from './modals/medicamento/medicamento-modal.component';
import { MatTableModule } from '@angular/material/table'
import { VentaModalComponent } from './modals/venta/venta-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    MedicamentosComponent,
    MedicamentoModalComponent,
    VentaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule
  ],
  exports: [
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
