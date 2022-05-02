import { Component, Input, OnInit } from '@angular/core';
import { KanbanTaskModel } from "../../models/kanban-task-model";

@Component({
  selector: 'app-kanban-task-card',
  templateUrl: './kanban-task-card.component.html',
  styleUrls: ['./kanban-task-card.component.scss']
})
export class KanbanTaskCardComponent implements OnInit {

  @Input() kanbanTask: KanbanTaskModel = {
    id_actividad_kanban: "",
    id_tarjeta: "",
    kanbanTaskDescription: "",
    priority: "",
    Tags: [],
    date: "",
  };

  constructor() { }

  ngOnInit(): void {
  }

}
