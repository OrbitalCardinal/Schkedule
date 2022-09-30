import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { KanbanPageComponent } from "./kanban-page.component";

@NgModule({
    declarations: [KanbanPageComponent],
    imports: [CommonModule, SharedModule]
})

export class KanbanPageModule {}