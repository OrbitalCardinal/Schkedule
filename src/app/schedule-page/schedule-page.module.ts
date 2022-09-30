import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SchedulePageComponent } from "./schedule-page.component";

@NgModule({
    declarations: [SchedulePageComponent],
    imports: [CommonModule, SharedModule]
})

export class SchedulePageModule {}