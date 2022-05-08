import { KanbanSectionModel } from "../models/kanban-section-model";

export interface KanbanModel {
  id_tablero: string,
  id_usuario: string,
  kanbanName: string,
  modifiedAt: string,
  sections: Array<KanbanSectionModel>,
  // Edit Controls
  editTituloKanban: boolean
}
