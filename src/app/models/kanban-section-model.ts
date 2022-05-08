import { KanbanTaskModel } from "../models/kanban-task-model";

export interface KanbanSectionModel {
  id_tarjeta: string,
  id_tablero: string,
  kanbanSectionName: string,
  tasks: Array<KanbanTaskModel>,
  // Edit Controls
  editSectionKanban:boolean
}
