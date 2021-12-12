import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { GraficoComponent } from './pages/grafico/grafico.component';
import { VisualizarComponent } from './pages/reporte/visualizar/visualizar.component';
import { TmpEntranteComponent } from './pages/reporte/tmp-entrante/tmp-entrante.component';
import { LlamadasFueraComponent } from './pages/reporte/llamadas-fuera/llamadas-fuera.component';
import { DetalleGestionComponent } from './pages/reporte/detalle-gestion/detalle-gestion.component';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo/monitoreo.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'reporte', component: ReporteComponent, children: [
    { path: 'ConsolidadodeCicloVida/:id', component: VisualizarComponent },
    { path: 'FamisanarConsolidado/:id', component: TmpEntranteComponent },
    { path: 'LlamadasFueraHorario/:id', component: LlamadasFueraComponent },
    { path: 'ConsolidadoGestiones/:id', component: DetalleGestionComponent }
  ]},
  { path: 'grafico', component: GraficoComponent },
  { path: 'monitoreo', component: MonitoreoComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
