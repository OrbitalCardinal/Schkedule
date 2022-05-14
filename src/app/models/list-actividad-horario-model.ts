import { ActividadHorarioModel } from '../models/actividad-horario-model'

export interface ListActividadHorarioModel {
  hora: string,
  listDays:ActividadHorarioModel[]
}
