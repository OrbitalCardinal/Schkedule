import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { UngButtonComponent } from './components/ung-button/ung-button.component';
import { UngDateInput } from './components/ung-date-input/ung-date-input.component';
import { UngPasswordInput } from './components/ung-password-input/ung-password-input.component';
import { UngSelectInput } from './components/ung-select-input/ung-select-input.component';
import { UngTextInput } from './components/ung-text-input/ung-text-input.component';
import { UngUserAvatar } from './components/user-avatar/ung-user-avatar.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    UngButtonComponent,
    UngDateInput,
    UngPasswordInput,
    UngSelectInput,
    UngTextInput,
    UngUserAvatar,
    ProjectCardComponent
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule, 
    FormsModule, 
    LoadingSpinnerComponent, 
    ConfirmModalComponent,
    UngButtonComponent,
    UngDateInput,
    UngPasswordInput,
    UngSelectInput,
    UngTextInput,
    UngUserAvatar,
    ProjectCardComponent
  ]
})
export class SharedModule {}
