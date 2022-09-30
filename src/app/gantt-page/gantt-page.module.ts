import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { GanttPageComponent } from "./gantt-page.component";

@NgModule({
    declarations: [GanttPageComponent],
    imports: [CommonModule, SharedModule]
})

export class GanttPageModule {}