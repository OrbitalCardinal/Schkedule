import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BadgeComponent } from './badge/badge.component';
import { TaskModal } from './task-modal/task-modal.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UngButtonComponent } from './ung-button/ung-button.component';
import { UngTextInput } from './ung-text-input/ung-text-input.component';
import { UngPasswordInput } from './ung-password-input/ung-password-input.component';
import { UngSelectInput } from './ung-select-input/ung-select-input.component';
import { UngDateInput } from './ung-date-input/ung-date-input.component';
import { UngUserAvatar } from './user-avatar/ung-user-avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    TaskModal,
    TaskCardComponent,
    UngButtonComponent,
    UngTextInput,
    UngPasswordInput,
    UngSelectInput,
    UngDateInput,
    UngUserAvatar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
