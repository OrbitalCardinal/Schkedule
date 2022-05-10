import { Component, Input, OnInit } from '@angular/core';
import { SwitchKanbanModalService } from 'src/app/services/switch-kanban-modal.service';
import { KanbanTaskModel } from "../../models/kanban-task-model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kanban-modal',
  templateUrl: './kanban-modal.component.html',
  styleUrls: ['./kanban-modal.component.scss']
})
export class KanbanModalComponent implements OnInit {

  @Input() kanbanTask: KanbanTaskModel = {
    id_actividad_kanban: "",
    id_tarjeta: "",
    kanbanTaskDescription: "",
    priority: "",
    Tags: [],
    date: "",
    editTaskKanban: false,
    deleteTaskKanban: false
  };

  public editTask: boolean = false;
  public KanbanTaskForm: FormGroup;

  constructor(private modalSwitchS: SwitchKanbanModalService) {
    this.KanbanTaskForm = this.createFormGroup();
  }

  ngOnInit(): void {
    if (this.kanbanTask != undefined) {
      if (this.kanbanTask.editTaskKanban == true) {
        const stringTaks = this.kanbanTask.Tags.reduce((v1, v2) => v1 + ',' + v2)
        this.KanbanTaskForm.controls['kanbanTaskDescription'].setValue(this.kanbanTask.kanbanTaskDescription);
        this.KanbanTaskForm.controls['priority'].setValue(this.kanbanTask.priority);
        this.KanbanTaskForm.controls['Tags'].setValue(stringTaks);
        this.editTask = true;
      }
    }
  }

  createFormGroup() {
    return new FormGroup({
      kanbanTaskDescription: new FormControl('', [Validators.required]),
      Tags: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
    });
  }

  get kanbanTaskDescription() { return this.KanbanTaskForm.get('kanbanTaskDescription'); }
  get Tags() { return this.KanbanTaskForm.get('Tags'); }
  get priority() { return this.KanbanTaskForm.get('priority'); }


  public closeKanbanModal() {
    this.modalSwitchS.$switchModal.emit(false);
  }

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

    const MonthDescriptions = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const localDate = new Date();
    const stringDate = `${MonthDescriptions[localDate.getMonth()]} ${localDate.getDate()}, ${localDate.getFullYear()}`;
    const arrTags = this.KanbanTaskForm.value['Tags'].split(',')
    let lid_actividad_kanban = ""
    let lid_tarjeta = ""


    if (this.editTask) {
      lid_actividad_kanban = this.kanbanTask.id_actividad_kanban;
      lid_tarjeta = this.kanbanTask.id_tarjeta;
    }

    const KanbanTaskModel: KanbanTaskModel = {
      id_actividad_kanban: lid_actividad_kanban,
      id_tarjeta: lid_tarjeta,
      kanbanTaskDescription: this.KanbanTaskForm.value['kanbanTaskDescription'],
      Tags: arrTags,
      priority: this.KanbanTaskForm.value['priority'],
      date: stringDate,
      editTaskKanban: this.editTask,
      deleteTaskKanban: flagDelete
    }

    this.modalSwitchS.$KanbanTaskModel.emit(KanbanTaskModel)
    this.modalSwitchS.$switchModal.emit(false);

  }

  public sendInfoKanbanTask(flagDelete: boolean) {

    if (flagDelete) {
      this.showConfirmMessage()
    } else {
      this.sendData(flagDelete);
    }

  }

}
