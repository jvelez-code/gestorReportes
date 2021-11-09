import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { GraficoComponent } from './pages/grafico/grafico.component';
import { VisualizarComponent } from './pages/reporte/visualizar/visualizar.component';
import { PruebaComponent} from './pages/reporte/prueba/prueba.component';

const routes: Routes = [
  { path: 'reporte', component: ReporteComponent, children: [
    { path: 'ConsolidadodeCicloVida/:id', component: VisualizarComponent },
    { path: 'FamisanarConsolidado/:id', component: PruebaComponent }
  ]},
  { path: 'grafico', component: GraficoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
