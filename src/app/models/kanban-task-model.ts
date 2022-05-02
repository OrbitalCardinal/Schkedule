export interface KanbanTaskModel {
  id_actividad_kanban: string,
  id_tarjeta: string,
  kanbanTaskDescription: string,
  priority: string,
  Tags: Array<string>,
  date: string,
}
