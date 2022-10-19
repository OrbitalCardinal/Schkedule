import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { BadgeComponent } from "./badge/badge.component";
import { KanbanPageComponent } from "./kanban-page.component";
import { TaskCardComponent } from "./task-card/task-card.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [KanbanPageComponent, BadgeComponent, TaskCardComponent],
    imports: [CommonModule, SharedModule, DragDropModule]
})

export class KanbanPageModule {}