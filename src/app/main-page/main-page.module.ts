import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ConfigPageModule } from "../config-page/config-page.module";
import { GanttPageModule } from "../gantt-page/gantt-page.module";
import { HomePageModule } from "../home-page/home-page.module";
import { KanbanPageModule } from "../kanban-page/kanban-page.module";
import { SchedulePageModule } from "../schedule-page/schedule-page.module";
import { TablePageModule } from "../table-page/table-page.module";
import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";

@NgModule({
    declarations: [MainPageComponent],
    imports: [
        CommonModule, 
        MainPageRoutingModule, 
        TablePageModule, 
        KanbanPageModule,
        GanttPageModule,
        HomePageModule,
        SchedulePageModule,
        ConfigPageModule
    ]
})

export class MainPageModule {}