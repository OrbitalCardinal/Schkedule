import { KanbanSectionModel } from "../models/kanban-section-model";

export interface KanbanModel {
  kanbanName: string,
  sections: Array<KanbanSectionModel>
}
