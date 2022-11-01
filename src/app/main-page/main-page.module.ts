import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ConfigPageModule } from "../config-page/config-page.module";
import { GanttPageModule } from "../gantt-page/gantt-page.module";
import { HomePageModule } from "../home-page/home-page.module";
import { KanbanPageModule } from "../kanban-page/kanban-page.module";
import { LandingGanttPageComponent } from "../landing-gantt-page/landing-gantt-page.component";
import { LandingKanbanPageComponent } from "../landing-kanban-page/landing-kanban-page.component";
import { LandingSchedulePageComponent } from "../landing-schedule-page/landing-schedule-page.component";
import { LandingTablePageComponent } from "../landing-table-page/landing-table-page.component";
import { SchedulePageModule } from "../schedule-page/schedule-page.module";
import { SharedModule } from "../shared/shared.module";
import { TablePageModule } from "../table-page/table-page.module";
import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";

@NgModule({
    declarations: [
        MainPageComponent, 
        LandingTablePageComponent,
        LandingKanbanPageComponent,
        LandingGanttPageComponent,
        LandingSchedulePageComponent
    ],
    imports: [
        CommonModule, 
        MainPageRoutingModule, 
        TablePageModule, 
        KanbanPageModule,
        GanttPageModule,
        HomePageModule,
        SchedulePageModule,
        ConfigPageModule,
        SharedModule
    ]
})

export class MainPageModule {}