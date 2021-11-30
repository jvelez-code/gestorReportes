import { Component, OnInit, Input} from '@angular/core';
import { Reportes } from '../../../_model/reportes';
import { ReporteService } from '../../../_services/reporte.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gestion } from '../../../_model/gestion';
import { MatTableDataSource } from '@angular/material/table';
import { CityI } from '../../../_model/cityI';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-detalle-gestion',
  templateUrl: './detalle-gestion.component.html',
  styleUrls: ['./detalle-gestion.component.css']
})
export class DetalleGestionComponent implements OnInit {


  fechaSeleccionada : Date = new Date;
  fechaSeleccionadas : Date = new Date;

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  mensaje !: string;
  gestion !: Gestion[];
  cities !: CityI;
  displayedColumns: string[] = ['id_gestion', 'id_campana', 'id_agente', 'fecha_gestion'];
  dataSource!: MatTableDataSource<Gestion>;

  fechaInicio !: any;
  fechaFin !: any;
  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  

  constructor( private reporteService : ReporteService, 
               private route: ActivatedRoute,
               private router: Router) 
               { 
                const today = new Date();
                const month = today.getMonth();
                const year = today.getFullYear();
            
                this.campaignOne = new FormGroup({
                  start: new FormControl(new Date(year, month, 13)),
                  end: new FormControl(new Date(year, month, 16)),

                });

                  this.campaignTwo = new FormGroup({
                    start: new FormControl(new Date(year, month, 15)),
                    end: new FormControl(new Date(year, month, 19)),
                  });
               }
               
             
  ngOnInit(): void {
     
    }

    events: string[] = [];

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.events.push(`${type}: ${event.value}`);
      this.fechaInicio=event.value
    }

    aceptar(){
    
        this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
        this.fechaparametro2='2021-11-01 00:00:00';
        console.log("parametros3"+ this.fechaparametro1);
        const cities= {fecha:this.fechaparametro1, fechafin:this.fechaparametro2}
       // console.log("Hola mundo1: " + cities.fecha)
       //cities son los paramatros que enviamos y node.js los toma en el header

       console.log(cities);
       this.reporteService.listarGestionxfecha(cities).subscribe(data=>{
         console.log(data);
        this.dataSource = new MatTableDataSource(data);
  
      }); 

    }

  
   





    
  }

 


