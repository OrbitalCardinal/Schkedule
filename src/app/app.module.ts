import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Componentes propios
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { KanbanPageComponent } from './pages/kanban-page/kanban-page.component';
import { GanttPageComponent } from './pages/gantt-page/gantt-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MainPageComponent,
    HomePageComponent,
    ProjectPageComponent,
    KanbanPageComponent,
    GanttPageComponent,
    SchedulePageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
