import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module'
import { MatInputModule } from '@angular/material/input';

//componentes
import { GraficoComponent } from './pages/grafico/grafico.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { VisualizarComponent } from './pages/reporte/visualizar/visualizar.component';
import { DetalleGestionComponent } from './pages/reporte/detalle-gestion/detalle-gestion.component';
import { TmpEntranteComponent } from './pages/reporte/tmp-entrante/tmp-entrante.component';
import { LlamadasFueraComponent } from './pages/reporte/llamadas-fuera/llamadas-fuera.component';





@NgModule({
  declarations: [
    AppComponent,
    GraficoComponent,
    ReporteComponent,
    VisualizarComponent,
    DetalleGestionComponent,
    TmpEntranteComponent,
    LlamadasFueraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
