import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActividadHorarioModel } from "../../models/actividad-horario-model";
import { SwitchHorarioModalService } from 'src/app/services/switch-horario-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario-modal',
  templateUrl: './horario-modal.component.html',
  styleUrls: ['./horario-modal.component.scss']
})
export class HorarioModalComponent implements OnInit {

  public editHorario: boolean = false;
  public HorarioTaskForm: FormGroup;

  @Input() actividadHorario: ActividadHorarioModel = {
    id_actividad_horario: "",
    id_horario: "",
    descripcion: "",
    id_hora_frecuencia: -1,
    // Edit Controls
    edit: false,
    delete: false
  }

  constructor(private modalSwitchS: SwitchHorarioModalService) {
    this.HorarioTaskForm = this.createFormGroup();
  }

  ngOnInit(): void {
      if (this.actividadHorario.edit == true) {
        this.HorarioTaskForm.controls['descripcion'].setValue(this.actividadHorario.descripcion);
        this.editHorario = true;
      }
  }

  public createFormGroup() {
    return new FormGroup({
      horarioDescription: new FormControl('', [Validators.required]),
    });
  }

  get descripcion() { return this.HorarioTaskForm.get('horarioDescription'); }

  public showConfirmMessage() {
    Swal.fire({
      title: '¿Estas seguro(a)?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed){
        this.sendData(result.isConfirmed);
      }
    })
  }

  public sendData(flagDelete: boolean) {

    const actividadHorarioModel: ActividadHorarioModel = {
      id_actividad_horario: this.actividadHorario.id_actividad_horario,
      id_horario: this.actividadHorario.id_horario,
      descripcion: this.HorarioTaskForm.value['horarioDescription'],
      id_hora_frecuencia: this.actividadHorario.id_hora_frecuencia,
       // Edit Controls
       edit: this.editHorario,
       delete: flagDelete
    }

    this.modalSwitchS.$ActividadHorarioModel.emit(actividadHorarioModel)
  }

  public sendHorarioTask(flagDelete: boolean) {
    console.log(this.HorarioTaskForm.value['horarioDescription'])
    this.sendData(flagDelete)
    this.modalSwitchS.$switchModal.emit(false);
  }

  public closeKanbanModal() {
    this.modalSwitchS.$switchModal.emit(false);
  }

}
