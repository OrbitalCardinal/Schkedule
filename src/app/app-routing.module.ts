import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { KanbanPageComponent } from './pages/kanban-page/kanban-page.component';
import { GanttPageComponent } from './pages/gantt-page/gantt-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
  { path: 'mainpage', component: MainPageComponent, children: [
        { path: 'home', component: HomePageComponent },
        { path: 'project', component: ProjectPageComponent},
        { path: 'kanban', component: KanbanPageComponent },
        { path: 'gantt', component: GanttPageComponent },
        { path: 'schedule', component: SchedulePageComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
