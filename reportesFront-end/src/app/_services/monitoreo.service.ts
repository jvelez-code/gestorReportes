import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AskEstadoExtension } from '../_model/askEstadoExtension'

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {

  private url:string = `${environment.HOST}`;


  constructor( private http: HttpClient ) { }

  listarMonitoreo(){
    return this.http.get<AskEstadoExtension[]>(`${this.url}/moni/monitoreo`);
  }
}
