import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppTablesComponent } from './pages/ui-components/tables/tables.component'; // Importa tu componente
import { MaterialModule } from './material.module';  // Importa el MaterialModule

@NgModule({
  declarations: [
    AppComponent, 
    AppTablesComponent 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,  // Aquí importas el módulo de Material
  ],
  providers: [],
  bootstrap: [AppComponent], 
})
export class AppModule {}
