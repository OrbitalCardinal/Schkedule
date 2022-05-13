import { EventEmitter,Injectable } from '@angular/core';
import { ActividadHorarioModel } from "../models/actividad-horario-model";

@Injectable({
  providedIn: 'root'
})
export class SwitchHorarioModalService {

  constructor() { }

  $switchModal = new EventEmitter<any>();
  $ActividadHorarioModel = new EventEmitter<ActividadHorarioModel>();


}
