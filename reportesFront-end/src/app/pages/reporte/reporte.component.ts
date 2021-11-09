import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Reportes } from '../../_model/reportes';
import { CityI } from '../../_model/cityI';
import { ReporteService } from '../../_services/reporte.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  mensaje !: string;
  nombrepadre :string ="Sin nombre";

  reportes !:Reportes[];
  cities !: CityI;


  form !: FormGroup;
  tituloPagina = 'Parte de Horas';
  fechaActual:Date=new Date();
  mesActual:number=this.fechaActual.getMonth();
  anoActual:number=this.fechaActual.getFullYear();
  fechaActuals!:string;

  selectedValue!: any;
  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date() ;
  campana !: string

  


  constructor( private reporteService : ReporteService,
               public route: ActivatedRoute) { }

  ngOnInit(): void {

    
     this.reporteService.listar().subscribe(data => {
      console.log(data)
      this.reportes = data;
    });

   
  }

  cambioTexto(mensaje: any){
    this.reporteService.enviarmensaje(mensaje);
    console.log("llega mensaje"+mensaje)

  }

  cambieFecha(e: any) {
    console.log(e);
    this.reporteService.enviarmensaje(e);
  } 


  aceptar(){
    /*console.log(this.fechaSeleccionada.toISOString()); //UTC/*console.log(this.fechaSeleccionada.toISOString()); //UTC
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(this.fechaSeleccionada.getTime() - tzoffset)).toISOString();    
    console.log(localISOTime);*/

    this.nombrepadre="Jaime Velez";
    console.log(this.nombrepadre);
    this.campana="2832";
    const cities= {fecha:this.fechaSeleccionada,fechafin:this.campana}
    console.log(cities);
    //this.reporteService.disparadorreportes.emit(this.fechaSeleccionada);
    this.reporteService.disparadorreportes.emit(cities);
  }


  /*cambiarnombre(){
    this.nombrepadre="Jaime Velez";
  }*/






   
}
