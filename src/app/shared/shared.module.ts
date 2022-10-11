import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { BlueButtonComponent } from './components/blue-button/blue-button.component';
import { UngistorInputComponent } from './components/ungistor-input/ungistor-input.component';
import { UngistorInputModule } from './components/ungistor-input/ungistor-input.module';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent, 
    BlueButtonComponent, 
    ConfirmModalComponent
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule, 
    FormsModule, 
    LoadingSpinnerComponent, 
    BlueButtonComponent, 
    UngistorInputModule,
    ConfirmModalComponent
  ]
})
export class SharedModule {}
