import { KanbanTaskModel } from "../models/kanban-task-model";

export interface KanbanSectionModel {
   kanbanSectionName: string,
   tasks: Array<KanbanTaskModel>,
}
