import { Component, OnInit } from '@angular/core';
import { SwitchKanbanModalService } from 'src/app/services/switch-kanban-modal.service';
import { KanbanTaskModel } from "../../models/kanban-task-model";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanban-modal',
  templateUrl: './kanban-modal.component.html',
  styleUrls: ['./kanban-modal.component.scss']
})
export class KanbanModalComponent implements OnInit {

  public KanbanTaskForm: FormGroup;

  constructor(private modalSwitchS: SwitchKanbanModalService) {
    this.KanbanTaskForm = this.createFormGroup();
  }

  ngOnInit(): void {
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

  public addKanbanTask() {

    const MonthDescriptions = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const localDate = new Date();
    const stringDate = `${MonthDescriptions[localDate.getMonth()]} ${localDate.getDate()}, ${localDate.getFullYear()}`;
    const arrTags = this.KanbanTaskForm.value['Tags'].split(',')

    const KanbanTaskModel: KanbanTaskModel = {
      id_actividad_kanban: "1",
      id_tarjeta: "2",
      kanbanTaskDescription: this.KanbanTaskForm.value['kanbanTaskDescription'],
      Tags: arrTags,
      priority: this.KanbanTaskForm.value['priority'],
      date: stringDate
    }

    this.modalSwitchS.$KanbanTaskModel.emit(KanbanTaskModel)
    this.modalSwitchS.$switchModal.emit(false);
  }

}
