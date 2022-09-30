import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UngistorInputComponent } from "./ungistor-input.component";

@NgModule({
    declarations: [UngistorInputComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [UngistorInputComponent, ReactiveFormsModule, FormsModule]
})

export class UngistorInputModule {}