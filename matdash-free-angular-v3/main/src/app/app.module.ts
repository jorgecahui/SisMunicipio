import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; // Si usas select también
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule para los diálogos

import { AppComponent } from './app.component';
import { AppTablesComponent } from './pages/ui-components/tables/tables.component'; // Importa tu componente

@NgModule({
  declarations: [
    AppComponent, 
    AppTablesComponent // Declara tu componente aquí
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule para formularios reactivos
    MatButtonModule,     // Para los botones Material
    MatFormFieldModule,  // Para los campos de formulario Material
    MatInputModule,      // Para inputs Material
    MatCardModule,       // Para tarjetas Material
    MatTableModule,      // Para tablas Material
    MatIconModule,       // Para íconos Material
    MatSelectModule,     // Para select Material (si usas select)
    MatDialogModule,     // Para usar los diálogos de Material
  ],
  providers: [],
  bootstrap: [AppComponent], // Define el componente raíz
})
export class AppModule {}
