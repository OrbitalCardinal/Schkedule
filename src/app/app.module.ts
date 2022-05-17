import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { RegisterInputComponent } from './components/register-input/register-input.component';
import { BlueButtonComponent } from './components/blue-button/blue-button.component';
import { BlueTitleComponent } from './components/blue-title/blue-title.component';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { NewProjectPageComponent } from './pages/new-project-page/new-project-page.component';
import { RecentProjectsPageComponent } from './pages/recent-projects-page/recent-projects-page.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { KanbanTaskCardComponent } from './components/kanban-task-card/kanban-task-card.component';
import { KanbanModalComponent } from './components/kanban-modal/kanban-modal.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RecentKanbanPageComponent } from './pages/recent-kanban-page/recent-kanban-page.component';
import { NewKanbanPageComponent } from './pages/new-kanban-page/new-kanban-page.component';
import { SchkeduleInput } from './components/schkedule-input/schkedule-input.component';
import { HorarioModalComponent } from './components/horario-modal/horario-modal.component';
import { SchkeduleButtonComponent } from './components/schkedule-button/schkedule-button.component';
import { RecentGanttPageComponent } from './pages/recent-gantt/recent-gantt-page.component';
import { RecentSchedulePageComponent } from './pages/recent-schedule/recent-schedule-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// Componentes ajenos
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { SearchComponent } from './pages/search-component/search.component';
import { HomePageService } from './services/home-page.service';
import { NgxChartsModule }from '@swimlane/ngx-charts';

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
    LoginInputComponent,
    BlueButtonComponent,
    BlueTitleComponent,
    ActivityCardComponent,
    NewProjectPageComponent,
    RecentProjectsPageComponent,
    KanbanTaskCardComponent,
    KanbanModalComponent,
    KanbanTaskCardComponent,
    ForgotPasswordComponent,
    RecentKanbanPageComponent,
    NewKanbanPageComponent,
    ForgotPasswordComponent,
    SchkeduleInput,
    HorarioModalComponent,
    SchkeduleButtonComponent,
    RecentGanttPageComponent,
    RecentSchedulePageComponent,
    ConfigPageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    DragDropModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  exports: [
    NgxSpinnerModule,
  ],
  providers: [HomePageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
