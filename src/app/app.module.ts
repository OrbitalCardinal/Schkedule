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
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterInputComponent } from './components/register-input/register-input.component';
import { BlueButtonComponent } from './components/blue-button/blue-button.component';
import { BlueTitleComponent } from './components/blue-title/blue-title.component';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { NewProjectPageComponent } from './pages/new-project-page/new-project-page.component';
import { RecentProjectsPageComponent } from './pages/recent-projects-page/recent-projects-page.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';


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
    LoginComponent,
    LandingComponent,
    RegisterInputComponent,
    BlueButtonComponent,
    BlueTitleComponent,
    ActivityCardComponent,
    NewProjectPageComponent,
    RecentProjectsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
