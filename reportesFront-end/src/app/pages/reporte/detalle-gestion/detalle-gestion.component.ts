import { Component, OnInit, Input} from '@angular/core';
import { Reportes } from '../../../_model/reportes';
import { ReporteService } from '../../../_services/reporte.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gestion } from '../../../_model/gestion';
import { MatTableDataSource } from '@angular/material/table';
import { CityI } from '../../../_model/cityI';
import * as moment from 'moment';


@Component({
  selector: 'app-detalle-gestion',
  templateUrl: './detalle-gestion.component.html',
  styleUrls: ['./detalle-gestion.component.css']
})
export class DetalleGestionComponent implements OnInit {

  mensaje !: string;
  gestion !: Gestion[];
  cities !: CityI;
  displayedColumns: string[] = ['id_gestion', 'id_campana', 'id_agente', 'fecha_gestion'];
  dataSource!: MatTableDataSource<Gestion>;
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = this.gestion;
  
  id!: number;
  @Input() 
  fechahija1 : string="Sin nombre";
 
  fechanueva !:  string;
 
 
  campana !:  string;
  get bar(): string {
    return this.campana;
   }
  set bar(value: string) {
    this.campana = value;
    }

  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  

  constructor( private reporteService : ReporteService, 
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {

    this.reporteService.enviarmensajeObservable.subscribe(data => {
      this.mensaje =data;
      this.fechaparametro1 = moment(this.mensaje).format('YYYY-MM-DD 00:00:01');
      this.fechaparametro2='2021-11-01 00:00:00';
      console.log("parametros3"+ this.fechaparametro2);
      const cities= {fecha:this.fechaparametro1, fechafin:this.fechaparametro2}
     // console.log("Hola mundo1: " + cities.fecha)
     //cities son los paramatros que enviamos y node.js los toma en el header
     this.reporteService.listarGestionxfecha(cities).subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
     });
    });

    this.reporteService.disparadorreportes.
    subscribe((data: any) => {
      console.log("prueba: "+data.fecha);
      this.campana='2838'
    });
    
    console.log("this: " +this.campana)
    /*{
      this.fechanueva = data.fecha
      this.campana = data.fechafin
      console.log("parametros1"+ this.fechanueva);
      console.log("parametros2"+ this.campana);
    })   */
    
   





    /*toma el parametro de la ruta url
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
    });

    this.reporteService.listarId(this.id).subscribe(data => {
      console.log(data);
    })*/

   
    
  }

 
}
