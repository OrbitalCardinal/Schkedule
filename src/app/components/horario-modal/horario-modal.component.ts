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
    bgColorClass: "",
    edit: false,
    delete: false
  }

  constructor(private modalSwitchS: SwitchHorarioModalService) {
    this.HorarioTaskForm = this.createFormGroup();
  }

  ngOnInit(): void {
    console.log(this.actividadHorario)
    if (this.actividadHorario.edit == true) {
      this.HorarioTaskForm.controls['horarioDescription'].setValue(this.actividadHorario.descripcion);
      this.editHorario = true;
    }
  }

  public createFormGroup() {
    return new FormGroup({
      horarioDescription: new FormControl('', [Validators.required]),
    });
  }

  get descripcion() { return this.HorarioTaskForm.get('horarioDescription'); }

  public showConfirmMessage(actividadHorarioModel: ActividadHorarioModel) {
    Swal.fire({
      title: '¿Estas seguro(a)?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalSwitchS.$ActividadHorarioModel.emit(actividadHorarioModel)
        this.modalSwitchS.$switchModal.emit(false);
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
      bgColorClass: this.actividadHorario.bgColorClass,
      edit: this.editHorario,
      delete: flagDelete
    }

    if (flagDelete) {
      this.showConfirmMessage(actividadHorarioModel)
    } else {
      this.modalSwitchS.$ActividadHorarioModel.emit(actividadHorarioModel)
      this.modalSwitchS.$switchModal.emit(false);
    }

  }

  public sendHorarioTask(flagDelete: boolean) {
    // console.log(this.HorarioTaskForm.value['horarioDescription'])
    this.sendData(flagDelete)
  }

  public closeKanbanModal() {
    this.modalSwitchS.$switchModal.emit(false);
  }

}
