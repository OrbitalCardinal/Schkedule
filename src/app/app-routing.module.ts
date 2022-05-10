import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { KanbanPageComponent } from './pages/kanban-page/kanban-page.component';
import { GanttPageComponent } from './pages/gantt-page/gantt-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NewProjectPageComponent } from './pages/new-project-page/new-project-page.component';
import { RecentProjectsPageComponent } from './pages/recent-projects-page/recent-projects-page.component';
import { RecentKanbanPageComponent } from './pages/recent-kanban-page/recent-kanban-page.component';
import { NewKanbanPageComponent } from './pages/new-kanban-page/new-kanban-page.component';
import { RecentGanttPageComponent } from './pages/recent-gantt/recent-gantt-page.component';
import { RecentSchedulePageComponent } from './pages/recent-schedule/recent-schedule-page.component';

const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'mainpage', component: MainPageComponent, children: [
        { path: 'home', component: HomePageComponent },
        { path: 'project', component: ProjectPageComponent, children: [
            { path: '', redirectTo: 'recent-projects', pathMatch: 'full' },
            { path: 'new-project', component: NewProjectPageComponent },
            { path: 'recent-projects', component: RecentProjectsPageComponent }
        ]},
        { path: 'kanban', component: KanbanPageComponent,
          children: [
            { path: '', redirectTo: 'recent-kanban', pathMatch: 'full' },
            { path: 'new-kanban', component: NewKanbanPageComponent },
            { path: 'recent-kanban', component: RecentKanbanPageComponent }
          ]
        },
        { path: 'gantt', component: GanttPageComponent,
          children: [
            { path: '', redirectTo: 'recent-gantt', pathMatch: 'full' },
            { path: 'recent-gantt', component: RecentGanttPageComponent }
          ]},
        { path: 'schedule', component: SchedulePageComponent ,
          children: [
            { path: '', redirectTo: 'recent-schedule', pathMatch: 'full' },
            { path: 'recent-schedule', component: RecentSchedulePageComponent }
          ]},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
