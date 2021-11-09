import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reportes } from '../_model/reportes';
import { Gestion } from '../_model/gestion';
import { environment } from './../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { CityI} from '../_model/cityI'

@Injectable({
  providedIn: 'root'
})



export class ReporteService {

  @Output()
  disparadorreportes = new EventEmitter<any>();
  

  
  private url:string = `${environment.HOST}`;

  constructor(private http: HttpClient) { }
 
    listar(){
      return this.http.get<Reportes[]>(`${this.url}/reportes`);
    }

    listarId(id: number){
      return this.http.get<Reportes>(`${this.url}/reportes/${id}`);

    }
  
    listarGestion(){
      return this.http.get<Gestion[]>(`${this.url}/gestion`);
    }

    listarGestionxfecha(cities: CityI):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(cities);
      console.log("Hola Body"+body)
      return this.http.post<CityI>(`${this.url}/gestion`,body,{'headers':headers});
      
    }
    mensaje!: string;
    private enviarmensajeSubject= new Subject<string>();
    enviarmensajeObservable=this.enviarmensajeSubject.asObservable();

    enviarmensaje(mensaje:any){
      this.mensaje=mensaje;
      this.enviarmensajeSubject.next(mensaje);

    }


}
