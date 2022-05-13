import { EventEmitter, Injectable } from '@angular/core';
import { KanbanTaskModel } from "../models/kanban-task-model";

@Injectable({
  providedIn: 'root'
})
export class SwitchKanbanModalService {

  constructor() { }

  $switchModal = new EventEmitter<any>();
  $KanbanTaskModel = new EventEmitter<KanbanTaskModel>();

}
