import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigPageComponent } from "../config-page/config-page.component";
import { GanttPageComponent } from "../gantt-page/gantt-page.component";
import { HomePageComponent } from "../home-page/home-page.component";
import { KanbanPageComponent } from "../kanban-page/kanban-page.component";
import { SchedulePageComponent } from "../schedule-page/schedule-page.component";
import { TablePageComponent } from "../table-page/table-page.component";
import { MainPageComponent } from "./main-page.component";


const routes: Routes = [
    {
      path: 'main-page',
      component: MainPageComponent,
      children: [
        {
            path: 'table-page',
            component: TablePageComponent
        },
        {
            path: 'kanban-page',
            component: KanbanPageComponent
        },
        {
            path: 'gantt-page',
            component: GanttPageComponent
        },
        {
            path: 'schedule-page',
            component: SchedulePageComponent
        },
        {
            path: 'home-page',
            component: HomePageComponent
        },
        {
            path: 'config-page',
            component: ConfigPageComponent
        }
      ]
    }
  ];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainPageRoutingModule {}